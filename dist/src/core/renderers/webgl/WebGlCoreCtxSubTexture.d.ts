import type { Dimensions } from '../../../common/CommonTypes.js';
import type { SubTexture } from '../../textures/SubTexture.js';
import { WebGlCoreCtxTexture } from './WebGlCoreCtxTexture.js';
export declare class WebGlCoreCtxSubTexture extends WebGlCoreCtxTexture {
    constructor(gl: WebGLRenderingContext, textureSource: SubTexture);
    onLoadRequest(): Promise<Dimensions>;
}
