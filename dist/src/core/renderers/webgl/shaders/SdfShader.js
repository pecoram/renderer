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
import { getNormalizedRgbaComponents } from '../../../lib/utils.js';
import { WebGlCoreShader } from '../WebGlCoreShader.js';
const IDENTITY_MATRIX_3x3 = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
/**
 * SdfShader supports multi-channel and single-channel signed distance field textures.
 *
 * @remarks
 * This Shader is used by the {@link SdfTextRenderer}. Do not use thie Shader
 * directly. Instead create a Text Node and assign a SDF font family to it.
 *
 * @internalRemarks
 * The only thing this shader does to support multi-channel SDFs is to
 * add a median function to the fragment shader. If this one function call
 * ends up being a performance bottleneck we can always look at ways to
 * remove it.
 */
export class SdfShader extends WebGlCoreShader {
    constructor(renderer) {
        super({
            renderer,
            attributes: ['a_position', 'a_textureCoordinate'],
            uniforms: [
                { name: 'u_resolution', uniform: 'uniform2fv' },
                { name: 'u_transform', uniform: 'uniformMatrix3fv' },
                { name: 'u_scrollY', uniform: 'uniform1f' },
                { name: 'u_pixelRatio', uniform: 'uniform1f' },
                { name: 'u_texture', uniform: 'uniform2f' },
                { name: 'u_color', uniform: 'uniform4fv' },
                { name: 'u_size', uniform: 'uniform1f' },
                { name: 'u_distanceRange', uniform: 'uniform1f' },
                { name: 'u_debug', uniform: 'uniform1i' },
            ],
        });
    }
    bindTextures(textures) {
        const { gl } = this;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textures[0].ctxTexture);
    }
    bindProps(props) {
        const resolvedProps = SdfShader.resolveDefaults(props);
        for (const key in resolvedProps) {
            if (key === 'transform') {
                this.setUniform('u_transform', false, resolvedProps[key]);
            }
            else if (key === 'scrollY') {
                this.setUniform('u_scrollY', resolvedProps[key]);
            }
            else if (key === 'color') {
                const components = getNormalizedRgbaComponents(resolvedProps.color);
                this.setUniform('u_color', components);
            }
            else if (key === 'size') {
                this.setUniform('u_size', resolvedProps[key]);
            }
            else if (key === 'distanceRange') {
                this.setUniform('u_distanceRange', resolvedProps[key]);
            }
            else if (key === 'debug') {
                this.setUniform('u_debug', resolvedProps[key] ? 1.0 : 0.0);
            }
        }
    }
    static resolveDefaults(props = {}) {
        return {
            transform: props.transform ?? IDENTITY_MATRIX_3x3,
            scrollY: props.scrollY ?? 0,
            color: props.color ?? 0xffffffff,
            size: props.size ?? 16,
            distanceRange: props.distanceRange ?? 1.0,
            debug: props.debug ?? false,
        };
    }
    static shaderSources = {
        vertex: `
      // an attribute is an input (in) to a vertex shader.
      // It will receive data from a buffer
      attribute vec2 a_position;
      attribute vec2 a_textureCoordinate;

      uniform vec2 u_resolution;
      uniform mat3 u_transform;
      uniform float u_scrollY;
      uniform float u_pixelRatio;
      uniform float u_size;

      varying vec2 v_texcoord;

      void main() {
        vec2 scrolledPosition = a_position * u_size - vec2(0, u_scrollY);
        vec2 transformedPosition = (u_transform * vec3(scrolledPosition, 1)).xy;
        gl_Position = vec4((transformedPosition * u_pixelRatio / u_resolution * 2.0 - 1.0) * vec2(1, -1), 0, 1);
        v_texcoord = a_textureCoordinate;
      }
    `,
        fragment: `
      precision highp float;

      uniform vec4 u_color;
      uniform sampler2D u_texture;
      uniform float u_distanceRange;
      uniform float u_pixelRatio;
      uniform int u_debug;

      varying vec2 v_texcoord;

      float median(float r, float g, float b) {
          return max(min(r, g), min(max(r, g), b));
      }

      void main() {
          vec3 sample = texture2D(u_texture, v_texcoord).rgb;
          if (u_debug == 1) {
            gl_FragColor = vec4(sample.r, sample.g, sample.b, 1.0);
            return;
          }
          float scaledDistRange = u_distanceRange * u_pixelRatio;
          float sigDist = scaledDistRange * (median(sample.r, sample.g, sample.b) - 0.5);
          float opacity = clamp(sigDist + 0.5, 0.0, 1.0) * u_color.a;

          // Build the final color.
          // IMPORTANT: We must premultiply the color by the alpha value before returning it.
          gl_FragColor = vec4(u_color.r * opacity, u_color.g * opacity, u_color.b * opacity, opacity);
      }
    `,
    };
}
//# sourceMappingURL=SdfShader.js.map