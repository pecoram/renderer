import { CoreRenderer, type QuadOptions } from '../CoreRenderer.js';
import { WebGlCoreRenderOp } from './WebGlCoreRenderOp.js';
import type { CoreContextTexture } from '../CoreContextTexture.js';
import { type CoreWebGlParameters, type CoreWebGlExtensions } from './internal/RendererUtils.js';
import { Texture } from '../../textures/Texture.js';
import type { Stage } from '../../Stage.js';
import type { CoreTextureManager } from '../../CoreTextureManager.js';
import { CoreShaderManager } from '../../CoreShaderManager.js';
import { BufferCollection } from './internal/BufferCollection.js';
import { WebGlCoreShader } from './WebGlCoreShader.js';
export interface WebGlCoreRendererOptions {
    stage: Stage;
    canvas: HTMLCanvasElement | OffscreenCanvas;
    pixelRatio: number;
    txManager: CoreTextureManager;
    shManager: CoreShaderManager;
    clearColor: number;
    bufferMemory: number;
}
interface CoreWebGlSystem {
    parameters: CoreWebGlParameters;
    extensions: CoreWebGlExtensions;
}
export declare class WebGlCoreRenderer extends CoreRenderer {
    gl: WebGLRenderingContext;
    system: CoreWebGlSystem;
    txManager: CoreTextureManager;
    shManager: CoreShaderManager;
    options: Required<WebGlCoreRendererOptions>;
    quadBuffer: ArrayBuffer;
    fQuadBuffer: Float32Array;
    uiQuadBuffer: Uint32Array;
    renderOps: WebGlCoreRenderOp[];
    curBufferIdx: number;
    curRenderOp: WebGlCoreRenderOp | null;
    renderables: Array<QuadOptions | WebGlCoreRenderOp>;
    defaultShader: WebGlCoreShader;
    quadBufferCollection: BufferCollection;
    /**
     * White pixel texture used by default when no texture is specified.
     */
    defaultTexture: Texture;
    constructor(options: WebGlCoreRendererOptions);
    reset(): void;
    getShaderManager(): CoreShaderManager;
    createCtxTexture(textureSource: Texture): CoreContextTexture;
    /**
     * Add a renderable to the current set of renderables.
     *
     * @remarks
     * If a {@link QuadOptions} structure is provided, this will ultimately result
     * in a render ops being created, merged and added to the render ops list.
     *
     * If a direct {@link WebGlCoreRenderOp} instance is provided, it will be
     * added to the render ops list as-is. Be sure to set the zIndex correctly of
     * the render op to ensure proper rendering order.
     *
     * @param renderable
     */
    addRenderable(renderable: QuadOptions | WebGlCoreRenderOp): void;
    private addQuad;
    /**
     * Replace the existing RenderOp with a new one that uses the specified Shader
     * and starts at the specified buffer index.
     *
     * @param shader
     * @param bufferIdx
     */
    private newRenderOp;
    /**
     * Add a texture to the current RenderOp. If the texture cannot be added to the
     * current RenderOp, a new RenderOp will be created and the texture will be added
     * to that one.
     *
     * If the texture cannot be added to the new RenderOp, an error will be thrown.
     *
     * @param texture
     * @param bufferIdx
     * @param recursive
     * @returns Assigned Texture Index of the texture in the render op
     */
    private addTexture;
    /**
     * Sort renderable children and add them to the render ops.
     * @todo:
     * - move to merge sort to keep relative order
     * - support z-index parent locking
     *
     */
    sortRenderables(): void;
    /**
     * Render the current set of RenderOps to render to the specified surface.
     *
     * TODO: 'screen' is the only supported surface at the moment.
     *
     * @param surface
     */
    render(surface?: 'screen' | CoreContextTexture): void;
}
export {};
