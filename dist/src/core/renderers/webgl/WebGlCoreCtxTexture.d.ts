import type { Dimensions } from '../../../common/CommonTypes.js';
import type { Texture } from '../../textures/Texture.js';
import { CoreContextTexture } from '../CoreContextTexture.js';
/**
 * A wrapper around a WebGLTexture that handles loading the texture data
 * from a Texture source and uploading it to the GPU as well as freeing
 * the uploaded texture.
 *
 * @remarks
 * When accessing the ctxTexture property, the texture will be loaded if
 * it hasn't been already. ctxTexture will always return a valid WebGLTexture
 * and trigger the loading/uploading of the texture's data if it hasn't been
 * loaded yet.
 */
export declare class WebGlCoreCtxTexture extends CoreContextTexture {
    protected gl: WebGLRenderingContext;
    protected _nativeCtxTexture: WebGLTexture | null;
    private _state;
    private _w;
    private _h;
    constructor(gl: WebGLRenderingContext, textureSource: Texture);
    get ctxTexture(): WebGLTexture;
    get w(): number;
    get h(): number;
    /**
     * Load the texture data from the Texture source and upload it to the GPU
     *
     * @remarks
     * This method is called automatically when accessing the ctxTexture property
     * if the texture hasn't been loaded yet. But it can also be called manually
     * to force the texture to be pre-loaded prior to accessing the ctxTexture
     * property.
     */
    load(): void;
    /**
     * Called when the texture data needs to be loaded and uploaded to a texture
     */
    onLoadRequest(): Promise<Dimensions>;
    /**
     * Free the WebGLTexture from the GPU
     *
     * @returns
     */
    free(): void;
    private createNativeCtxTexture;
}
