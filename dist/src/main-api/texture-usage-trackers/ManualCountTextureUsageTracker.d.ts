import type { TextureRef } from '../RendererMain.js';
import { TextureUsageTracker } from './TextureUsageTracker.js';
interface TextureRefInfo {
    /**
     * Texture Reference ID
     */
    id: number;
    /**
     * The number of references to this texture that are currently assigned to
     * Nodes.
     */
    nodeRefCount: number;
    /**
     * The last time the texture reference count was updated.
     *
     * @remarks
     * This is used to determine when a texture is no longer referenced by any
     * Nodes and can be removed from the GPU.
     */
    lastUpdate: number;
}
export interface ManualCountTextureUsageTrackerOptions {
    /**
     * The interval at which to check if textures that are no longer referenced
     * by any Nodes can be released from the Core Space Texture Usage Cache.
     *
     * @remarks
     * Only valid when the {@link ManualCountTextureUsageTracker} is used.
     *
     * @defaultValue 10000 (10 seconds)
     */
    textureCleanupIntervalMs?: number;
    /**
     * The age at which a texture is considered to be no longer referenced by any
     * Nodes and can be released from the Core Space Texture Usage Cache.
     *
     * @remarks
     * Only valid when the {@link ManualCountTextureUsageTracker} is used.
     *
     * @defaultValue 60000 (1 minute)
     */
    textureCleanupAgeThreadholdMs?: number;
}
/**
 * Usage-based Texture Garbage Collection Registry
 */
export declare class ManualCountTextureUsageTracker extends TextureUsageTracker {
    textureMap: Map<number, TextureRefInfo>;
    zeroReferenceTextureSet: Set<TextureRefInfo>;
    options: Required<ManualCountTextureUsageTrackerOptions>;
    constructor(releaseCallback: (textureDescId: number) => void, options: ManualCountTextureUsageTrackerOptions);
    registerTexture(texture: TextureRef): void;
    incrementTextureRefCount(texture: TextureRef): void;
    decrementTextureRefCount(texture: TextureRef): void;
}
export {};
