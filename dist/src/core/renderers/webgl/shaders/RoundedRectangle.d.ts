import type { WebGlCoreRenderer } from '../WebGlCoreRenderer.js';
import { WebGlCoreShader, type DimensionsShaderProp } from '../WebGlCoreShader.js';
import type { WebGlCoreCtxTexture } from '../WebGlCoreCtxTexture.js';
import type { ShaderProgramSources } from '../internal/ShaderUtils.js';
/**
 * Properties of the {@link RoundedRectangle} shader
 */
export interface RoundedRectangleProps extends DimensionsShaderProp {
    /**
     * Corner radius, in pixels, to cut out of the corners
     *
     * @defaultValue 10
     */
    radius?: number;
}
/**
 * Similar to the {@link DefaultShader} but cuts out 4 rounded rectangle corners
 * as defined by the specified corner {@link RoundedRectangleProps.radius}
 */
export declare class RoundedRectangle extends WebGlCoreShader {
    constructor(renderer: WebGlCoreRenderer);
    static z$__type__Props: RoundedRectangleProps;
    static resolveDefaults(props: RoundedRectangleProps): Required<RoundedRectangleProps>;
    bindTextures(textures: WebGlCoreCtxTexture[]): void;
    protected bindProps(props: Required<RoundedRectangleProps>): void;
    canBatchShaderProps(propsA: Required<RoundedRectangleProps>, propsB: Required<RoundedRectangleProps>): boolean;
    static shaderSources: ShaderProgramSources;
}
