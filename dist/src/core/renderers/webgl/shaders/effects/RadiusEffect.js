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
import { ShaderEffect, } from './ShaderEffect.js';
/**
 * Masks the current maskcolor with rounded corners similar to {@link RoundedRectangle}
 */
export class RadiusEffect extends ShaderEffect {
    static z$__type__Props;
    name = 'radius';
    static getEffectKey() {
        return `radius`;
    }
    static uniforms = {
        radius: {
            value: 0,
            method: 'uniform4fv',
            type: 'vec4',
            validator: (value) => {
                let r = value;
                if (Array.isArray(r)) {
                    if (r.length === 2) {
                        r = [r[0], r[1], r[0], r[1]];
                    }
                    else if (r.length === 3) {
                        r = [r[0], r[1], r[2], r[0]];
                    }
                    else if (r.length !== 4) {
                        r = [r[0], r[0], r[0], r[0]];
                    }
                }
                else if (typeof r === 'number') {
                    r = [r, r, r, r];
                }
                return r;
            },
        },
    };
    static methods = {
        fillMask: `
      float function(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }
    `,
        boxDist: `
      float function(vec2 p, vec2 size, float radius) {
        size -= vec2(radius);
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - radius;
      }
    `,
    };
    static resolveDefaults(props) {
        return {
            radius: props.radius ?? 10,
        };
    }
    static onShaderMask = `
  vec2 halfDimensions = u_dimensions * 0.5;
  float r = radius[0] * step(v_textureCoordinate.x, 0.5) * step(v_textureCoordinate.y, 0.5);
  r = r + radius[1] * step(0.5, v_textureCoordinate.x) * step(v_textureCoordinate.y, 0.5);
  r = r + radius[2] * step(0.5, v_textureCoordinate.x) * step(0.5, v_textureCoordinate.y);
  r = r + radius[3] * step(v_textureCoordinate.x, 0.5) * step(0.5, v_textureCoordinate.y);
  return $boxDist(v_textureCoordinate.xy * u_dimensions - halfDimensions, halfDimensions, r);
  `;
    static onEffectMask = `
  return mix(vec4(0.0), maskColor, $fillMask(shaderMask));
  `;
}
//# sourceMappingURL=RadiusEffect.js.map