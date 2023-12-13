import type { WebGlCoreRenderer } from '../WebGlCoreRenderer.js';
import { WebGlCoreShader } from '../WebGlCoreShader.js';
import type { WebGlCoreCtxTexture } from '../WebGlCoreCtxTexture.js';
import type { ShaderProgramSources } from '../internal/ShaderUtils.js';
export declare class DefaultShader extends WebGlCoreShader {
    constructor(renderer: WebGlCoreRenderer);
    bindTextures(textures: WebGlCoreCtxTexture[]): void;
    static shaderSources: ShaderProgramSources;
}
