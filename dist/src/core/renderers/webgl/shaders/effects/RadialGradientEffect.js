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
export class RadialGradientEffect extends ShaderEffect {
    static z$__type__Props;
    name = 'radialGradient';
    static getEffectKey(props) {
        return `radialGradient${props.colors.length}`;
    }
    static resolveDefaults(props) {
        const colors = props.colors ?? [0xff000000, 0xffffffff];
        let stops = props.stops;
        if (!stops) {
            stops = [];
            const calc = colors.length - 1;
            for (let i = 0; i < colors.length; i++) {
                stops.push(i * (1 / calc));
            }
        }
        return {
            colors,
            stops,
            width: props.width ?? 0,
            height: props.height ?? props.width ?? 0,
            pivot: props.pivot ?? [0.5, 0.5],
        };
    }
    static uniforms = {
        width: {
            value: 0,
            method: 'uniform1f',
            type: 'float',
        },
        height: {
            value: 0,
            method: 'uniform1f',
            type: 'float',
        },
        pivot: {
            value: [0.5, 0.5],
            method: 'uniform2fv',
            type: 'vec2',
        },
        colors: {
            value: 0xffffffff,
            validator: (rgbas) => {
                const cols = rgbas.map((rgbas) => getNormalizedRgbaComponents(rgbas));
                return cols.reduce((acc, val) => acc.concat(val), []);
            },
            size: (props) => props.colors.length,
            method: 'uniform4fv',
            type: 'vec4',
        },
        stops: {
            value: [],
            validator: (value, props) => {
                const colors = props.colors ?? [];
                let stops = value;
                const tmp = value;
                if (stops.length === 0 || (stops && stops.length !== colors.length)) {
                    for (let i = 0; i < colors.length; i++) {
                        if (stops[i]) {
                            tmp[i] = stops[i];
                            if (stops[i - 1] === undefined && tmp[i - 2] !== undefined) {
                                tmp[i - 1] = tmp[i - 2] + (stops[i] - tmp[i - 2]) / 2;
                            }
                        }
                        else {
                            tmp[i] = i * (1 / (colors.length - 1));
                        }
                    }
                    stops = tmp;
                }
                return tmp;
            },
            size: (props) => props.colors.length,
            method: 'uniform1fv',
            type: 'float',
        },
    };
    static onColorize = (props) => {
        const colors = props.colors.length || 1;
        return `
      vec2 point = v_textureCoordinate.xy * u_dimensions;
      vec2 projection = vec2(pivot.x * u_dimensions.x, pivot.y * u_dimensions.y);

      float dist = length((point - projection) / vec2(width, height));

      float stopCalc = (dist - stops[0]) / (stops[1] - stops[0]);
      vec4 colorOut = mix(colors[0], colors[1], stopCalc);
      for(int i = 1; i < ${colors}-1; i++) {
        stopCalc = (dist - stops[i]) / (stops[i + 1] - stops[i]);
        colorOut = mix(colorOut, colors[i + 1], clamp(stopCalc, 0.0, 1.0));
      }
      return mix(maskColor, colorOut, clamp(colorOut.a, 0.0, 1.0));
    `;
    };
}
//# sourceMappingURL=RadialGradientEffect.js.map