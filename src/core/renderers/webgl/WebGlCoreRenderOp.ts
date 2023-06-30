import { CoreRenderOp } from '../CoreRenderOp.js';
import { WebGlCoreShader } from './WebGlCoreShader.js';
import type { WebGlCoreCtxTexture } from './WebGlCoreCtxTexture.js';
import type { CoreShaderManager } from '../../CoreShaderManager.js';
import type { Dimensions } from './internal/RendererUtils.js';

/**
 * Can render multiple quads with multiple textures (up to vertex shader texture limit)
 *
 */
export class WebGlCoreRenderOp extends CoreRenderOp {
  length = 0;
  numQuads = 0;
  textures: WebGlCoreCtxTexture[] = [];
  readonly maxTextures: number;

  constructor(
    readonly gl: WebGLRenderingContext | WebGL2RenderingContext,
    readonly shManager: CoreShaderManager,
    readonly quadBuffer: ArrayBuffer,
    readonly quadWebGlBuffer: WebGLBuffer,
    readonly dimensions: Dimensions,
    readonly shader: WebGlCoreShader,
    readonly bufferIdx: number,
  ) {
    super();
    this.gl = gl;
    this.maxTextures = shader.supportsIndexedTextures
      ? (gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) as number)
      : 1;
  }

  addTexture(texture: WebGlCoreCtxTexture): number {
    const { textures, maxTextures } = this;
    const existingIdx = textures.findIndex((t) => t === texture);
    if (existingIdx !== -1) {
      return existingIdx;
    }
    const newIdx = textures.length;
    if (newIdx >= maxTextures) {
      return 0xffffffff;
    }
    this.textures.push(texture);
    return newIdx;
  }

  draw() {
    const { gl, shManager, shader } = this;

    shManager.useShader(shader);
    shader.bindRenderOp(this);

    // TODO: Reduce calculations required
    const quadIdx = (this.bufferIdx / 24) * 6 * 2;

    // TODO: Move these somewhere else?
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.drawElements(
      gl.TRIANGLES,
      6 * this.numQuads,
      gl.UNSIGNED_SHORT,
      quadIdx,
    );

    // this.shader.draw(this);

    // gl.drawElements(
    //   gl.TRIANGLES,
    //   this.quads.length,
    //   gl.UNSIGNED_SHORT,
    //   0
    // );
  }
}
