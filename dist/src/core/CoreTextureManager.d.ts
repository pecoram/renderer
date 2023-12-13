import type { CoreContextTexture } from './renderers/CoreContextTexture.js';
import type { CoreRenderer } from './renderers/CoreRenderer.js';
import { ColorTexture } from './textures/ColorTexture.js';
import { ImageTexture } from './textures/ImageTexture.js';
import { NoiseTexture } from './textures/NoiseTexture.js';
import { SubTexture } from './textures/SubTexture.js';
import type { Texture } from './textures/Texture.js';
/**
 * Augmentable map of texture types
 *
 * @remarks
 * This interface can be augmented by other modules/apps to add additional
 * texture types. The ones included directly here are the ones that are
 * included in the core library.
 */
export interface TextureMap {
    ColorTexture: typeof ColorTexture;
    ImageTexture: typeof ImageTexture;
    NoiseTexture: typeof NoiseTexture;
    SubTexture: typeof SubTexture;
}
export type ExtractProps<Type> = Type extends {
    z$__type__Props: infer Props;
} ? Props : never;
/**
 * Contains information about the texture manager's internal state
 * for debugging purposes.
 */
export interface TextureManagerDebugInfo {
    keyCacheSize: number;
    idCacheSize: number;
}
/**
 * Universal options for all texture types
 *
 * @remarks
 * Texture Options provide a way to specify options that are relevant to the
 * texture loading process (including caching) and specifically for how a
 * texture is rendered within a specific Node (or set of Nodes).
 *
 * They are not used in determining the cache key for a texture (except if
 * the `cacheKey` option is provided explicitly to oveerride the default
 * cache key for the texture instance) nor are they stored/referenced within
 * the texture instance itself. Instead, the options are stored/referenced
 * within individual Nodes. So a single texture instance can be used in
 * multiple Nodes each using a different set of options.
 */
export interface TextureOptions {
    /**
     * Preload the texture immediately even if it's not being rendered to the
     * screen.
     *
     * @remarks
     * This allows the texture to be used immediately without any delay when it
     * is first needed for rendering. Otherwise the loading process will start
     * when the texture is first rendered, which may cause a delay in that texture
     * being shown properly.
     *
     * @defaultValue `false`
     */
    preload?: boolean;
    /**
     * ID to use for this texture.
     *
     * @remarks
     * This is for internal use only as an optimization.
     *
     * @privateRemarks
     * This is used to avoid having to look up the texture in the texture cache
     * by its cache key. Theoretically this should be faster.
     *
     * @defaultValue Automatically generated
     */
    id?: number;
    /**
     * Cache key to use for this texture
     *
     * @remarks
     * If this is set, the texture will be cached using this key. If a texture
     * with the same key is already cached, it will be returned instead of
     * creating a new texture.
     *
     * If this is not set (undefined), it will be automatically generated via
     * the specified `Texture`'s `makeCacheKey()` method.
     *
     * @defaultValue Automatically generated via `Texture.makeCacheKey()`
     */
    cacheKey?: string | false;
    /**
     * Flip the texture horizontally when rendering
     *
     * @defaultValue `false`
     */
    flipX?: boolean;
    /**
     * Flip the texture vertically when rendering
     *
     * @defaultValue `false`
     */
    flipY?: boolean;
}
export declare class CoreTextureManager {
    /**
     * Amount of used memory defined in pixels
     */
    usedMemory: number;
    txConstructors: Partial<TextureMap>;
    textureKeyCache: Map<string, Texture>;
    textureIdCache: Map<number, Texture>;
    ctxTextureCache: WeakMap<Texture, CoreContextTexture>;
    textureRefCountMap: WeakMap<Texture, {
        cacheKey: string | false;
        count: number;
    }>;
    /**
     * Renderer that this texture manager is associated with
     *
     * @remarks
     * This MUST be set before the texture manager is used. Otherwise errors
     * will occur when using the texture manager.
     */
    renderer: CoreRenderer;
    constructor();
    registerTextureType<Type extends keyof TextureMap>(textureType: Type, textureClass: TextureMap[Type]): void;
    loadTexture<Type extends keyof TextureMap>(textureType: Type, props: ExtractProps<TextureMap[Type]>, options?: TextureOptions | null): InstanceType<TextureMap[Type]>;
    /**
     * Add a `Texture` to the texture cache by its texture desc ID and cache key
     *
     * @remarks
     * This is used internally by the `CoreTextureManager` to cache textures
     * when they are created.
     *
     * It handles updating the texture ID cache, texture key cache, and texture
     * reference count map.
     *
     * @param textureDescId
     * @param cacheKey
     * @param texture
     */
    private addTextureIdToCache;
    /**
     * Remove a `Texture` from the texture cache by its texture desc ID
     *
     * @remarks
     * This is called externally by when we know (at least reasonably well) that
     * the `TextureRef` in the Main API space has been is no longer used. This
     * allows us to remove the `Texture` from the Usage Cache so that it can be
     * garbage collected as well.
     *
     * @param textureDescId
     */
    removeTextureIdFromCache(textureDescId: number): void;
    /**
     * Get an object containing debug information about the texture manager.
     *
     * @returns
     */
    getDebugInfo(): TextureManagerDebugInfo;
    /**
     * Get a CoreContextTexture for the given Texture source.
     *
     * @remarks
     * If the texture source already has an allocated CoreContextTexture, it will be
     * returned from the cache. Otherwise, a new CoreContextTexture will be created
     * and cached.
     *
     * ContextTextures are stored in a WeakMap, so they will be garbage collected
     * when the Texture source is no longer referenced.
     *
     * @param textureSource
     * @returns
     */
    getCtxTexture(textureSource: Texture): CoreContextTexture;
}
