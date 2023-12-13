import type { TextureRef } from '../RendererMain.js';
/**
 * Texture Usage Tracker for Usage Based Texture Garbage Collection
 */
export declare abstract class TextureUsageTracker {
    protected releaseCallback: (textureDescId: number) => void;
    constructor(releaseCallback: (textureDescId: number) => void);
    /**
     * Register a texture with the tracker.
     *
     * @param texture
     */
    abstract registerTexture(texture: TextureRef): void;
    /**
     * Increment the reference count for a texture.
     *
     * @remarks
     * This should be called anytime a Node sets a new texture.
     *
     * @param texture
     */
    abstract incrementTextureRefCount(texture: TextureRef): void;
    /**
     * Decrement the Node reference count for a texture.
     *
     * @remarks
     * This should be called anytime a Node removes a texture.
     *
     * @param texture
     */
    abstract decrementTextureRefCount(texture: TextureRef): void;
}
