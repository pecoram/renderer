import { CoreRenderOp } from '../CoreRenderOp.js';
import { WebGlCoreShader } from './WebGlCoreShader.js';
import type { WebGlCoreCtxTexture } from './WebGlCoreCtxTexture.js';
import type { WebGlCoreRendererOptions } from './WebGlCoreRenderer.js';
import type { BufferCollection } from './internal/BufferCollection.js';
import type { Dimensions } from '../../../common/CommonTypes.js';
import type { Rect } from '../../lib/utils.js';
/**
 * Can render multiple quads with multiple textures (up to vertex shader texture limit)
 *
 */
export declare class WebGlCoreRenderOp extends CoreRenderOp {
    readonly gl: WebGLRenderingContext | WebGL2RenderingContext;
    readonly options: WebGlCoreRendererOptions;
    readonly buffers: BufferCollection;
    readonly shader: WebGlCoreShader;
    readonly shaderProps: Record<string, unknown>;
    readonly alpha: number;
    readonly clippingRect: Rect | null;
    readonly dimensions: Dimensions;
    readonly bufferIdx: number;
    readonly zIndex: number;
    length: number;
    numQuads: number;
    textures: WebGlCoreCtxTexture[];
    readonly maxTextures: number;
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, options: WebGlCoreRendererOptions, buffers: BufferCollection, shader: WebGlCoreShader, shaderProps: Record<string, unknown>, alpha: number, clippingRect: Rect | null, dimensions: Dimensions, bufferIdx: number, zIndex: number);
    addTexture(texture: WebGlCoreCtxTexture): number;
    draw(): void;
}
