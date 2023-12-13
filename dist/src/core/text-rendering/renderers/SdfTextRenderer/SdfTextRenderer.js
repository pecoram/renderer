/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2023 Comcast Cable Communications Management, LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { intersectBound } from '../../../lib/utils.js';
import { TextRenderer, } from '../TextRenderer.js';
import { SdfTrFontFace } from '../../font-face-types/SdfTrFontFace/SdfTrFontFace.js';
import { FLOATS_PER_GLYPH } from './internal/constants.js';
import { getStartConditions } from './internal/getStartConditions.js';
import { layoutText } from './internal/layoutText.js';
import { makeRenderWindow } from './internal/makeRenderWindow.js';
import { TrFontManager } from '../../TrFontManager.js';
import { assertTruthy, mergeColorAlpha } from '../../../../utils.js';
import { WebGlCoreRenderOp } from '../../../renderers/webgl/WebGlCoreRenderOp.js';
import { BufferCollection } from '../../../renderers/webgl/internal/BufferCollection.js';
import { EventEmitter } from '../../../../common/EventEmitter.js';
/**
 * Singleton class for rendering text using signed distance fields.
 *
 * @remarks
 * SdfTextRenderer supports both single-channel and multi-channel signed distance fields.
 */
export class SdfTextRenderer extends TextRenderer {
    /**
     * Map of font family names to a set of font faces.
     */
    ssdfFontFamilies = {};
    msdfFontFamilies = {};
    sdfShader;
    constructor(stage) {
        super(stage);
        this.sdfShader = this.stage.shManager.loadShader('SdfShader').shader;
    }
    //#region Overrides
    getPropertySetters() {
        return {
            fontFamily: (state, value) => {
                state.props.fontFamily = value;
                state.trFontFace = undefined;
                this.invalidateCache(state);
            },
            fontWeight: (state, value) => {
                state.props.fontWeight = value;
                state.trFontFace = undefined;
                this.invalidateCache(state);
            },
            fontStyle: (state, value) => {
                state.props.fontStyle = value;
                state.trFontFace = undefined;
                this.invalidateCache(state);
            },
            fontStretch: (state, value) => {
                state.props.fontStretch = value;
                state.trFontFace = undefined;
                this.invalidateCache(state);
            },
            fontSize: (state, value) => {
                state.props.fontSize = value;
                this.invalidateCache(state);
            },
            text: (state, value) => {
                state.props.text = value;
                this.invalidateCache(state);
            },
            textAlign: (state, value) => {
                state.props.textAlign = value;
                this.invalidateCache(state);
            },
            color: (state, value) => {
                state.props.color = value;
            },
            x: (state, value) => {
                state.props.x = value;
            },
            y: (state, value) => {
                state.props.y = value;
            },
            contain: (state, value) => {
                state.props.contain = value;
                this.invalidateCache(state);
            },
            width: (state, value) => {
                state.props.width = value;
                this.invalidateCache(state);
            },
            height: (state, value) => {
                state.props.height = value;
                this.invalidateCache(state);
            },
            offsetY: (state, value) => {
                state.props.offsetY = value;
                this.invalidateCache(state);
            },
            scrollable: (state, value) => {
                state.props.scrollable = value;
                this.invalidateCache(state);
            },
            scrollY: (state, value) => {
                state.props.scrollY = value;
            },
            letterSpacing: (state, value) => {
                state.props.letterSpacing = value;
                this.invalidateCache(state);
            },
            debug: (state, value) => {
                state.props.debug = value;
            },
        };
    }
    canRenderFont(props) {
        // TODO: Support matching on font stretch, weight and style (if/when needed)
        // For now we just match on the font family name
        // '$$SDF_FAILURE_TEST$$' is used to test the 'failure' event coming from text
        const { fontFamily } = props;
        return (fontFamily in this.ssdfFontFamilies ||
            fontFamily in this.msdfFontFamilies ||
            fontFamily === '$$SDF_FAILURE_TEST$$');
    }
    isFontFaceSupported(fontFace) {
        return fontFace instanceof SdfTrFontFace;
    }
    addFontFace(fontFace) {
        // Make sure the font face is an SDF font face (it should have already passed
        // the `isFontFaceSupported` check)
        assertTruthy(fontFace instanceof SdfTrFontFace);
        const familyName = fontFace.fontFamily;
        const fontFamiles = fontFace.type === 'ssdf'
            ? this.ssdfFontFamilies
            : fontFace.type === 'msdf'
                ? this.msdfFontFamilies
                : undefined;
        if (!fontFamiles) {
            console.warn(`Invalid font face type: ${fontFace.type}`);
            return;
        }
        let faceSet = fontFamiles[familyName];
        if (!faceSet) {
            faceSet = new Set();
            fontFamiles[familyName] = faceSet;
        }
        faceSet.add(fontFace);
    }
    createState(props) {
        return {
            props,
            status: 'initialState',
            emitter: new EventEmitter(),
            lineCache: [],
            forceFullLayoutCalc: false,
            renderWindow: undefined,
            bufferNumFloats: 0,
            bufferNumQuads: 0,
            vertexBuffer: undefined,
            webGlBuffers: null,
            bufferUploaded: false,
            textH: undefined,
            textW: undefined,
            distanceRange: 0,
            trFontFace: undefined,
            debugData: {
                updateCount: 0,
                layoutCount: 0,
                lastLayoutNumCharacters: 0,
                layoutSum: 0,
                drawSum: 0,
                drawCount: 0,
                bufferSize: 0,
            },
        };
    }
    updateState(state) {
        const updateStartTime = performance.now();
        let { trFontFace } = state;
        const { textH, lineCache, debugData, forceFullLayoutCalc } = state;
        debugData.updateCount++;
        // On the first update call we need to set the status to loading
        if (state.status === 'initialState') {
            this.setStatus(state, 'loading');
        }
        // Resolve font face if we haven't yet
        if (!trFontFace) {
            trFontFace = this.resolveFontFace(state.props);
            state.trFontFace = trFontFace;
            if (!trFontFace) {
                const msg = `SdfTextRenderer: Could not resolve font face for family: '${state.props.fontFamily}'`;
                console.error(msg);
                this.setStatus(state, 'failed', new Error(msg));
                return;
            }
        }
        // If the font hasn't been loaded yet, stop here.
        // Listen for the 'loaded' event and forward fontLoaded event
        if (!trFontFace.loaded) {
            trFontFace.on('loaded', function loadedHandler() {
                state.emitter.emit('fontLoaded', {});
                trFontFace?.off('fontLoaded', loadedHandler);
            });
            return;
        }
        // If the font is loaded then so should the data
        assertTruthy(trFontFace.data, 'Font face data should be loaded');
        const { text, fontSize, x, y, contain, width, height, scrollable } = state.props;
        // scrollY only has an effect when contain === 'both' and scrollable === true
        const scrollY = contain === 'both' && scrollable ? state.props.scrollY : 0;
        let { renderWindow } = state;
        // Needed in renderWindow calculation
        const sdfLineHeight = trFontFace.data.info.size;
        /**
         * Divide screen space points by this to get the SDF space points
         * Mulitple SDF space points by this to get screen space points
         */
        const fontSizeRatio = fontSize / sdfLineHeight;
        state.distanceRange =
            fontSizeRatio * trFontFace.data.distanceField.distanceRange;
        // Allocate buffers if needed
        const neededLength = text.length * FLOATS_PER_GLYPH;
        let vertexBuffer = state.vertexBuffer;
        if (!vertexBuffer || vertexBuffer.length < neededLength) {
            vertexBuffer = new Float32Array(neededLength * 2);
        }
        // Figure out whats actually in the bounds of the renderer/canvas (visibleWindow)
        const rendererBounds = {
            x1: 0,
            y1: 0,
            x2: this.stage.options.appWidth,
            y2: this.stage.options.appHeight,
        };
        const elementBounds = {
            x1: x,
            y1: y,
            x2: contain !== 'none' ? x + width : Infinity,
            y2: contain === 'both' ? y + height : Infinity,
        };
        /**
         * Area that is visible on the screen.
         */
        const visibleWindow = intersectBound(rendererBounds, elementBounds);
        // Return early if we're still viewing inside the established render window
        // No need to re-render what we've already rendered
        // (Only if there's an established renderWindow and we're not suppressing early exit)
        if (!forceFullLayoutCalc && renderWindow) {
            if (x + renderWindow.x1 <= visibleWindow.x1 &&
                x + renderWindow.x2 >= visibleWindow.x2 &&
                y - scrollY + renderWindow.y1 <= visibleWindow.y1 &&
                y - scrollY + renderWindow.y2 >= visibleWindow.y2)
                return;
            // Otherwise clear the renderWindow so it can be redone
            state.renderWindow = renderWindow = undefined;
        }
        const { offsetY, textAlign } = state.props;
        // Create a new renderWindow if needed
        if (!renderWindow) {
            const visibleWindowHeight = visibleWindow.y2 - visibleWindow.y1;
            const maxLinesPerCanvasPage = Math.ceil(visibleWindowHeight / sdfLineHeight);
            renderWindow = makeRenderWindow(x, y, scrollY, sdfLineHeight, maxLinesPerCanvasPage, visibleWindow);
        }
        const start = getStartConditions(fontSize, offsetY, fontSizeRatio, sdfLineHeight, renderWindow, lineCache, textH);
        if (!start) {
            // Nothing to render, return early, but still mark as loaded (since the text is just scrolled
            // out of view)
            this.setStatus(state, 'loaded');
            return;
        }
        const { letterSpacing } = state.props;
        const out2 = layoutText(start.lineIndex, start.x, start.y, text, textAlign, width, height, fontSize, letterSpacing, vertexBuffer, contain, lineCache, renderWindow, trFontFace, forceFullLayoutCalc, scrollable);
        state.bufferUploaded = false;
        state.bufferNumFloats = out2.bufferNumFloats;
        state.bufferNumQuads = out2.bufferNumQuads;
        state.vertexBuffer = vertexBuffer;
        state.renderWindow = renderWindow;
        debugData.lastLayoutNumCharacters = out2.layoutNumCharacters;
        debugData.bufferSize = vertexBuffer.byteLength;
        // If we didn't exit early, we know we have completely computed w/h
        if (out2.fullyProcessed) {
            state.textW = out2.maxX * fontSizeRatio;
            state.textH = out2.maxY * fontSizeRatio;
        }
        // if (state.props.debug.printLayoutTime) {
        //   debugData.layoutSum += performance.now() - updateStartTime;
        //   debugData.layoutCount++;
        // }
        this.setStatus(state, 'loaded');
    }
    renderQuads(state, transform, clippingRect, alpha) {
        if (!state.vertexBuffer) {
            // Nothing to draw
            return;
        }
        const drawStartTime = performance.now();
        const { sdfShader } = this;
        const { renderer } = this.stage;
        const { appWidth, appHeight } = this.stage.options;
        const { fontSize, color, contain, scrollable, zIndex, debug } = state.props;
        // scrollY only has an effect when contain === 'both' and scrollable === true
        const scrollY = contain === 'both' && scrollable ? state.props.scrollY : 0;
        const { textW = 0, textH = 0, distanceRange, vertexBuffer, bufferNumFloats, bufferUploaded, renderWindow, debugData, trFontFace, } = state;
        let { webGlBuffers } = state;
        if (!webGlBuffers) {
            const gl = renderer.gl;
            const stride = 4 * Float32Array.BYTES_PER_ELEMENT;
            const webGlBuffer = gl.createBuffer();
            assertTruthy(webGlBuffer);
            state.webGlBuffers = new BufferCollection([
                {
                    buffer: webGlBuffer,
                    attributes: {
                        a_position: {
                            name: 'a_position',
                            size: 2,
                            type: gl.FLOAT,
                            normalized: false,
                            stride,
                            offset: 0, // start at the beginning of the buffer
                        },
                        a_textureCoordinate: {
                            name: 'a_textureCoordinate',
                            size: 2,
                            type: gl.FLOAT,
                            normalized: false,
                            stride,
                            offset: 2 * Float32Array.BYTES_PER_ELEMENT,
                        },
                    },
                },
            ]);
            state.bufferUploaded = false;
            assertTruthy(state.webGlBuffers);
            webGlBuffers = state.webGlBuffers;
        }
        if (!bufferUploaded) {
            const gl = renderer.gl;
            const buffer = webGlBuffers?.getBuffer('a_textureCoordinate') ?? null;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertexBuffer, gl.STATIC_DRAW);
            state.bufferUploaded = true;
        }
        assertTruthy(trFontFace);
        const renderOp = new WebGlCoreRenderOp(renderer.gl, renderer.options, webGlBuffers, this.sdfShader, {
            transform: transform.data,
            // IMPORTANT: The SDF Shader expects the color NOT to be premultiplied
            // for the best blending results. Which is why we use `mergeColorAlpha`
            // instead of `mergeColorAlphaPremultiplied` here.
            color: mergeColorAlpha(color, alpha),
            size: fontSize / (trFontFace.data?.info.size || 0),
            scrollY,
            distanceRange,
            debug: debug.sdfShaderDebug,
        }, alpha, clippingRect, { height: textH, width: textW }, 0, zIndex);
        const texture = state.trFontFace?.texture;
        assertTruthy(texture);
        const ctxTexture = this.stage.txManager.getCtxTexture(texture);
        renderOp.addTexture(ctxTexture);
        renderOp.length = state.bufferNumFloats;
        renderOp.numQuads = state.bufferNumQuads;
        renderer.addRenderable(renderOp);
        // const elementRect = {
        //   x: x,
        //   y: y,
        //   w: contain !== 'none' ? width : textW,
        //   h: contain === 'both' ? height : textH,
        // };
        // const visibleRect = intersectRect(
        //   {
        //     x: 0,
        //     y: 0,
        //     w: renderer.w,
        //     h: renderer.h,
        //   },
        //   elementRect,
        // );
        // if (!debug.disableScissor) {
        //   renderer.enableScissor(
        //     visibleRect.x,
        //     visibleRect.y,
        //     visibleRect.w,
        //     visibleRect.h,
        //   );
        // }
        // Draw the arrays
        // gl.drawArrays(
        //   gl.TRIANGLES, // Primitive type
        //   0,
        //   bufferNumVertices, // Number of verticies
        // );
        // renderer.disableScissor();
        // if (debug.showElementRect) {
        //   this.renderer.drawBorder(
        //     Colors.Blue,
        //     elementRect.x,
        //     elementRect.y,
        //     elementRect.w,
        //     elementRect.h,
        //   );
        // }
        // if (debug.showVisibleRect) {
        //   this.renderer.drawBorder(
        //     Colors.Green,
        //     visibleRect.x,
        //     visibleRect.y,
        //     visibleRect.w,
        //     visibleRect.h,
        //   );
        // }
        // if (debug.showRenderWindow && renderWindow) {
        //   this.renderer.drawBorder(
        //     Colors.Red,
        //     x + renderWindow.x1,
        //     y + renderWindow.y1 - scrollY,
        //     x + renderWindow.x2 - (x + renderWindow.x1),
        //     y + renderWindow.y2 - scrollY - (y + renderWindow.y1 - scrollY),
        //   );
        // }
        // if (debug.printLayoutTime) {
        //   debugData.drawSum += performance.now() - drawStartTime;
        //   debugData.drawCount++;
        // }
    }
    //#endregion Overrides
    resolveFontFace(props) {
        return TrFontManager.resolveFontFace([this.msdfFontFamilies, this.ssdfFontFamilies], props);
    }
    /**
     * Invalidate the cache stored in the state. This will cause the text to be
     * re-layed out on the next update.
     *
     * @param state
     */
    invalidateCache(state) {
        state.renderWindow = undefined;
        state.textH = undefined;
        state.textW = undefined;
        state.lineCache = [];
        this.setStatus(state, 'loading');
    }
}
//# sourceMappingURL=SdfTextRenderer.js.map