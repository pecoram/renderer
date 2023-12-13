import type { TextureRef } from '../RendererMain.js';
import { TextureUsageTracker } from './TextureUsageTracker.js';
export declare class FinalizationRegistryTextureUsageTracker extends TextureUsageTracker {
    private registry;
    constructor(releaseCallback: (textureDescId: number) => void);
    registerTexture(texture: TextureRef): void;
    incrementTextureRefCount(): void;
    decrementTextureRefCount(): void;
}
