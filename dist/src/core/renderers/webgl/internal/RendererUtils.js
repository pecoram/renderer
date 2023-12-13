/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2023 Comcast Cable Communications Management, LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Get device specific webgl parameters
 * @param gl
 */
export function getWebGlParameters(gl) {
    const params = {
        MAX_RENDERBUFFER_SIZE: 0,
        MAX_TEXTURE_SIZE: 0,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        MAX_VIEWPORT_DIMS: 0,
        MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0,
        MAX_TEXTURE_IMAGE_UNITS: 0,
        MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0,
        MAX_VERTEX_ATTRIBS: 0,
        MAX_VARYING_VECTORS: 0,
        MAX_VERTEX_UNIFORM_VECTORS: 0,
        MAX_FRAGMENT_UNIFORM_VECTORS: 0,
    };
    // Map over all parameters and get them
    const keys = Object.keys(params);
    keys.forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        params[key] = gl.getParameter(gl[key]);
    });
    return params;
}
/**
 * Get device webgl extensions
 * @param gl
 */
export function getWebGlExtensions(gl) {
    const extensions = {
        ANGLE_instanced_arrays: null,
        WEBGL_compressed_texture_s3tc: null,
        WEBGL_compressed_texture_astc: null,
        WEBGL_compressed_texture_etc: null,
        WEBGL_compressed_texture_etc1: null,
        WEBGL_compressed_texture_pvrtc: null,
        WEBKIT_WEBGL_compressed_texture_pvrtc: null,
        WEBGL_compressed_texture_s3tc_srgb: null,
        OES_vertex_array_object: null,
    };
    // Map over all extensions and get them
    const keys = Object.keys(extensions);
    keys.forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        extensions[key] = gl.getExtension(key);
    });
    return extensions;
}
/**
 * Allocate big memory chunk that we
 * can re-use to draw quads
 * @param size
 */
export function createIndexBuffer(gl, size) {
    if (!gl) {
        throw new Error('No WebGL context');
    }
    const maxQuads = ~~(size / 80);
    const indices = new Uint16Array(maxQuads * 6);
    for (let i = 0, j = 0; i < maxQuads; i += 6, j += 4) {
        indices[i] = j;
        indices[i + 1] = j + 1;
        indices[i + 2] = j + 2;
        indices[i + 3] = j + 2;
        indices[i + 4] = j + 1;
        indices[i + 5] = j + 3;
    }
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
}
//# sourceMappingURL=RendererUtils.js.map