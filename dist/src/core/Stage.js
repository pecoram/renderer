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
import { Scene } from './scene/Scene.js';
import { startLoop, getTimeStamp } from './platform.js';
import { WebGlCoreRenderer } from './renderers/webgl/WebGlCoreRenderer.js';
import { assertTruthy } from '../utils.js';
import { AnimationManager } from './animations/AnimationManager.js';
import { CoreNode } from './CoreNode.js';
import { CoreTextureManager } from './CoreTextureManager.js';
import { TrFontManager } from './text-rendering/TrFontManager.js';
import { CoreShaderManager } from './CoreShaderManager.js';
import { SdfTextRenderer } from './text-rendering/renderers/SdfTextRenderer/SdfTextRenderer.js';
import { CanvasTextRenderer } from './text-rendering/renderers/CanvasTextRenderer.js';
import { intersectRect } from './lib/utils.js';
const bufferMemory = 2e6;
const autoStart = true;
export class Stage {
    options;
    /// Module Instances
    animationManager;
    txManager;
    fontManager;
    textRenderers;
    shManager;
    renderer;
    scene;
    /// State
    deltaTime = 0;
    lastFrameTime = 0;
    currentFrameTime = 0;
    /**
     * Stage constructor
     */
    constructor(options) {
        this.options = options;
        const { canvas, clearColor, rootId, debug, appWidth, appHeight } = options;
        this.txManager = new CoreTextureManager();
        this.shManager = new CoreShaderManager();
        this.animationManager = new AnimationManager();
        if (debug?.monitorTextureCache) {
            setInterval(() => {
                assertTruthy(this.txManager);
                const debugInfo = this.txManager.getDebugInfo();
                console.log('Texture ID Cache Size: ', debugInfo.idCacheSize);
                console.log('Texture Key Cache Size: ', debugInfo.keyCacheSize);
            }, 1000);
        }
        this.renderer = new WebGlCoreRenderer({
            stage: this,
            canvas,
            pixelRatio: options.devicePhysicalPixelRatio * options.deviceLogicalPixelRatio,
            clearColor: clearColor ?? 0xff000000,
            bufferMemory,
            txManager: this.txManager,
            shManager: this.shManager,
        });
        // Must do this after renderer is created
        this.txManager.renderer = this.renderer;
        this.textRenderers = {
            canvas: new CanvasTextRenderer(this),
            sdf: new SdfTextRenderer(this),
        };
        this.fontManager = new TrFontManager(this.textRenderers);
        // create root node
        const rootNode = new CoreNode(this, {
            id: rootId,
            x: 0,
            y: 0,
            width: appWidth,
            height: appHeight,
            alpha: 1,
            clipping: false,
            color: 0x00000000,
            colorTop: 0x00000000,
            colorBottom: 0x00000000,
            colorLeft: 0x00000000,
            colorRight: 0x00000000,
            colorTl: 0x00000000,
            colorTr: 0x00000000,
            colorBl: 0x00000000,
            colorBr: 0x00000000,
            zIndex: 0,
            zIndexLocked: 0,
            scaleX: 1,
            scaleY: 1,
            mountX: 0,
            mountY: 0,
            mount: 0,
            pivot: 0.5,
            pivotX: 0.5,
            pivotY: 0.5,
            rotation: 0,
            parent: null,
            texture: null,
            textureOptions: null,
            shader: null,
            shaderProps: null,
        });
        this.scene = new Scene(rootNode);
        // execute platform start loop
        if (autoStart) {
            startLoop(this);
        }
    }
    /**
     * Start a new frame draw
     */
    drawFrame() {
        const { renderer, scene, animationManager } = this;
        if (!scene?.root) {
            return;
        }
        this.lastFrameTime = this.currentFrameTime;
        this.currentFrameTime = getTimeStamp();
        this.deltaTime = !this.lastFrameTime
            ? 100 / 6
            : this.currentFrameTime - this.lastFrameTime;
        // step animation
        animationManager.update(this.deltaTime);
        // reset and clear viewport
        renderer?.reset();
        // test if we need to update the scene
        if (scene?.root?.hasUpdates) {
            scene?.root?.update(this.deltaTime);
        }
        this.addQuads(scene.root);
        renderer?.sortRenderables();
        renderer?.render();
    }
    addQuads(node, parentClippingRect = null) {
        assertTruthy(this.renderer && node.globalTransform);
        const gt = node.globalTransform;
        const isRotated = gt.tb !== 0 || gt.tc !== 0;
        let clippingRect = node.clipping && !isRotated
            ? {
                x: gt.tx,
                y: gt.ty,
                width: node.width * gt.ta,
                height: node.height * gt.td,
            }
            : null;
        if (parentClippingRect && clippingRect) {
            clippingRect = intersectRect(parentClippingRect, clippingRect);
        }
        else if (parentClippingRect) {
            clippingRect = parentClippingRect;
        }
        node.renderQuads(this.renderer, clippingRect);
        node.children.forEach((child) => {
            if (child.worldAlpha === 0) {
                return;
            }
            this.addQuads(child, clippingRect);
        });
    }
    /**
     * Given a font name, and possible renderer override, return the best compatible text renderer.
     *
     * @remarks
     * Will always return at least a canvas renderer if no other suitable renderer can be resolved.
     *
     * @param fontFamily
     * @param textRendererOverride
     * @returns
     */
    resolveTextRenderer(trProps, textRendererOverride = null) {
        let rendererId = textRendererOverride;
        let overrideFallback = false;
        // Check if the override is valid (if one is provided)
        if (rendererId) {
            const possibleRenderer = this.textRenderers[rendererId];
            if (!possibleRenderer) {
                console.warn(`Text renderer override '${rendererId}' not found.`);
                rendererId = null;
                overrideFallback = true;
            }
            else if (!possibleRenderer.canRenderFont(trProps)) {
                console.warn(`Cannot use override text renderer '${rendererId}' for font`, trProps);
                rendererId = null;
                overrideFallback = true;
            }
        }
        if (!rendererId) {
            // Iterate through the text renderers and find the first one that can render the font
            for (const [trId, tr] of Object.entries(this.textRenderers)) {
                if (trId === 'canvas') {
                    // Canvas is always a fallback
                    continue;
                }
                if (tr.canRenderFont(trProps)) {
                    rendererId = trId;
                    break;
                }
            }
            if (!rendererId) {
                // If no renderer can be found, use the canvas renderer
                rendererId = 'canvas';
            }
        }
        if (overrideFallback) {
            console.warn(`Falling back to text renderer ${String(rendererId)}`);
        }
        // By now we are guaranteed to have a valid rendererId (at least Canvas);
        const resolvedTextRenderer = this.textRenderers[rendererId];
        assertTruthy(resolvedTextRenderer, 'resolvedTextRenderer undefined');
        // Need to explicitly cast to TextRenderer because TS doesn't like
        // the covariant state argument in the setter method map
        return resolvedTextRenderer;
    }
    //#region Properties
    get root() {
        return this.scene?.root || null;
    }
}
//# sourceMappingURL=Stage.js.map