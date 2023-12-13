import type { TextureRef } from '../../main-api/RendererMain.js';
import type { CoreTextureManager } from '../CoreTextureManager.js';
import { Texture, type TextureData } from './Texture.js';
/**
 * Properties of the {@link SubTexture}
 */
export interface SubTextureProps {
    /**
     * The texture that this sub-texture is a sub-region of.
     */
    texture: TextureRef;
    /**
     * The x pixel position of the top-left of the sub-texture within the parent
     * texture.
     *
     * @default 0
     */
    x?: number;
    /**
     * The y pixel position of the top-left sub-texture within the parent
     * texture.
     *
     * @default 0
     **/
    y?: number;
    /**
     * The width of the sub-texture in pixels.
     *
     * @default 0
     */
    width?: number;
    /**
     * The height of the sub-texture in pixels
     **/
    height?: number;
}
/**
 * A Texture that is a sub-region of another Texture.
 *
 * @remarks
 * The parent texture can be a Sprite Sheet/Texture Atlas and set using the
 * {@link SubTextureProps.texture} prop. The sub-region relative to the parent
 * texture is defined with the {@link SubTextureProps.x},
 * {@link SubTextureProps.y}, {@link SubTextureProps.width}, and
 * {@link SubTextureProps.height} pixel values.
 */
export declare class SubTexture extends Texture {
    props: Required<SubTextureProps>;
    parentTexture: Texture;
    constructor(txManager: CoreTextureManager, props: SubTextureProps);
    private onParentTxLoaded;
    private onParentTxFailed;
    getTextureData(): Promise<TextureData>;
    static makeCacheKey(props: SubTextureProps): string | false;
    static resolveDefaults(props: SubTextureProps): Required<SubTextureProps>;
    static z$__type__Props: SubTextureProps;
}
