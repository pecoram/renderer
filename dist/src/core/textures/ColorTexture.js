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
import { Texture } from './Texture.js';
/**
 * Texture consisting of only a 1x1 color pixel
 *
 * @remarks
 * The pixel color is set with the {@link ColorTextureProps.color} prop.
 *
 * This is the default texture used for a Node if it's
 * {@link INodeWritableProps.texture} prop is set to `null` (the default)
 *
 * Generally the 1x1 color pixel is stretched to whatever the set dimensions of
 * a Node are.
 */
export class ColorTexture extends Texture {
    props;
    constructor(txManager, props) {
        super(txManager);
        this.props = ColorTexture.resolveDefaults(props || {});
    }
    get color() {
        return this.props.color;
    }
    set color(color) {
        this.props.color = color;
    }
    async getTextureData() {
        const pixelData32 = new Uint32Array([this.color]);
        const pixelData8 = new Uint8ClampedArray(pixelData32.buffer);
        return {
            data: new ImageData(pixelData8, 1, 1),
            premultiplyAlpha: true,
        };
    }
    static makeCacheKey(props) {
        const resolvedProps = ColorTexture.resolveDefaults(props);
        return `ColorTexture,${resolvedProps.color}`;
    }
    static resolveDefaults(props) {
        return {
            color: props.color || 0xffffffff,
        };
    }
    static z$__type__Props;
}
//# sourceMappingURL=ColorTexture.js.map