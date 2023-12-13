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
import { CoreRenderOp } from '../CoreRenderOp.js';
import { WebGlCoreShader } from './WebGlCoreShader.js';
const MAX_TEXTURES = 8; // TODO: get from gl
/**
 * Can render multiple quads with multiple textures (up to vertex shader texture limit)
 *
 */
export class WebGlCoreRenderOp extends CoreRenderOp {
    gl;
    options;
    buffers;
    shader;
    shaderProps;
    alpha;
    clippingRect;
    dimensions;
    bufferIdx;
    zIndex;
    length = 0;
    numQuads = 0;
    textures = [];
    maxTextures;
    constructor(gl, options, buffers, shader, shaderProps, alpha, clippingRect, dimensions, bufferIdx, zIndex) {
        super();
        this.gl = gl;
        this.options = options;
        this.buffers = buffers;
        this.shader = shader;
        this.shaderProps = shaderProps;
        this.alpha = alpha;
        this.clippingRect = clippingRect;
        this.dimensions = dimensions;
        this.bufferIdx = bufferIdx;
        this.zIndex = zIndex;
        this.gl = gl;
        this.maxTextures = shader.supportsIndexedTextures
            ? gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
            : 1;
    }
    addTexture(texture) {
        const { textures, maxTextures } = this;
        const existingIdx = textures.findIndex((t) => t === texture);
        if (existingIdx !== -1) {
            return existingIdx;
        }
        const newIdx = textures.length;
        if (newIdx >= maxTextures) {
            return 0xffffffff;
        }
        this.textures.push(texture);
        return newIdx;
    }
    draw() {
        const { gl, shader, shaderProps, options } = this;
        // shaderOp.draw(this);
        const { shManager } = options;
        shManager.useShader(shader);
        shader.bindRenderOp(this, shaderProps);
        // TODO: Reduce calculations required
        const quadIdx = (this.bufferIdx / 24) * 6 * 2;
        // TODO: Move these somewhere else?
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        // Clipping
        if (this.clippingRect) {
            const { x, y, width, height } = this.clippingRect;
            const pixelRatio = options.pixelRatio;
            const canvasHeight = options.canvas.height;
            const clipX = Math.round(x * pixelRatio);
            const clipWidth = Math.round(width * pixelRatio);
            const clipHeight = Math.round(height * pixelRatio);
            const clipY = Math.round(canvasHeight - clipHeight - y * pixelRatio);
            gl.enable(gl.SCISSOR_TEST);
            gl.scissor(clipX, clipY, clipWidth, clipHeight);
        }
        else {
            gl.disable(gl.SCISSOR_TEST);
        }
        gl.drawElements(gl.TRIANGLES, 6 * this.numQuads, gl.UNSIGNED_SHORT, quadIdx);
    }
}
//# sourceMappingURL=WebGlCoreRenderOp.js.map