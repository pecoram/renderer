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
 * Texture consisting of an image loaded from a URL
 *
 * @remarks
 * The ImageTexture's {@link ImageTextureProps.src} prop defines the image URL
 * to be downloaded.
 *
 * By default, the texture's alpha values will be premultiplied into its color
 * values which is generally the desired setting before they are sent to the
 * texture's associated {@link Shader}. However, in special cases you may want
 * the Shader to receive straight (non-premultiplied) values. In that case you
 * can disable the default behavior by setting the
 * {@link ImageTextureProps.premultiplyAlpha} prop to `false`.
 */
export class ImageTexture extends Texture {
    props;
    constructor(txManager, props) {
        super(txManager);
        this.props = ImageTexture.resolveDefaults(props);
    }
    async getTextureData() {
        const { src, premultiplyAlpha } = this.props;
        if (!src) {
            return {
                data: null,
            };
        }
        if (src instanceof ImageData) {
            return {
                data: src,
                premultiplyAlpha,
            };
        }
        const response = await fetch(src);
        const blob = await response.blob();
        return {
            data: await createImageBitmap(blob, {
                premultiplyAlpha: premultiplyAlpha ? 'premultiply' : 'none',
                colorSpaceConversion: 'none',
                imageOrientation: 'none',
            }),
        };
    }
    static makeCacheKey(props) {
        const resolvedProps = ImageTexture.resolveDefaults(props);
        // ImageTextures sourced by ImageData are non-cacheable
        if (resolvedProps.src instanceof ImageData) {
            return false;
        }
        return `ImageTexture,${resolvedProps.src},${resolvedProps.premultiplyAlpha}`;
    }
    static resolveDefaults(props) {
        return {
            src: props.src ?? '',
            premultiplyAlpha: props.premultiplyAlpha ?? true,
        };
    }
    static z$__type__Props;
}
//# sourceMappingURL=ImageTexture.js.map