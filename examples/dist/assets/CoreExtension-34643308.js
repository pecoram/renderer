var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function createWebGLContext(canvas) {
  const config = {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: true,
    desynchronized: false,
    // Disabled because it prevents Visual Regression Tests from working
    // failIfMajorPerformanceCaveat: true,
    powerPreference: "high-performance",
    premultipliedAlpha: true,
    preserveDrawingBuffer: false
  };
  return (
    // TODO: Remove this assertion once this issue is fixed in TypeScript
    // https://github.com/microsoft/TypeScript/issues/53614
    canvas.getContext("webgl", config) || canvas.getContext("experimental-webgl", config)
  );
}
function assertTruthy(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}
function mergeColorProgress(rgba1, rgba2, p) {
  const r1 = Math.trunc(rgba1 >>> 24);
  const g1 = Math.trunc(rgba1 >>> 16 & 255);
  const b1 = Math.trunc(rgba1 >>> 8 & 255);
  const a1 = Math.trunc(rgba1 & 255);
  const r2 = Math.trunc(rgba2 >>> 24);
  const g2 = Math.trunc(rgba2 >>> 16 & 255);
  const b2 = Math.trunc(rgba2 >>> 8 & 255);
  const a2 = Math.trunc(rgba2 & 255);
  const r = Math.round(r2 * p + r1 * (1 - p));
  const g = Math.round(g2 * p + g1 * (1 - p));
  const b = Math.round(b2 * p + b1 * (1 - p));
  const a = Math.round(a2 * p + a1 * (1 - p));
  return (r << 24 | g << 16 | b << 8 | a) >>> 0;
}
function mergeColorAlpha(rgba, alpha) {
  const r = rgba >>> 24;
  const g = rgba >>> 16 & 255;
  const b = rgba >>> 8 & 255;
  const a = Math.trunc((rgba & 255) * alpha);
  return (r << 24 | g << 16 | b << 8 | a) >>> 0;
}
function mergeColorAlphaPremultiplied(rgba, alpha, flipEndianess = false) {
  const newAlpha = (rgba & 255) / 255 * alpha;
  const r = Math.trunc((rgba >>> 24) * newAlpha);
  const g = Math.trunc((rgba >>> 16 & 255) * newAlpha);
  const b = Math.trunc((rgba >>> 8 & 255) * newAlpha);
  const a = Math.trunc(newAlpha * 255);
  if (flipEndianess) {
    return (a << 24 | b << 16 | g << 8 | r) >>> 0;
  }
  return (r << 24 | g << 16 | b << 8 | a) >>> 0;
}
function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function deg2Rad(degrees) {
  return degrees * Math.PI / 180;
}
const isPowerOfTwo = (value) => {
  return value && !(value & value - 1);
};
const getTimingBezier = (a, b, c, d) => {
  const xc = 3 * a;
  const xb = 3 * (c - a) - xc;
  const xa = 1 - xc - xb;
  const yc = 3 * b;
  const yb = 3 * (d - b) - yc;
  const ya = 1 - yc - yb;
  return function(time) {
    if (time >= 1) {
      return 1;
    }
    if (time <= 0) {
      return 0;
    }
    let t = 0.5, cbx, cbxd, dx;
    for (let it = 0; it < 20; it++) {
      cbx = t * (t * (t * xa + xb) + xc);
      dx = time - cbx;
      if (dx > -1e-8 && dx < 1e-8) {
        return t * (t * (t * ya + yb) + yc);
      }
      cbxd = t * (t * (3 * xa) + 2 * xb) + xc;
      if (cbxd > 1e-10 && cbxd < 1e-10) {
        break;
      }
      t += dx / cbxd;
    }
    let minT = 0;
    let maxT = 1;
    for (let it = 0; it < 20; it++) {
      t = 0.5 * (minT + maxT);
      cbx = t * (t * (t * xa + xb) + xc);
      dx = time - cbx;
      if (dx > -1e-8 && dx < 1e-8) {
        return t * (t * (t * ya + yb) + yc);
      }
      if (dx < 0) {
        maxT = t;
      } else {
        minT = t;
      }
    }
  };
};
const getTimingFunction = (str) => {
  switch (str) {
    case "linear":
      return function(time) {
        return time;
      };
    case "ease":
      return getTimingBezier(0.25, 0.1, 0.25, 1);
    case "ease-in":
      return getTimingBezier(0.42, 0, 1, 1);
    case "ease-out":
      return getTimingBezier(0, 0, 0.58, 1);
    case "ease-in-out":
      return getTimingBezier(0.42, 0, 0.58, 1);
    case "ease-in-sine":
      return getTimingBezier(0.12, 0, 0.39, 0);
    case "ease-out-sine":
      return getTimingBezier(0.12, 0, 0.39, 0);
    case "ease-in-out-sine":
      return getTimingBezier(0.37, 0, 0.63, 1);
    case "ease-in-cubic":
      return getTimingBezier(0.32, 0, 0.67, 0);
    case "ease-out-cubic":
      return getTimingBezier(0.33, 1, 0.68, 1);
    case "ease-in-out-cubic":
      return getTimingBezier(0.65, 0, 0.35, 1);
    case "ease-in-circ":
      return getTimingBezier(0.55, 0, 1, 0.45);
    case "ease-out-circ":
      return getTimingBezier(0, 0.55, 0.45, 1);
    case "ease-in-out-circ":
      return getTimingBezier(0.85, 0, 0.15, 1);
    case "ease-in-back":
      return getTimingBezier(0.36, 0, 0.66, -0.56);
    case "ease-out-back":
      return getTimingBezier(0.34, 1.56, 0.64, 1);
    case "ease-in-out-back":
      return getTimingBezier(0.68, -0.6, 0.32, 1.6);
    case "step-start":
      return function() {
        return 1;
      };
    case "step-end":
      return function(time) {
        return time === 1 ? 1 : 0;
      };
    default:
      const s = "cubic-bezier(";
      if (str && str.indexOf(s) === 0) {
        const parts = str.substr(s.length, str.length - s.length - 1).split(",");
        if (parts.length !== 4) {
          console.warn("Unknown timing function: " + str);
          return function(time) {
            return time;
          };
        }
        const a = parseFloat(parts[0] || "0.42");
        const b = parseFloat(parts[1] || "0");
        const c = parseFloat(parts[2] || "1");
        const d = parseFloat(parts[3] || "1");
        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
          console.warn(" Unknown timing function: " + str);
          return function(time) {
            return time;
          };
        }
        return getTimingBezier(a, b, c, d);
      } else {
        console.warn("Unknown timing function: " + str);
        return function(time) {
          return time;
        };
      }
  }
};
if (!Math.hypot)
  Math.hypot = (...args) => {
    let y = 0, i = args.length;
    while (i--) {
      y += args[i] * args[i];
    }
    return Math.sqrt(y);
  };
class EventEmitter {
  constructor() {
    __publicField(this, "eventListeners", {});
  }
  on(event, listener) {
    let listeners = this.eventListeners[event];
    if (!listeners) {
      listeners = [];
    }
    listeners.push(listener);
    this.eventListeners[event] = listeners;
  }
  off(event, listener) {
    const listeners = this.eventListeners[event];
    if (!listeners) {
      return;
    }
    if (!listener) {
      delete this.eventListeners[event];
      return;
    }
    const index = listeners.indexOf(listener);
    if (index >= 0) {
      listeners.splice(index, 1);
    }
  }
  once(event, listener) {
    const onceListener = (target, data) => {
      this.off(event, onceListener);
      listener(target, data);
    };
    this.on(event, onceListener);
  }
  emit(event, data) {
    const listeners = this.eventListeners[event];
    if (!listeners) {
      return;
    }
    [...listeners].forEach((listener) => {
      listener(this, data);
    });
  }
  removeAllListeners() {
    this.eventListeners = {};
  }
}
class CoreContextTexture {
  constructor(textureSource) {
    __publicField(this, "textureSource");
    this.textureSource = textureSource;
  }
}
class CoreRenderer {
  constructor(stage) {
    __publicField(this, "stage");
    this.stage = stage;
  }
}
class CoreRenderOp {
}
class CoreShader {
  // abstract draw(): void;
  static makeCacheKey(props) {
    return false;
  }
  static resolveDefaults(props) {
    return {};
  }
}
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error();
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  if (!program) {
    throw new Error();
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return void 0;
}
function isWebGl2(gl) {
  return self.WebGL2RenderingContext && gl instanceof self.WebGL2RenderingContext;
}
class WebGlCoreShader extends CoreShader {
  constructor(options) {
    super();
    __publicField(this, "boundBufferCollection", null);
    __publicField(this, "buffersBound", false);
    __publicField(this, "program");
    /**
     * Vertex Array Object
     *
     * @remarks
     * Used by WebGL2 Only
     */
    __publicField(this, "vao");
    __publicField(this, "renderer");
    __publicField(this, "gl");
    __publicField(this, "attributeBuffers");
    __publicField(this, "attributeLocations");
    __publicField(this, "attributeNames");
    __publicField(this, "uniformLocations");
    __publicField(this, "uniformTypes");
    __publicField(this, "supportsIndexedTextures");
    const renderer = this.renderer = options.renderer;
    const gl = this.gl = this.renderer.gl;
    this.supportsIndexedTextures = options.supportsIndexedTextures || false;
    const webGl2 = isWebGl2(gl);
    const requiredExtensions = webGl2 && options.webgl2Extensions || !webGl2 && options.webgl1Extensions || [];
    const glVersion = webGl2 ? "2.0" : "1.0";
    requiredExtensions.forEach((extensionName) => {
      if (!gl.getExtension(extensionName)) {
        throw new Error(`Shader "${this.constructor.name}" requires extension "${extensionName}" for WebGL ${glVersion} but wasn't found`);
      }
    });
    const shaderSources = options.shaderSources || this.constructor.shaderSources;
    if (!shaderSources) {
      throw new Error(`Shader "${this.constructor.name}" is missing shaderSources.`);
    } else if (webGl2 && (shaderSources == null ? void 0 : shaderSources.webGl2)) {
      shaderSources.fragment = shaderSources.webGl2.fragment;
      shaderSources.vertex = shaderSources.webGl2.vertex;
      delete shaderSources.webGl2;
    }
    const textureUnits = renderer.system.parameters.MAX_VERTEX_TEXTURE_IMAGE_UNITS;
    const vertexSource = shaderSources.vertex instanceof Function ? shaderSources.vertex(textureUnits) : shaderSources.vertex;
    const fragmentSource = shaderSources.fragment instanceof Function ? shaderSources.fragment(textureUnits) : shaderSources.fragment;
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) {
      throw new Error();
    }
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      throw new Error();
    }
    this.program = program;
    if (webGl2) {
      const vao = gl.createVertexArray();
      if (!vao) {
        throw new Error();
      }
      this.vao = vao;
      gl.bindVertexArray(this.vao);
    }
    this.attributeLocations = {};
    this.attributeBuffers = {};
    this.attributeNames = [];
    [...options.attributes].forEach((attributeName) => {
      const location = gl.getAttribLocation(this.program, attributeName);
      if (location < 0) {
        throw new Error(`${this.constructor.name}: Vertex shader must have an attribute "${attributeName}"!`);
      }
      const buffer = gl.createBuffer();
      if (!buffer) {
        throw new Error(`${this.constructor.name}: Could not create buffer for attribute "${attributeName}"`);
      }
      this.attributeLocations[attributeName] = location;
      this.attributeBuffers[attributeName] = buffer;
      this.attributeNames.push(attributeName);
    });
    this.uniformLocations = {};
    this.uniformTypes = {};
    options.uniforms.forEach((uniform) => {
      const location = gl.getUniformLocation(this.program, uniform.name);
      this.uniformTypes[uniform.name] = uniform.uniform;
      if (!location) {
        console.warn(`Shader "${this.constructor.name}" could not get uniform location for "${uniform.name}"`);
        return;
      }
      this.uniformLocations[uniform.name] = location;
    });
  }
  bindBufferAttribute(location, buffer, attribute) {
    const gl = this.gl;
    gl.enableVertexAttribArray(location);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(location, attribute.size, attribute.type, attribute.normalized, attribute.stride, attribute.offset);
  }
  disableAttribute(location) {
    this.gl.disableVertexAttribArray(location);
  }
  disableAttributes() {
    for (const loc in this.attributeLocations) {
      this.disableAttribute(this.attributeLocations[loc]);
    }
    this.boundBufferCollection = null;
  }
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
  canBatchShaderProps(propsA, propsB) {
    return false;
  }
  bindRenderOp(renderOp, props) {
    this.bindBufferCollection(renderOp.buffers);
    if (renderOp.textures.length > 0) {
      this.bindTextures(renderOp.textures);
    }
    const { gl } = renderOp;
    this.setUniform("u_resolution", [gl.canvas.width, gl.canvas.height]);
    this.setUniform("u_pixelRatio", renderOp.options.pixelRatio);
    if (props) {
      if (hasOwn(props, "$dimensions")) {
        let dimensions = props.$dimensions;
        if (!dimensions) {
          dimensions = renderOp.dimensions;
        }
        this.setUniform("u_dimensions", [dimensions.width, dimensions.height]);
      }
      if (hasOwn(props, "$alpha")) {
        let alpha = props.$alpha;
        if (!alpha) {
          alpha = renderOp.alpha;
        }
        this.setUniform("u_alpha", alpha);
      }
      this.bindProps(props);
    }
  }
  setUniform(name, ...value) {
    this.gl[this.uniformTypes[name]](this.uniformLocations[name], ...value);
  }
  bindBufferCollection(buffer) {
    if (this.boundBufferCollection === buffer) {
      return;
    }
    for (const attributeName in this.attributeLocations) {
      const resolvedBuffer = buffer.getBuffer(attributeName);
      const resolvedInfo = buffer.getAttributeInfo(attributeName);
      assertTruthy(resolvedBuffer, `Buffer for "${attributeName}" not found`);
      assertTruthy(resolvedInfo);
      this.bindBufferAttribute(this.attributeLocations[attributeName], resolvedBuffer, resolvedInfo);
    }
    this.boundBufferCollection = buffer;
  }
  bindProps(props) {
  }
  bindTextures(textures) {
  }
  attach() {
    this.gl.useProgram(this.program);
    if (isWebGl2(this.gl) && this.vao) {
      this.gl.bindVertexArray(this.vao);
    }
  }
  detach() {
    this.disableAttributes();
  }
}
__publicField(WebGlCoreShader, "shaderSources");
class WebGlCoreRenderOp extends CoreRenderOp {
  constructor(gl, options, buffers, shader, shaderProps, alpha, clippingRect, dimensions, bufferIdx, zIndex) {
    super();
    __publicField(this, "gl");
    __publicField(this, "options");
    __publicField(this, "buffers");
    __publicField(this, "shader");
    __publicField(this, "shaderProps");
    __publicField(this, "alpha");
    __publicField(this, "clippingRect");
    __publicField(this, "dimensions");
    __publicField(this, "bufferIdx");
    __publicField(this, "zIndex");
    __publicField(this, "length", 0);
    __publicField(this, "numQuads", 0);
    __publicField(this, "textures", []);
    __publicField(this, "maxTextures");
    this.gl = gl;
    this.options = options;
    this.buffers = buffers;
    this.shader = shader;
    this.shaderProps = shaderProps;
    this.alpha = alpha;
    this.clippingRect = clippingRect;
    this.dimensions = dimensions;
    this.bufferIdx = bufferIdx;
    this.zIndex = zIndex;
    this.gl = gl;
    this.maxTextures = shader.supportsIndexedTextures ? gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) : 1;
  }
  addTexture(texture) {
    const { textures, maxTextures } = this;
    const existingIdx = textures.findIndex((t) => t === texture);
    if (existingIdx !== -1) {
      return existingIdx;
    }
    const newIdx = textures.length;
    if (newIdx >= maxTextures) {
      return 4294967295;
    }
    this.textures.push(texture);
    return newIdx;
  }
  draw() {
    const { gl, shader, shaderProps, options } = this;
    const { shManager } = options;
    shManager.useShader(shader);
    shader.bindRenderOp(this, shaderProps);
    const quadIdx = this.bufferIdx / 24 * 6 * 2;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    if (this.clippingRect) {
      const { x, y, width, height } = this.clippingRect;
      const pixelRatio = options.pixelRatio;
      const canvasHeight = options.canvas.height;
      const clipX = Math.round(x * pixelRatio);
      const clipWidth = Math.round(width * pixelRatio);
      const clipHeight = Math.round(height * pixelRatio);
      const clipY = Math.round(canvasHeight - clipHeight - y * pixelRatio);
      gl.enable(gl.SCISSOR_TEST);
      gl.scissor(clipX, clipY, clipWidth, clipHeight);
    } else {
      gl.disable(gl.SCISSOR_TEST);
    }
    gl.drawElements(gl.TRIANGLES, 6 * this.numQuads, gl.UNSIGNED_SHORT, quadIdx);
  }
}
function getWebGlParameters(gl) {
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
    MAX_FRAGMENT_UNIFORM_VECTORS: 0
  };
  const keys = Object.keys(params);
  keys.forEach((key) => {
    params[key] = gl.getParameter(gl[key]);
  });
  return params;
}
function getWebGlExtensions(gl) {
  const extensions = {
    ANGLE_instanced_arrays: null,
    WEBGL_compressed_texture_s3tc: null,
    WEBGL_compressed_texture_astc: null,
    WEBGL_compressed_texture_etc: null,
    WEBGL_compressed_texture_etc1: null,
    WEBGL_compressed_texture_pvrtc: null,
    WEBKIT_WEBGL_compressed_texture_pvrtc: null,
    WEBGL_compressed_texture_s3tc_srgb: null,
    OES_vertex_array_object: null
  };
  const keys = Object.keys(extensions);
  keys.forEach((key) => {
    extensions[key] = gl.getExtension(key);
  });
  return extensions;
}
function createIndexBuffer(gl, size) {
  if (!gl) {
    throw new Error("No WebGL context");
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
const TRANSPARENT_TEXTURE_DATA = new Uint8Array([0, 0, 0, 0]);
class WebGlCoreCtxTexture extends CoreContextTexture {
  constructor(gl, textureSource) {
    super(textureSource);
    __publicField(this, "gl");
    __publicField(this, "_nativeCtxTexture", null);
    __publicField(this, "_state", "freed");
    __publicField(this, "_w", 0);
    __publicField(this, "_h", 0);
    this.gl = gl;
  }
  get ctxTexture() {
    if (this._state === "freed") {
      this.load();
    }
    assertTruthy(this._nativeCtxTexture);
    return this._nativeCtxTexture;
  }
  get w() {
    return this._w;
  }
  get h() {
    return this._h;
  }
  /**
   * Load the texture data from the Texture source and upload it to the GPU
   *
   * @remarks
   * This method is called automatically when accessing the ctxTexture property
   * if the texture hasn't been loaded yet. But it can also be called manually
   * to force the texture to be pre-loaded prior to accessing the ctxTexture
   * property.
   */
  load() {
    if (this._state === "loading" || this._state === "loaded") {
      return;
    }
    this._state = "loading";
    this.textureSource.setState("loading");
    this.onLoadRequest().then(({ width, height }) => {
      this._state = "loaded";
      this._w = width;
      this._h = height;
      this.textureSource.setState("loaded", { width, height });
    }).catch((err) => {
      this._state = "failed";
      this.textureSource.setState("failed", err);
      console.error(err);
    });
  }
  /**
   * Called when the texture data needs to be loaded and uploaded to a texture
   */
  async onLoadRequest() {
    var _a;
    this._nativeCtxTexture = this.createNativeCtxTexture();
    const { gl } = this;
    gl.bindTexture(gl.TEXTURE_2D, this._nativeCtxTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, this._nativeCtxTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, TRANSPARENT_TEXTURE_DATA);
    const textureData = await ((_a = this.textureSource) == null ? void 0 : _a.getTextureData());
    let width = 0;
    let height = 0;
    assertTruthy(this._nativeCtxTexture);
    if (textureData.data instanceof ImageBitmap || textureData.data instanceof ImageData) {
      const data = textureData.data;
      width = data.width;
      height = data.height;
      gl.bindTexture(gl.TEXTURE_2D, this._nativeCtxTexture);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !!textureData.premultiplyAlpha);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
      if (isWebGl2(gl) || isPowerOfTwo(width) && isPowerOfTwo(height)) {
        gl.generateMipmap(gl.TEXTURE_2D);
      }
    } else if (textureData.data === null) {
      width = 0;
      height = 0;
      gl.bindTexture(gl.TEXTURE_2D, this._nativeCtxTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, TRANSPARENT_TEXTURE_DATA);
    } else {
      console.error(`WebGlCoreCtxTexture.onLoadRequest: Unexpected textureData returned`, textureData);
    }
    return {
      width,
      height
    };
  }
  /**
   * Free the WebGLTexture from the GPU
   *
   * @returns
   */
  free() {
    if (this._state === "freed") {
      return;
    }
    this._state = "freed";
    this._w = 0;
    this._h = 0;
    if (!this._nativeCtxTexture) {
      return;
    }
    this.gl.deleteTexture(this._nativeCtxTexture);
    this._nativeCtxTexture = null;
  }
  createNativeCtxTexture() {
    const nativeTexture = this.gl.createTexture();
    if (!nativeTexture) {
      throw new Error("Could not create WebGL Texture");
    }
    return nativeTexture;
  }
}
class Texture extends EventEmitter {
  constructor(txManager) {
    super();
    __publicField(this, "txManager");
    /**
     * The dimensions of the texture
     *
     * @remarks
     * Until the texture data is loaded for the first time the value will be
     * `null`.
     */
    __publicField(this, "dimensions", null);
    __publicField(this, "error", null);
    __publicField(this, "state", "loading");
    this.txManager = txManager;
  }
  /**
   * Set the state of the texture
   *
   * @remark
   * Intended for internal-use only but declared public so that it can be set
   * by it's associated {@link CoreContextTexture}
   *
   * @param state
   * @param args
   */
  setState(state, ...args) {
    if (this.state !== state) {
      this.state = state;
      if (state === "loaded") {
        const loadedArgs = args;
        this.dimensions = loadedArgs[0];
      } else if (state === "failed") {
        const failedArgs = args;
        this.error = failedArgs[0];
      }
      this.emit(state, ...args);
    }
  }
  /**
   * Make a cache key for this texture.
   *
   * @remarks
   * Each concrete `Texture` subclass must implement this method to provide an
   * appropriate cache key for the texture type including the texture's
   * properties that uniquely identify a copy of the texture. If the texture
   * type does not support caching, then this method should return `false`.
   *
   * @param props
   * @returns
   * A cache key for this texture or `false` if the texture type does not
   * support caching.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static makeCacheKey(props) {
    return false;
  }
  /**
   * Resolve the default values for the texture's properties.
   *
   * @remarks
   * Each concrete `Texture` subclass must implement this method to provide
   * default values for the texture's optional properties.
   *
   * @param props
   * @returns
   * The default values for the texture's properties.
   */
  static resolveDefaults(props) {
    return {};
  }
}
const _ColorTexture = class _ColorTexture extends Texture {
  constructor(txManager, props) {
    super(txManager);
    __publicField(this, "props");
    this.props = _ColorTexture.resolveDefaults(props || {});
  }
  get color() {
    return this.props.color;
  }
  set color(color) {
    this.props.color = color;
  }
  async getTextureData() {
    const pixelData32 = new Uint32Array([this.color]);
    const pixelData8 = new Uint8ClampedArray(pixelData32.buffer);
    return {
      data: new ImageData(pixelData8, 1, 1),
      premultiplyAlpha: true
    };
  }
  static makeCacheKey(props) {
    const resolvedProps = _ColorTexture.resolveDefaults(props);
    return `ColorTexture,${resolvedProps.color}`;
  }
  static resolveDefaults(props) {
    return {
      color: props.color || 4294967295
    };
  }
};
__publicField(_ColorTexture, "z$__type__Props");
let ColorTexture = _ColorTexture;
const _SubTexture = class _SubTexture extends Texture {
  constructor(txManager, props) {
    super(txManager);
    __publicField(this, "props");
    __publicField(this, "parentTexture");
    __publicField(this, "onParentTxLoaded", () => {
      this.setState("loaded", {
        width: this.props.width,
        height: this.props.height
      });
    });
    __publicField(this, "onParentTxFailed", (target, error) => {
      this.setState("failed", error);
    });
    this.parentTexture = this.txManager.loadTexture(props.texture.txType, props.texture.props, props.texture.options);
    this.props = _SubTexture.resolveDefaults(props || {});
    queueMicrotask(() => {
      const parentTx = this.parentTexture;
      if (parentTx.state === "loaded") {
        this.onParentTxLoaded(parentTx, parentTx.dimensions);
      } else if (parentTx.state === "failed") {
        this.onParentTxFailed(parentTx, parentTx.error);
      }
      parentTx.on("loaded", this.onParentTxLoaded);
      parentTx.on("failed", this.onParentTxFailed);
    });
  }
  async getTextureData() {
    return {
      data: this.props
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static makeCacheKey(props) {
    return false;
  }
  static resolveDefaults(props) {
    return {
      texture: props.texture,
      x: props.x || 0,
      y: props.y || 0,
      width: props.width || 0,
      height: props.height || 0
    };
  }
};
__publicField(_SubTexture, "z$__type__Props");
let SubTexture = _SubTexture;
class WebGlCoreCtxSubTexture extends WebGlCoreCtxTexture {
  constructor(gl, textureSource) {
    super(gl, textureSource);
  }
  async onLoadRequest() {
    var _a, _b;
    const props = await this.textureSource.getTextureData();
    return {
      width: ((_a = props.data) == null ? void 0 : _a.width) || 0,
      height: ((_b = props.data) == null ? void 0 : _b.height) || 0
    };
  }
}
const getNormalizedRgbaComponents = (rgba) => {
  const r = rgba >>> 24;
  const g = rgba >>> 16 & 255;
  const b = rgba >>> 8 & 255;
  const a = rgba & 255;
  return [r / 255, g / 255, b / 255, a / 255];
};
function getNormalizedAlphaComponent(rgba) {
  return (rgba & 255) / 255;
}
function getRgbaString(color) {
  const r = Math.floor(color[0] * 255);
  const g = Math.floor(color[1] * 255);
  const b = Math.floor(color[2] * 255);
  const a = Math.floor(color[3] * 255);
  return `rgba(${r},${g},${b},${a.toFixed(4)})`;
}
function createBound(x1, y1, x2, y2, out) {
  if (out) {
    out.x1 = x1;
    out.y1 = y1;
    out.x2 = x2;
    out.y2 = y2;
    return out;
  }
  return {
    x1,
    y1,
    x2,
    y2
  };
}
function intersectBound(a, b, out) {
  const intersection = createBound(Math.max(a.x1, b.x1), Math.max(a.y1, b.y1), Math.min(a.x2, b.x2), Math.min(a.y2, b.y2), out);
  if (intersection.x1 < intersection.x2 && intersection.y1 < intersection.y2) {
    return intersection;
  }
  return createBound(0, 0, 0, 0, intersection);
}
function intersectRect(a, b) {
  const x = Math.max(a.x, b.x);
  const y = Math.max(a.y, b.y);
  const width = Math.min(a.x + a.width, b.x + b.width) - x;
  const height = Math.min(a.y + a.height, b.y + b.height) - y;
  if (width > 0 && height > 0) {
    return {
      x,
      y,
      width,
      height
    };
  }
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
}
function compareRect(a, b) {
  if (a === b) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function isBoundPositive(bound) {
  return bound.x1 < bound.x2 && bound.y1 < bound.y2;
}
class BufferCollection {
  constructor(config) {
    __publicField(this, "config");
    this.config = config;
  }
  /**
   * Get the WebGLBuffer associated with the given attribute name if it exists.
   *
   * @param attributeName
   * @returns
   */
  getBuffer(attributeName) {
    var _a;
    return (_a = this.config.find((item) => item.attributes[attributeName])) == null ? void 0 : _a.buffer;
  }
  /**
   * Get the AttributeInfo associated with the given attribute name if it exists.
   *
   * @param attributeName
   * @returns
   */
  getAttributeInfo(attributeName) {
    var _a;
    return (_a = this.config.find((item) => item.attributes[attributeName])) == null ? void 0 : _a.attributes[attributeName];
  }
}
const WORDS_PER_QUAD = 24;
class WebGlCoreRenderer extends CoreRenderer {
  constructor(options) {
    super(options.stage);
    //// WebGL Native Context and Data
    __publicField(this, "gl");
    __publicField(this, "system");
    //// Core Managers
    __publicField(this, "txManager");
    __publicField(this, "shManager");
    //// Options
    __publicField(this, "options");
    //// Persistent data
    __publicField(this, "quadBuffer", new ArrayBuffer(1024 * 1024 * 4));
    __publicField(this, "fQuadBuffer", new Float32Array(this.quadBuffer));
    __publicField(this, "uiQuadBuffer", new Uint32Array(this.quadBuffer));
    __publicField(this, "renderOps", []);
    //// Render Op / Buffer Filling State
    __publicField(this, "curBufferIdx", 0);
    __publicField(this, "curRenderOp", null);
    __publicField(this, "renderables", []);
    //// Default Shader
    __publicField(this, "defaultShader");
    __publicField(this, "quadBufferCollection");
    /**
     * White pixel texture used by default when no texture is specified.
     */
    __publicField(this, "defaultTexture");
    const { canvas, clearColor, bufferMemory } = options;
    this.options = options;
    this.txManager = options.txManager;
    this.shManager = options.shManager;
    this.defaultTexture = new ColorTexture(this.txManager);
    const gl = createWebGLContext(canvas);
    if (!gl) {
      throw new Error("Unable to create WebGL context");
    }
    this.gl = gl;
    const color = getNormalizedRgbaComponents(clearColor);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(color[0], color[1], color[2], color[3]);
    createIndexBuffer(gl, bufferMemory);
    this.system = {
      parameters: getWebGlParameters(gl),
      extensions: getWebGlExtensions(gl)
    };
    this.shManager.renderer = this;
    this.defaultShader = this.shManager.loadShader("DefaultShaderBatched").shader;
    const quadBuffer = gl.createBuffer();
    assertTruthy(quadBuffer);
    const stride = 6 * Float32Array.BYTES_PER_ELEMENT;
    this.quadBufferCollection = new BufferCollection([
      {
        buffer: quadBuffer,
        attributes: {
          a_position: {
            name: "a_position",
            size: 2,
            type: gl.FLOAT,
            normalized: false,
            stride,
            offset: 0
            // start at the beginning of the buffer
          },
          a_textureCoordinate: {
            name: "a_textureCoordinate",
            size: 2,
            type: gl.FLOAT,
            normalized: false,
            stride,
            offset: 2 * Float32Array.BYTES_PER_ELEMENT
          },
          a_color: {
            name: "a_color",
            size: 4,
            type: gl.UNSIGNED_BYTE,
            normalized: true,
            stride,
            offset: 4 * Float32Array.BYTES_PER_ELEMENT
          },
          a_textureIndex: {
            name: "a_textureIndex",
            size: 1,
            type: gl.FLOAT,
            normalized: false,
            stride,
            offset: 5 * Float32Array.BYTES_PER_ELEMENT
          }
        }
      }
    ]);
  }
  reset() {
    this.curBufferIdx = 0;
    this.curRenderOp = null;
    this.renderOps.length = 0;
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
  getShaderManager() {
    return this.shManager;
  }
  createCtxTexture(textureSource) {
    if (textureSource instanceof SubTexture) {
      return new WebGlCoreCtxSubTexture(this.gl, textureSource);
    }
    return new WebGlCoreCtxTexture(this.gl, textureSource);
  }
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
  addRenderable(renderable) {
    var _a;
    (_a = this.renderables) == null ? void 0 : _a.push(renderable);
  }
  addQuad(params) {
    var _a, _b;
    const { fQuadBuffer, uiQuadBuffer } = this;
    const { width, height, colorTl, colorTr, colorBl, colorBr, textureOptions, shader, shaderProps, alpha, clippingRect, tx, ty, ta, tb, tc, td } = params;
    let { texture } = params;
    if (shaderProps && hasOwn(shaderProps, "$dimensions")) {
      const dimensions = shaderProps.$dimensions;
      dimensions.width = width;
      dimensions.height = height;
    }
    texture = texture != null ? texture : this.defaultTexture;
    assertTruthy(texture instanceof Texture, "Invalid texture type");
    let { curBufferIdx: bufferIdx, curRenderOp } = this;
    const targetDims = {
      width,
      height
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    };
    const targetShader = shader || this.defaultShader;
    assertTruthy(targetShader instanceof WebGlCoreShader);
    if (curRenderOp) {
      if (curRenderOp.shader !== targetShader || !compareRect(curRenderOp.clippingRect, clippingRect) || curRenderOp.shader !== this.defaultShader && (!shaderProps || !curRenderOp.shader.canBatchShaderProps(curRenderOp.shaderProps, shaderProps))) {
        curRenderOp = null;
      }
    }
    assertTruthy(targetShader instanceof WebGlCoreShader);
    if (!curRenderOp) {
      this.newRenderOp(targetShader, shaderProps, alpha, targetDims, clippingRect, bufferIdx);
      curRenderOp = this.curRenderOp;
      assertTruthy(curRenderOp);
    }
    const flipX = (_a = textureOptions == null ? void 0 : textureOptions.flipX) != null ? _a : false;
    const flipY = (_b = textureOptions == null ? void 0 : textureOptions.flipY) != null ? _b : false;
    let texCoordX1 = 0;
    let texCoordY1 = 0;
    let texCoordX2 = 1;
    let texCoordY2 = 1;
    if (texture instanceof SubTexture) {
      const { x: tx2, y: ty2, width: tw, height: th } = texture.props;
      const { width: parentW = 0, height: parentH = 0 } = texture.parentTexture.dimensions || { width: 0, height: 0 };
      texCoordX1 = tx2 / parentW;
      texCoordX2 = texCoordX1 + tw / parentW;
      texCoordY1 = ty2 / parentH;
      texCoordY2 = texCoordY1 + th / parentH;
      texture = texture.parentTexture;
    }
    if (flipX) {
      [texCoordX1, texCoordX2] = [texCoordX2, texCoordX1];
    }
    if (flipY) {
      [texCoordY1, texCoordY2] = [texCoordY2, texCoordY1];
    }
    const { txManager } = this.stage;
    const ctxTexture = txManager.getCtxTexture(texture);
    assertTruthy(ctxTexture instanceof WebGlCoreCtxTexture);
    const textureIdx = this.addTexture(ctxTexture, bufferIdx);
    curRenderOp = this.curRenderOp;
    assertTruthy(curRenderOp);
    if (tb !== 0 || tc !== 0) {
      fQuadBuffer[bufferIdx++] = tx;
      fQuadBuffer[bufferIdx++] = ty;
      fQuadBuffer[bufferIdx++] = texCoordX1;
      fQuadBuffer[bufferIdx++] = texCoordY1;
      uiQuadBuffer[bufferIdx++] = mergeColorAlphaPremultiplied(colorTl, alpha, true);
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = tx + width * ta;
      fQuadBuffer[bufferIdx++] = ty + width * tc;
      fQuadBuffer[bufferIdx++] = texCoordX2;
      fQuadBuffer[bufferIdx++] = texCoordY1;
      uiQuadBuffer[bufferIdx++] = mergeColorAlphaPremultiplied(colorTr, alpha, true);
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = tx + height * tb;
      fQuadBuffer[bufferIdx++] = ty + height * td;
      fQuadBuffer[bufferIdx++] = texCoordX1;
      fQuadBuffer[bufferIdx++] = texCoordY2;
      uiQuadBuffer[bufferIdx++] = mergeColorAlphaPremultiplied(colorBl, alpha, true);
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = tx + width * ta + height * tb;
      fQuadBuffer[bufferIdx++] = ty + width * tc + height * td;
      fQuadBuffer[bufferIdx++] = texCoordX2;
      fQuadBuffer[bufferIdx++] = texCoordY2;
      uiQuadBuffer[bufferIdx++] = mergeColorAlphaPremultiplied(colorBr, alpha, true);
      fQuadBuffer[bufferIdx++] = textureIdx;
    } else {
      const rightCornerX = tx + width * ta;
      const rightCornerY = ty + height * td;
      fQuadBuffer[bufferIdx++] = tx;
      fQuadBuffer[bufferIdx++] = ty;
      fQuadBuffer[bufferIdx++] = texCoordX1;
      fQuadBuffer[bufferIdx++] = texCoordY1;
      uiQuadBuffer[bufferIdx++] = mergeColorAlphaPremultiplied(colorTl, alpha, true);
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = rightCornerX;
      fQuadBuffer[bufferIdx++] = ty;
      fQuadBuffer[bufferIdx++] = texCoordX2;
      fQuadBuffer[bufferIdx++] = texCoordY1;
      uiQuadBuffer[bufferIdx++] = mergeColorAlphaPremultiplied(colorTr, alpha, true);
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = tx;
      fQuadBuffer[bufferIdx++] = rightCornerY;
      fQuadBuffer[bufferIdx++] = texCoordX1;
      fQuadBuffer[bufferIdx++] = texCoordY2;
      uiQuadBuffer[bufferIdx++] = mergeColorAlphaPremultiplied(colorBl, alpha, true);
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = rightCornerX;
      fQuadBuffer[bufferIdx++] = rightCornerY;
      fQuadBuffer[bufferIdx++] = texCoordX2;
      fQuadBuffer[bufferIdx++] = texCoordY2;
      uiQuadBuffer[bufferIdx++] = mergeColorAlphaPremultiplied(colorBr, alpha, true);
      fQuadBuffer[bufferIdx++] = textureIdx;
    }
    curRenderOp.length += WORDS_PER_QUAD;
    curRenderOp.numQuads++;
    this.curBufferIdx = bufferIdx;
  }
  /**
   * Replace the existing RenderOp with a new one that uses the specified Shader
   * and starts at the specified buffer index.
   *
   * @param shader
   * @param bufferIdx
   */
  newRenderOp(shader, shaderProps, alpha, dimensions, clippingRect, bufferIdx) {
    const curRenderOp = new WebGlCoreRenderOp(this.gl, this.options, this.quadBufferCollection, shader, shaderProps, alpha, clippingRect, dimensions, bufferIdx, 0);
    this.curRenderOp = curRenderOp;
    this.renderOps.push(curRenderOp);
  }
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
  addTexture(texture, bufferIdx, recursive) {
    const { curRenderOp } = this;
    assertTruthy(curRenderOp);
    const textureIdx = curRenderOp.addTexture(texture);
    if (textureIdx === 4294967295) {
      if (recursive) {
        throw new Error("Unable to add texture to render op");
      }
      const { shader, shaderProps, dimensions, clippingRect, alpha } = curRenderOp;
      this.newRenderOp(shader, shaderProps, alpha, dimensions, clippingRect, bufferIdx);
      return this.addTexture(texture, bufferIdx, true);
    }
    return textureIdx;
  }
  /**
   * Sort renderable children and add them to the render ops.
   * @todo:
   * - move to merge sort to keep relative order
   * - support z-index parent locking
   *
   */
  sortRenderables() {
    const { renderables } = this;
    renderables.sort((a, b) => a.zIndex - b.zIndex);
    renderables.forEach((renderable) => {
      if (renderable instanceof WebGlCoreRenderOp) {
        this.renderOps.push(renderable);
        this.curRenderOp = null;
      } else {
        this.addQuad(renderable);
      }
    });
  }
  /**
   * Render the current set of RenderOps to render to the specified surface.
   *
   * TODO: 'screen' is the only supported surface at the moment.
   *
   * @param surface
   */
  render(surface = "screen") {
    var _a;
    const { gl, quadBuffer } = this;
    const arr = new Float32Array(quadBuffer, 0, this.curBufferIdx);
    const buffer = (_a = this.quadBufferCollection.getBuffer("a_position")) != null ? _a : null;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, arr, gl.DYNAMIC_DRAW);
    this.renderOps.forEach((renderOp, i) => {
      renderOp.draw();
    });
    this.renderables = [];
  }
}
class TrFontFace extends EventEmitter {
  constructor(fontFamily, descriptors) {
    super();
    __publicField(this, "fontFamily");
    __publicField(this, "descriptors");
    __publicField(this, "loaded", false);
    this.fontFamily = fontFamily;
    this.descriptors = {
      style: "normal",
      weight: "normal",
      stretch: "normal",
      ...descriptors
    };
  }
  /**
   * Convert a TrFontFaceDescriptors to a FontFaceDescriptors which differ slightly
   *
   * @param descriptors
   * @returns
   */
  static convertToCssFontFaceDescriptors(descriptors) {
    return {
      style: descriptors.style,
      weight: typeof descriptors.weight === "number" ? `${descriptors.weight}` : descriptors.weight,
      stretch: descriptors.stretch,
      unicodeRange: descriptors.unicodeRange,
      variant: descriptors.variant,
      featureSettings: descriptors.featureSettings,
      display: descriptors.display
    };
  }
}
const SpecialCodepoints = {
  LINE_FEED: 10,
  CARRIAGE_RETURN: 13,
  SPACE: 32,
  TAB: 9,
  ZERO_WIDTH_SPACE: 8203,
  ZERO_WIDTH_NON_JOINER: 8204,
  ZERO_WIDTH_JOINER: 8205,
  LEFT_TO_RIGHT_MARK: 8206,
  RIGHT_TO_LEFT_MARK: 8207,
  LEFT_TO_RIGHT_EMBEDDING: 8234,
  RIGHT_TO_LEFT_EMBEDDING: 8235,
  POP_DIRECTIONAL_FORMATTING: 8236,
  LEFT_TO_RIGHT_OVERRIDE: 8237,
  RIGHT_TO_LEFT_OVERRIDE: 8238,
  LINE_SEPARATOR: 8232,
  PARAGRAPH_SEPARATOR: 8233,
  OBJECT_REPLACEMENT_CHARACTER: 65532,
  REPLACEMENT_CHARACTER: 65533,
  ZERO_WIDTH_NO_BREAK_SPACE: 65279,
  LEFT_TO_RIGHT_ISOLATE: 8294,
  RIGHT_TO_LEFT_ISOLATE: 8295,
  FIRST_STRONG_ISOLATE: 8296,
  POP_DIRECTIONAL_ISOLATE: 8297,
  INHIBIT_SYMMETRIC_SWAPPING: 8298,
  ACTIVATE_SYMMETRIC_SWAPPING: 8299,
  INHIBIT_ARABIC_FORM_SHAPING: 8300,
  ACTIVATE_ARABIC_FORM_SHAPING: 8301,
  NATIONAL_DIGIT_SHAPES: 8302,
  NOMINAL_DIGIT_SHAPES: 8303,
  LEFT_TO_RIGHT_BOUNDARY: 8206,
  RIGHT_TO_LEFT_BOUNDARY: 8207
};
class FontShaper {
}
class SdfFontShaper extends FontShaper {
  constructor(data) {
    super();
    __publicField(this, "data");
    __publicField(this, "kernings");
    this.data = data;
    const kernings = this.kernings = {};
    data.kernings.forEach((kerning) => {
      const second = kerning.second;
      const firsts = kernings[second] = kernings[second] || {};
      firsts[kerning.first] = kerning.amount;
    });
    this.kernings = kernings;
  }
  *shapeText(props, codepoints) {
    var _a;
    let codepointResult;
    let lastGlyphId = void 0;
    while ((codepointResult = codepoints.peek()) && !codepointResult.done) {
      const codepoint = codepointResult.value;
      const glyph = this.data.chars.find((char) => char.id === codepoint);
      codepoints.next();
      if (glyph !== void 0) {
        const kerning = lastGlyphId !== void 0 ? (((_a = this.kernings[glyph.id]) == null ? void 0 : _a[lastGlyphId]) || 0) + props.letterSpacing : 0;
        lastGlyphId = glyph.id;
        yield {
          mapped: true,
          glyphId: glyph.id,
          codepoint,
          cluster: codepoints.lastIndex,
          xAdvance: glyph.xadvance + kerning,
          yAdvance: 0,
          xOffset: glyph.xoffset + kerning,
          yOffset: glyph.yoffset,
          xBearing: 0,
          yBearing: 0,
          width: glyph.width,
          height: glyph.height
        };
      } else {
        if (codepoint === SpecialCodepoints.LINE_FEED) {
          lastGlyphId = void 0;
        }
        yield {
          mapped: false,
          codepoint,
          cluster: codepoints.lastIndex
        };
      }
    }
  }
}
class SdfTrFontFace extends TrFontFace {
  constructor(fontFamily, descriptors, type, stage, atlasUrl, atlasDataUrl) {
    super(fontFamily, descriptors);
    __publicField(this, "type");
    __publicField(this, "texture");
    __publicField(this, "data");
    __publicField(this, "shaper");
    __publicField(this, "glyphMap", /* @__PURE__ */ new Map());
    this.type = type;
    const renderer = stage.renderer;
    assertTruthy(renderer instanceof WebGlCoreRenderer, "SDF Font Faces can only be used with the WebGL Renderer");
    this.texture = stage.txManager.loadTexture("ImageTexture", {
      src: atlasUrl,
      // IMPORTANT: The SDF shader requires the alpha channel to NOT be
      // premultiplied on the atlas texture. If it is premultiplied, the
      // rendering of SDF glyphs (especially single-channel SDF fonts) will
      // be very jagged.
      premultiplyAlpha: false
    }, {
      preload: true
    });
    fetch(atlasDataUrl).then(async (response) => {
      this.data = await response.json();
      this.shaper = new SdfFontShaper(this.data);
      this.data.chars.forEach((glyph) => {
        this.glyphMap.set(glyph.id, glyph);
      });
      this.checkLoaded();
    }).catch(console.error);
  }
  getAtlasEntry(glyphId) {
    const glyph = this.glyphMap.get(glyphId);
    if (glyph === void 0) {
      throw new Error(`Glyph ${glyphId} not found in font ${this.fontFamily}`);
    }
    return {
      x: glyph.x,
      y: glyph.y,
      width: glyph.width,
      height: glyph.height
    };
  }
  checkLoaded() {
    if (this.loaded)
      return;
    if (
      /*this.texture.loaded && */
      this.data
    ) {
      this.loaded = true;
      this.emit("loaded");
    }
  }
}
class WebTrFontFace extends TrFontFace {
  constructor(fontFamily, descriptors, fontUrl) {
    super(fontFamily, descriptors);
    __publicField(this, "fontFace");
    __publicField(this, "fontUrl");
    const fontUrlWithoutParentheses = fontUrl.replace(/\(|\)/g, "");
    const determinedDescriptors = this.descriptors;
    const cssDescriptors = {
      style: determinedDescriptors.style,
      weight: typeof determinedDescriptors.weight === "number" ? `${determinedDescriptors.weight}` : determinedDescriptors.weight,
      stretch: determinedDescriptors.stretch,
      unicodeRange: determinedDescriptors.unicodeRange,
      variant: determinedDescriptors.variant,
      featureSettings: determinedDescriptors.featureSettings,
      display: determinedDescriptors.display
    };
    const fontFace = new FontFace(fontFamily, `url(${fontUrlWithoutParentheses})`, cssDescriptors);
    fontFace.load().then(() => {
      this.loaded = true;
      this.emit("loaded");
    }).catch(console.error);
    this.fontFace = fontFace;
    this.fontUrl = fontUrl;
  }
}
class CoreExtension {
}
export {
  BufferCollection as B,
  CoreExtension as C,
  EventEmitter as E,
  SdfTrFontFace as S,
  Texture as T,
  WebTrFontFace as W,
  assertTruthy as a,
  mergeColorProgress as b,
  WebGlCoreShader as c,
  deg2Rad as d,
  getNormalizedRgbaComponents as e,
  ColorTexture as f,
  getTimingFunction as g,
  SubTexture as h,
  isBoundPositive as i,
  createBound as j,
  intersectBound as k,
  WebGlCoreRenderOp as l,
  mergeColorAlpha as m,
  getRgbaString as n,
  intersectRect as o,
  getNormalizedAlphaComponent as p,
  WebGlCoreRenderer as q
};
//# sourceMappingURL=CoreExtension-34643308.js.map
