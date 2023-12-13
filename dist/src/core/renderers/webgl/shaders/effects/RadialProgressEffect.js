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
 * The RadialProgressEffect renders a border along all edges of an element
 */
export class RadialProgressEffect extends ShaderEffect {
    static z$__type__Props;
    name = 'radialProgress';
    static getEffectKey() {
        return `radialProgress`;
    }
    static resolveDefaults(props) {
        return {
            width: props.width ?? 10,
            progress: props.progress ?? 0.5,
            offset: props.offset ?? 0,
            range: props.range ?? Math.PI * 2,
            rounded: props.rounded ?? false,
            radius: props.radius ?? 1,
            color: props.color ?? 0xffffffff,
        };
    }
    static uniforms = {
        width: {
            value: 0,
            method: 'uniform1f',
            type: 'float',
        },
        progress: {
            value: 0.5,
            method: 'uniform1f',
            type: 'float',
        },
        offset: {
            value: 0,
            method: 'uniform1f',
            type: 'float',
        },
        range: {
            value: 0,
            method: 'uniform1f',
            type: 'float',
        },
        rounded: {
            value: 0,
            method: 'uniform1f',
            type: 'float',
            validator: (value) => {
                return value ? 1 : 0;
            },
        },
        radius: {
            value: 1,
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
    static methods = {
        rotateUV: `
    vec2 function(vec2 uv, float d) {
      float s = sin(d);
      float c = cos(d);
      mat2 rotMatrix = mat2(c, -s, s, c);
      return uv * rotMatrix;
    }
    `,
        drawDot: `
    float function(vec2 uv, vec2 p, float r) {
      uv += p;
      float circle = length(uv) - r;
      return clamp(-circle, 0.0, 1.0);
    }
    `,
    };
    static onEffectMask = `
    float outerRadius = radius * u_dimensions.y * 0.5;

    float endAngle = range * progress - 0.0005;

    vec2 uv = v_textureCoordinate.xy * u_dimensions.xy - u_dimensions * 0.5;

    uv = $rotateUV(uv, -(offset));
    float linewidth = width * u_pixelRatio;
    float circle = length(uv) - (outerRadius - linewidth) ;
    circle = abs(circle) - linewidth;
    circle = clamp(-circle, 0.0, 1.0);

    float angle = (atan(uv.x, -uv.y) / 3.14159265359 * 0.5);
    float p = endAngle / (PI * 2.);

    circle *= step(fract(angle), fract(p));

    circle = rounded < 1. ? circle : max(circle, $drawDot(uv, vec2(0, outerRadius - linewidth), linewidth));
    circle = rounded < 1. ? circle : max(circle, $drawDot($rotateUV(uv, -(endAngle)), vec2(0, outerRadius - linewidth), linewidth));

    return mix(shaderColor, maskColor, circle);
  `;
    static onColorize = `
    return color;
  `;
}
//# sourceMappingURL=RadialProgressEffect.js.map