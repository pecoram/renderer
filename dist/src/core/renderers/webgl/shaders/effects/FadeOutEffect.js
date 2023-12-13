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
export class FadeOutEffect extends ShaderEffect {
    static z$__type__Props;
    name = 'fadeOut';
    static getEffectKey() {
        return `fadeOut`;
    }
    static uniforms = {
        fade: {
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
    static resolveDefaults(props) {
        return {
            fade: props.fade ?? 10,
        };
    }
    static onColorize = `
  vec2 point = v_textureCoordinate.xy * u_dimensions.xy;
  vec2 pos1;
  vec2 pos2;
  vec2 d;
  float c;
  vec4 result = maskColor;


  if(fade[0] > 0.0) {
    pos1 = vec2(point.x, point.y);
    pos2 = vec2(point.x, point.y + fade[0]);
    d = pos2 - pos1;
    c = dot(pos1, d) / dot(d, d);
    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));
  }

  if(fade[1] > 0.0) {
    pos1 = vec2(point.x - u_dimensions.x - fade[1], v_textureCoordinate.y);
    pos2 = vec2(point.x - u_dimensions.x, v_textureCoordinate.y);
    d = pos1 - pos2;
    c = dot(pos2, d) / dot(d, d);
    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));
  }

  if(fade[2] > 0.0) {
    pos1 = vec2(v_textureCoordinate.x, point.y - u_dimensions.y - fade[2]);
    pos2 = vec2(v_textureCoordinate.x, point.y - u_dimensions.y);
    d = pos1 - pos2;
    c = dot(pos2, d) / dot(d, d);
    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));
  }

  if(fade[3] > 0.0) {
    pos1 = vec2(point.x, point.y);
    pos2 = vec2(point.x + fade[3], point.y);
    d = pos2 - pos1;
    c = dot(pos1, d) / dot(d, d);
    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));
  }

  return result;
  `;
}
//# sourceMappingURL=FadeOutEffect.js.map