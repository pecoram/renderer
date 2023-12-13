import type { WebGlCoreRenderer } from '../WebGlCoreRenderer.js';
import { WebGlCoreShader } from '../WebGlCoreShader.js';
import type { WebGlCoreCtxTexture } from '../WebGlCoreCtxTexture.js';
import type { ShaderProgramSources } from '../internal/ShaderUtils.js';
export declare class DefaultShaderBatched extends WebGlCoreShader {
    supportsIndexedTextures: boolean;
    constructor(renderer: WebGlCoreRenderer);
    bindTextures(texture: WebGlCoreCtxTexture[]): void;
    static shaderSources: ShaderProgramSources;
}
