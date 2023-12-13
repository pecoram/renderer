import type { Dimensions } from '../../../common/CommonTypes.js';
import { CoreShader } from '../CoreShader.js';
import type { WebGlCoreCtxTexture } from './WebGlCoreCtxTexture.js';
import type { WebGlCoreRenderOp } from './WebGlCoreRenderOp.js';
import type { WebGlCoreRenderer } from './WebGlCoreRenderer.js';
import type { BufferCollection } from './internal/BufferCollection.js';
import { type ShaderOptions, type UniformMethodMap, type ShaderProgramSources } from './internal/ShaderUtils.js';
/**
 * Automatic shader prop for the dimensions of the Node being rendered
 *
 * @remarks
 * Shader's who's rendering depends on the dimensions of the Node being rendered
 * should extend this interface from their Prop interface type.
 */
export interface DimensionsShaderProp {
    /**
     * Dimensions of the Node being rendered (Auto-set by the renderer)
     *
     * @remarks
     * DO NOT SET THIS. It is set automatically by the renderer.
     * Any values set here will be ignored.
     */
    $dimensions?: Dimensions;
}
export interface AlphaShaderProp {
    /**
     * Alpha of the Node being rendered (Auto-set by the renderer)
     *
     * @remarks
     * DO NOT SET THIS. It is set automatically by the renderer.
     * Any values set here will be ignored.
     */
    $alpha?: number;
}
export declare abstract class WebGlCoreShader extends CoreShader {
    protected boundBufferCollection: BufferCollection | null;
    protected buffersBound: boolean;
    protected program: WebGLProgram;
    /**
     * Vertex Array Object
     *
     * @remarks
     * Used by WebGL2 Only
     */
    protected vao: WebGLVertexArrayObject | undefined;
    protected renderer: WebGlCoreRenderer;
    protected gl: WebGLRenderingContext;
    protected attributeBuffers: Record<string, WebGLBuffer>;
    protected attributeLocations: Record<string, number>;
    protected attributeNames: string[];
    protected uniformLocations: Record<string, WebGLUniformLocation>;
    protected uniformTypes: Record<string, keyof UniformMethodMap>;
    readonly supportsIndexedTextures: boolean;
    constructor(options: ShaderOptions);
    private bindBufferAttribute;
    disableAttribute(location: number): void;
    disableAttributes(): void;
    /**
     * Given two sets of Shader props destined for this Shader, determine if they can be batched together
     * to reduce the number of draw calls.
     *
     * @remarks
     * This is used by the {@link WebGlCoreRenderer} to determine if it can batch multiple consecutive draw
     * calls into a single draw call.
     *
     * By default, this returns false (meaning no batching is allowed), but can be
     * overridden by child classes to provide more efficient batching.
     *
     * @param propsA
     * @param propsB
     * @returns
     */
    canBatchShaderProps(propsA: Record<string, unknown>, propsB: Record<string, unknown>): boolean;
    bindRenderOp(renderOp: WebGlCoreRenderOp, props: Record<string, unknown> | null): void;
    setUniform(name: string, ...value: any[]): void;
    bindBufferCollection(buffer: BufferCollection): void;
    protected bindProps(props: Record<string, unknown>): void;
    bindTextures(textures: WebGlCoreCtxTexture[]): void;
    attach(): void;
    detach(): void;
    protected static shaderSources?: ShaderProgramSources;
}
