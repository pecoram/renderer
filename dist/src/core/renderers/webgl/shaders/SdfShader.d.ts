import type { WebGlCoreCtxTexture } from '../WebGlCoreCtxTexture.js';
import type { WebGlCoreRenderer } from '../WebGlCoreRenderer.js';
import { WebGlCoreShader } from '../WebGlCoreShader.js';
import type { ShaderProgramSources } from '../internal/ShaderUtils.js';
declare module '../../../CoreShaderManager.js' {
    interface ShaderMap {
        SdfShader: typeof SdfShader;
    }
}
/**
 * Properties of the {@link SdfShader}
 */
export interface SdfShaderProps {
    transform?: Float32Array;
    scrollY?: number;
    /**
     * Color in RGBA format
     *
     * @remarks
     * Color channels must NOT be premultiplied by alpha for best blending results.
     */
    color?: number;
    size?: number;
    distanceRange?: number;
    debug?: boolean;
}
/**
 * SdfShader supports multi-channel and single-channel signed distance field textures.
 *
 * @remarks
 * This Shader is used by the {@link SdfTextRenderer}. Do not use thie Shader
 * directly. Instead create a Text Node and assign a SDF font family to it.
 *
 * @internalRemarks
 * The only thing this shader does to support multi-channel SDFs is to
 * add a median function to the fragment shader. If this one function call
 * ends up being a performance bottleneck we can always look at ways to
 * remove it.
 */
export declare class SdfShader extends WebGlCoreShader {
    constructor(renderer: WebGlCoreRenderer);
    bindTextures(textures: WebGlCoreCtxTexture[]): void;
    protected bindProps(props: SdfShaderProps): void;
    static resolveDefaults(props?: SdfShaderProps): Required<SdfShaderProps>;
    static shaderSources: ShaderProgramSources;
}
