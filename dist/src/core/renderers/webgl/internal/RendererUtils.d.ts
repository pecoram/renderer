export interface CoreWebGlParameters {
    MAX_RENDERBUFFER_SIZE: number;
    MAX_TEXTURE_SIZE: number;
    MAX_VIEWPORT_DIMS: Int32Array;
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: number;
    MAX_TEXTURE_IMAGE_UNITS: number;
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: number;
    MAX_VERTEX_ATTRIBS: number;
    MAX_VARYING_VECTORS: number;
    MAX_VERTEX_UNIFORM_VECTORS: number;
    MAX_FRAGMENT_UNIFORM_VECTORS: number;
}
/**
 * Get device specific webgl parameters
 * @param gl
 */
export declare function getWebGlParameters(gl: WebGLRenderingContext | WebGL2RenderingContext): CoreWebGlParameters;
export interface CoreWebGlExtensions {
    ANGLE_instanced_arrays: ANGLE_instanced_arrays | null;
    WEBGL_compressed_texture_s3tc: WEBGL_compressed_texture_s3tc | null;
    WEBGL_compressed_texture_astc: WEBGL_compressed_texture_astc | null;
    WEBGL_compressed_texture_etc: WEBGL_compressed_texture_etc | null;
    WEBGL_compressed_texture_etc1: WEBGL_compressed_texture_etc1 | null;
    WEBGL_compressed_texture_pvrtc: any | null;
    WEBKIT_WEBGL_compressed_texture_pvrtc: any | null;
    WEBGL_compressed_texture_s3tc_srgb: WEBGL_compressed_texture_s3tc_srgb | null;
    OES_vertex_array_object: OES_vertex_array_object | null;
}
/**
 * Get device webgl extensions
 * @param gl
 */
export declare function getWebGlExtensions(gl: WebGLRenderingContext): CoreWebGlExtensions;
/**
 * Allocate big memory chunk that we
 * can re-use to draw quads
 * @param size
 */
export declare function createIndexBuffer(gl: WebGLRenderingContext | WebGL2RenderingContext, size: number): void;
