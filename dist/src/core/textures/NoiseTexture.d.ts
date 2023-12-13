import type { CoreTextureManager } from '../CoreTextureManager.js';
import { Texture, type TextureData } from './Texture.js';
/**
 * Properties of the {@link NoiseTexture}
 */
export interface NoiseTextureProps {
    /**
     * Width of texture
     *
     * @default 128
     */
    width?: number;
    /**
     * Height of texture
     *
     * @default 128
     */
    height?: number;
    /**
     * A number value that can be varied to force new textures to be generated
     *
     * @default 0
     */
    cacheId?: number;
}
/**
 * Texture consisting of a random grid of greyscale pixels
 *
 * @remarks
 * The width and height of the NoiseTexture are defined by it's
 * {@link NoiseTextureProps.width} and {@link NoiseTextureProps.height}
 * properties. The {@link NoiseTextureProps.cacheId} prop can be varied in order
 * to bypass cache and get newly randomized texture data.
 */
export declare class NoiseTexture extends Texture {
    props: Required<NoiseTextureProps>;
    constructor(txManager: CoreTextureManager, props: NoiseTextureProps);
    getTextureData(): Promise<TextureData>;
    static makeCacheKey(props: NoiseTextureProps): string;
    static resolveDefaults(props: NoiseTextureProps): Required<NoiseTextureProps>;
    static z$__type__Props: NoiseTextureProps;
}
