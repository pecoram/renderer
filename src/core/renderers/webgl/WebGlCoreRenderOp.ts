import { CoreRenderOp } from '../CoreRenderOp.js';
import { DefaultShader } from './shaders/DefaultShader.js';
import { DefaultShaderBatched } from './shaders/DefaultShaderBatched.js';
import { WebGlCoreShader } from './WebGlCoreShader.js';
import type { WebGlCoreCtxTexture } from './WebGlCoreCtxTexture.js';
import type { WebGlCoreRendererOptions } from './WebGlCoreRenderer.js';

const MAX_TEXTURES = 8; // TODO: get from gl

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
    protected gl: WebGLRenderingContext | WebGL2RenderingContext,
    protected options: WebGlCoreRendererOptions,
    protected quadBuffer: ArrayBuffer,
    protected quadWebGlBuffer: WebGLBuffer,
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
    const { gl } = this;

    // buffer vertex positions and color

    // execute draw 9 attribs x bytes per element

    // TODO: If using the same program, no need to bind all this again
    this.shader.useProgram();
    this.shader.bindAttributeBuffer('a_position', this.quadWebGlBuffer);
    this.shader.bindAttributeBuffer(
      'a_textureCoordinate',
      this.quadWebGlBuffer,
    );
    this.shader.bindAttributeBuffer('a_color', this.quadWebGlBuffer);
    if (this.shader.supportsIndexedTextures) {
      this.shader.bindAttributeBuffer('a_textureIndex', this.quadWebGlBuffer);
    }
    this.shader.setUniform('u_resolution', gl.canvas.width, gl.canvas.height);
    this.shader.setUniform('u_pixelRatio', this.options.pixelRatio);

    if (this.textures.length >= 1) {
      if (this.shader instanceof DefaultShader) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.shader.bindTexture(this.textures[0]!);
      } else if (this.shader instanceof DefaultShaderBatched) {
        this.shader.bindTextures(this.textures);
      }
    }

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