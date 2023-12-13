import type { CoreTextureManager } from '../CoreTextureManager.js';
import type { SubTextureProps } from './SubTexture.js';
import type { Dimensions } from '../../common/CommonTypes.js';
import { EventEmitter } from '../../common/EventEmitter.js';
/**
 * Event handler for when a Texture is loading
 */
export type TextureLoadingEventHandler = (target: any) => void;
/**
 * Event handler for when a Texture is loaded
 */
export type TextureLoadedEventHandler = (target: any, dimensions: Readonly<Dimensions>) => void;
/**
 * Event handler for when a Texture fails to load
 */
export type TextureFailedEventHandler = (target: any, error: Error) => void;
/**
 * TextureData that is used to populate a CoreContextTexture
 */
export interface TextureData {
    /**
     * The texture data
     */
    data: ImageBitmap | ImageData | SubTextureProps | null;
    /**
     * Premultiply alpha when uploading texture data to the GPU
     *
     * @defaultValue `false`
     */
    premultiplyAlpha?: boolean;
}
export type TextureState = 'loading' | 'loaded' | 'failed';
export interface TextureStateEventMap {
    loading: TextureLoadingEventHandler;
    loaded: TextureLoadedEventHandler;
    failed: TextureFailedEventHandler;
}
/**
 * Like the built-in Parameters<> type but skips the first parameter (which is
 * `target` currently)
 */
type ParametersSkipTarget<T extends (...args: any) => any> = T extends (target: any, ...args: infer P) => any ? P : never;
/**
 * Represents a source of texture data for a CoreContextTexture.
 *
 * @remarks
 * Texture sources are used to populate a CoreContextTexture when that texture
 * is loaded. Texture data retrieved by the CoreContextTexture by the
 * `getTextureData` method. It's the responsibility of the concerete `Texture`
 * subclass to implement this method appropriately.
 */
export declare abstract class Texture extends EventEmitter {
    protected txManager: CoreTextureManager;
    /**
     * The dimensions of the texture
     *
     * @remarks
     * Until the texture data is loaded for the first time the value will be
     * `null`.
     */
    readonly dimensions: Readonly<Dimensions> | null;
    readonly error: Error | null;
    readonly state: TextureState;
    constructor(txManager: CoreTextureManager);
    /**
     * Set the state of the texture
     *
     * @remark
     * Intended for internal-use only but declared public so that it can be set
     * by it's associated {@link CoreContextTexture}
     *
     * @param state
     * @param args
     */
    setState<State extends TextureState>(state: State, ...args: ParametersSkipTarget<TextureStateEventMap[State]>): void;
    /**
     * Get the texture data for this texture.
     *
     * @remarks
     * This method is called by the CoreContextTexture when the texture is loaded.
     * The texture data is then used to populate the CoreContextTexture.
     *
     * @returns
     * The texture data for this texture.
     */
    abstract getTextureData(): Promise<TextureData>;
    /**
     * Make a cache key for this texture.
     *
     * @remarks
     * Each concrete `Texture` subclass must implement this method to provide an
     * appropriate cache key for the texture type including the texture's
     * properties that uniquely identify a copy of the texture. If the texture
     * type does not support caching, then this method should return `false`.
     *
     * @param props
     * @returns
     * A cache key for this texture or `false` if the texture type does not
     * support caching.
     */
    static makeCacheKey(props: unknown): string | false;
    /**
     * Resolve the default values for the texture's properties.
     *
     * @remarks
     * Each concrete `Texture` subclass must implement this method to provide
     * default values for the texture's optional properties.
     *
     * @param props
     * @returns
     * The default values for the texture's properties.
     */
    static resolveDefaults(props: unknown): Record<string, unknown>;
}
export {};
