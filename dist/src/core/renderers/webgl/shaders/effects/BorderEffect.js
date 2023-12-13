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
import { getNormalizedRgbaComponents } from '../../../../lib/utils.js';
import { ShaderEffect, } from './ShaderEffect.js';
/**
 * The BorderEffect renders a border along all edges of an element
 */
export class BorderEffect extends ShaderEffect {
    static z$__type__Props;
    name = 'border';
    static getEffectKey() {
        return `border`;
    }
    static resolveDefaults(props) {
        return {
            width: props.width ?? 10,
            color: props.color ?? 0xffffffff,
        };
    }
    static uniforms = {
        width: {
            value: 0,
            method: 'uniform1f',
            type: 'float',
        },
        color: {
            value: 0xffffffff,
            validator: (rgba) => getNormalizedRgbaComponents(rgba),
            method: 'uniform4fv',
            type: 'vec4',
        },
    };
    static onEffectMask = `
  float mask = clamp(shaderMask + width, 0.0, 1.0) - clamp(shaderMask, 0.0, 1.0);
  return mix(shaderColor, maskColor, mask);
  `;
    static onColorize = `
    return color;
  `;
}
//# sourceMappingURL=BorderEffect.js.map