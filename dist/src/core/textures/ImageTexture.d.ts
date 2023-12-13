import type { CoreTextureManager } from '../CoreTextureManager.js';
import { Texture, type TextureData } from './Texture.js';
/**
 * Properties of the {@link ImageTexture}
 */
export interface ImageTextureProps {
    /**
     * Source URL or ImageData for the image to be used as a texture.
     *
     * @remarks
     * The ImageData type is currently only supported internally. End users should
     * only set this property to a URL string.
     *
     * @default ''
     */
    src?: string | ImageData;
    /**
     * Whether to premultiply the alpha channel into the color channels of the
     * image.
     *
     * @remarks
     * Generally this should be set to `true` (the default). However, if the
     * texture's associated Shader expects straight (non-premultiplied) colors,
     * this should be set to `false`.
     *
     * @default true
     */
    premultiplyAlpha?: boolean;
}
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
export declare class ImageTexture extends Texture {
    props: Required<ImageTextureProps>;
    constructor(txManager: CoreTextureManager, props: ImageTextureProps);
    getTextureData(): Promise<TextureData>;
    static makeCacheKey(props: ImageTextureProps): string | false;
    static resolveDefaults(props: ImageTextureProps): Required<ImageTextureProps>;
    static z$__type__Props: ImageTextureProps;
}
