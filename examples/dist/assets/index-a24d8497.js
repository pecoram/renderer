var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a;
import { a as assertTruthy$1, E as EventEmitter, g as getTimingFunction, b as mergeColorProgress, c as WebGlCoreShader, e as getNormalizedRgbaComponents, T as Texture, f as ColorTexture, h as SubTexture, i as isBoundPositive, j as createBound, S as SdfTrFontFace, k as intersectBound, B as BufferCollection, l as WebGlCoreRenderOp, m as mergeColorAlpha, n as getRgbaString, W as WebTrFontFace, o as intersectRect, p as getNormalizedAlphaComponent, q as WebGlCoreRenderer, C as CoreExtension } from "./CoreExtension-34643308.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i = links.length - 1; i >= 0; i--) {
        const link2 = links[i];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule()).catch((err) => {
    const e = new Event("vite:preloadError", { cancelable: true });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  });
};
class TextureUsageTracker {
  constructor(releaseCallback) {
    __publicField(this, "releaseCallback");
    this.releaseCallback = releaseCallback;
  }
}
class ManualCountTextureUsageTracker extends TextureUsageTracker {
  constructor(releaseCallback, options) {
    var _a2, _b;
    super(releaseCallback);
    __publicField(this, "textureMap", /* @__PURE__ */ new Map());
    __publicField(this, "zeroReferenceTextureSet", /* @__PURE__ */ new Set());
    __publicField(this, "options");
    this.options = {
      textureCleanupIntervalMs: (_a2 = options.textureCleanupIntervalMs) != null ? _a2 : 1e4,
      textureCleanupAgeThreadholdMs: (_b = options.textureCleanupAgeThreadholdMs) != null ? _b : 6e4
    };
    setInterval(() => {
      const now = Date.now();
      const thresholdMs = this.options.textureCleanupAgeThreadholdMs;
      for (const textureRefInfo of this.zeroReferenceTextureSet) {
        if (now - textureRefInfo.lastUpdate > thresholdMs) {
          this.releaseCallback(textureRefInfo.id);
          this.textureMap.delete(textureRefInfo.id);
          this.zeroReferenceTextureSet.delete(textureRefInfo);
        }
      }
    }, this.options.textureCleanupIntervalMs);
  }
  registerTexture(texture) {
    var _a2;
    const textureId = (_a2 = texture.options) == null ? void 0 : _a2.id;
    assertTruthy$1(textureId, "Texture must have an id to be registered");
    if (!this.textureMap.has(textureId)) {
      const textureRefInfo = {
        id: textureId,
        nodeRefCount: 0,
        lastUpdate: Date.now()
      };
      this.textureMap.set(textureId, textureRefInfo);
      this.zeroReferenceTextureSet.add(textureRefInfo);
    }
  }
  incrementTextureRefCount(texture) {
    var _a2;
    const textureId = (_a2 = texture.options) == null ? void 0 : _a2.id;
    assertTruthy$1(textureId, "Texture must have an id to be registered");
    let textureRefInfo = this.textureMap.get(textureId);
    if (!textureRefInfo) {
      this.registerTexture(texture);
      textureRefInfo = this.textureMap.get(textureId);
    }
    assertTruthy$1(textureRefInfo, "Texture must have been registered");
    if (texture.txType === "SubTexture") {
      this.incrementTextureRefCount(texture.props.texture);
    }
    textureRefInfo.nodeRefCount++;
    textureRefInfo.lastUpdate = Date.now();
    if (this.zeroReferenceTextureSet.has(textureRefInfo)) {
      this.zeroReferenceTextureSet.delete(textureRefInfo);
    }
  }
  decrementTextureRefCount(texture) {
    var _a2;
    const textureId = (_a2 = texture.options) == null ? void 0 : _a2.id;
    assertTruthy$1(textureId, "Texture must have an id to be registered");
    const textureRefInfo = this.textureMap.get(textureId);
    assertTruthy$1(textureRefInfo, "Texture must have been registered");
    textureRefInfo.nodeRefCount--;
    textureRefInfo.lastUpdate = Date.now();
    if (textureRefInfo.nodeRefCount === 0) {
      this.zeroReferenceTextureSet.add(textureRefInfo);
    }
    if (texture.txType === "SubTexture") {
      this.decrementTextureRefCount(texture.props.texture);
    }
  }
}
class FinalizationRegistryTextureUsageTracker extends TextureUsageTracker {
  constructor(releaseCallback) {
    super(releaseCallback);
    __publicField(this, "registry");
    this.registry = new FinalizationRegistry(releaseCallback);
  }
  registerTexture(texture) {
    var _a2, _b;
    assertTruthy$1((_a2 = texture.options) == null ? void 0 : _a2.id, "Texture must have an ID to be registered");
    this.registry.register(texture, (_b = texture.options) == null ? void 0 : _b.id);
  }
  incrementTextureRefCount() {
  }
  decrementTextureRefCount() {
  }
}
class RendererMain {
  /**
   * Constructs a new Renderer instance
   *
   * @param settings Renderer settings
   * @param target Element ID or HTMLElement to insert the canvas into
   * @param driver Core Driver to use
   */
  constructor(settings, target, driver) {
    __publicField(this, "root", null);
    __publicField(this, "driver");
    __publicField(this, "canvas");
    __publicField(this, "settings");
    __publicField(this, "nodes", /* @__PURE__ */ new Map());
    __publicField(this, "nextTextureId", 1);
    /**
     * Texture Usage Tracker for Usage Based Texture Garbage Collection
     *
     * @remarks
     * For internal use only. DO NOT ACCESS.
     */
    __publicField(this, "textureTracker");
    var _a2, _b;
    const resolvedSettings = {
      appWidth: settings.appWidth || 1920,
      appHeight: settings.appHeight || 1080,
      deviceLogicalPixelRatio: settings.deviceLogicalPixelRatio || 1,
      devicePhysicalPixelRatio: settings.devicePhysicalPixelRatio || window.devicePixelRatio,
      clearColor: (_a2 = settings.clearColor) != null ? _a2 : 0,
      coreExtensionModule: settings.coreExtensionModule || null,
      experimental_FinalizationRegistryTextureUsageTracker: (_b = settings.experimental_FinalizationRegistryTextureUsageTracker) != null ? _b : false,
      textureCleanupOptions: settings.textureCleanupOptions || {}
    };
    this.settings = resolvedSettings;
    const { appWidth, appHeight, deviceLogicalPixelRatio, devicePhysicalPixelRatio } = resolvedSettings;
    const releaseCallback = (textureId) => {
      this.driver.releaseTexture(textureId);
    };
    const useFinalizationRegistryTracker = resolvedSettings.experimental_FinalizationRegistryTextureUsageTracker && typeof FinalizationRegistry === "function";
    this.textureTracker = useFinalizationRegistryTracker ? new FinalizationRegistryTextureUsageTracker(releaseCallback) : new ManualCountTextureUsageTracker(releaseCallback, this.settings.textureCleanupOptions);
    const deviceLogicalWidth = appWidth * deviceLogicalPixelRatio;
    const deviceLogicalHeight = appHeight * deviceLogicalPixelRatio;
    this.driver = driver;
    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    canvas.width = deviceLogicalWidth * devicePhysicalPixelRatio;
    canvas.height = deviceLogicalHeight * devicePhysicalPixelRatio;
    canvas.style.width = `${deviceLogicalWidth}px`;
    canvas.style.height = `${deviceLogicalHeight}px`;
    let targetEl;
    if (typeof target === "string") {
      targetEl = document.getElementById(target);
    } else {
      targetEl = target;
    }
    if (!targetEl) {
      throw new Error("Could not find target element");
    }
    driver.onCreateNode = (node) => {
      this.nodes.set(node.id, node);
    };
    driver.onBeforeDestroyNode = (node) => {
      this.nodes.delete(node.id);
    };
    targetEl.appendChild(canvas);
  }
  /**
   * Initialize the renderer
   *
   * @remarks
   * This method must be called and resolved asyncronously before any other
   * methods are called.
   */
  async init() {
    await this.driver.init(this, this.settings, this.canvas);
    this.root = this.driver.getRootNode();
  }
  /**
   * Create a new scene graph node
   *
   * @remarks
   * A node is the main graphical building block of the Renderer scene graph. It
   * can be a container for other nodes, or it can be a leaf node that renders a
   * solid color, gradient, image, or specific texture, using a specific shader.
   *
   * To create a text node, see {@link createTextNode}.
   *
   * See {@link INode} for more details.
   *
   * @param props
   * @returns
   */
  createNode(props) {
    return this.driver.createNode(this.resolveNodeDefaults(props));
  }
  /**
   * Create a new scene graph text node
   *
   * @remarks
   * A text node is the second graphical building block of the Renderer scene
   * graph. It renders text using a specific text renderer that is automatically
   * chosen based on the font requested and what type of fonts are installed
   * into an app via a CoreExtension.
   *
   * See {@link ITextNode} for more details.
   *
   * @param props
   * @returns
   */
  createTextNode(props) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
    const data = {
      ...this.resolveNodeDefaults(props),
      text: (_a2 = props.text) != null ? _a2 : "",
      textRendererOverride: (_b = props.textRendererOverride) != null ? _b : null,
      fontSize: (_c = props.fontSize) != null ? _c : 16,
      fontFamily: (_d = props.fontFamily) != null ? _d : "sans-serif",
      fontStyle: (_e = props.fontStyle) != null ? _e : "normal",
      fontWeight: (_f = props.fontWeight) != null ? _f : "normal",
      fontStretch: (_g = props.fontStretch) != null ? _g : "normal",
      textAlign: (_h = props.textAlign) != null ? _h : "left",
      contain: (_i = props.contain) != null ? _i : "none",
      scrollable: (_j = props.scrollable) != null ? _j : false,
      scrollY: (_k = props.scrollY) != null ? _k : 0,
      offsetY: (_l = props.offsetY) != null ? _l : 0,
      letterSpacing: (_m = props.letterSpacing) != null ? _m : 0,
      lineHeight: (_n = props.lineHeight) != null ? _n : null,
      debug: (_o = props.debug) != null ? _o : {}
    };
    return this.driver.createTextNode(data);
  }
  /**
   * Resolves the default property values for a Node
   *
   * @remarks
   * This method is used internally by the RendererMain to resolve the default
   * property values for a Node. It is exposed publicly so that it can be used
   * by Core Driver implementations.
   *
   * @param props
   * @returns
   */
  resolveNodeDefaults(props) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S;
    const color = (_a2 = props.color) != null ? _a2 : 4294967295;
    const colorTl = (_d = (_c = (_b = props.colorTl) != null ? _b : props.colorTop) != null ? _c : props.colorLeft) != null ? _d : color;
    const colorTr = (_g = (_f = (_e = props.colorTr) != null ? _e : props.colorTop) != null ? _f : props.colorRight) != null ? _g : color;
    const colorBl = (_j = (_i = (_h = props.colorBl) != null ? _h : props.colorBottom) != null ? _i : props.colorLeft) != null ? _j : color;
    const colorBr = (_m = (_l = (_k = props.colorBr) != null ? _k : props.colorBottom) != null ? _l : props.colorRight) != null ? _m : color;
    return {
      x: (_n = props.x) != null ? _n : 0,
      y: (_o = props.y) != null ? _o : 0,
      width: (_p = props.width) != null ? _p : 0,
      height: (_q = props.height) != null ? _q : 0,
      alpha: (_r = props.alpha) != null ? _r : 1,
      clipping: (_s = props.clipping) != null ? _s : false,
      color,
      colorTop: (_t = props.colorTop) != null ? _t : color,
      colorBottom: (_u = props.colorBottom) != null ? _u : color,
      colorLeft: (_v = props.colorLeft) != null ? _v : color,
      colorRight: (_w = props.colorRight) != null ? _w : color,
      colorBl,
      colorBr,
      colorTl,
      colorTr,
      zIndex: (_x = props.zIndex) != null ? _x : 0,
      zIndexLocked: (_y = props.zIndexLocked) != null ? _y : 0,
      parent: (_z = props.parent) != null ? _z : null,
      texture: (_A = props.texture) != null ? _A : null,
      shader: (_B = props.shader) != null ? _B : null,
      // Since setting the `src` will trigger a texture load, we need to set it after
      // we set the texture. Otherwise, problems happen.
      src: (_C = props.src) != null ? _C : "",
      scale: (_D = props.scale) != null ? _D : null,
      scaleX: (_F = (_E = props.scaleX) != null ? _E : props.scale) != null ? _F : 1,
      scaleY: (_H = (_G = props.scaleY) != null ? _G : props.scale) != null ? _H : 1,
      mount: (_I = props.mount) != null ? _I : 0,
      mountX: (_K = (_J = props.mountX) != null ? _J : props.mount) != null ? _K : 0,
      mountY: (_M = (_L = props.mountY) != null ? _L : props.mount) != null ? _M : 0,
      pivot: (_N = props.pivot) != null ? _N : 0.5,
      pivotX: (_P = (_O = props.pivotX) != null ? _O : props.pivot) != null ? _P : 0.5,
      pivotY: (_R = (_Q = props.pivotY) != null ? _Q : props.pivot) != null ? _R : 0.5,
      rotation: (_S = props.rotation) != null ? _S : 0
    };
  }
  /**
   * Destroy a node
   *
   * @remarks
   * This method destroys a node but does not destroy its children.
   *
   * @param node
   * @returns
   */
  destroyNode(node) {
    return this.driver.destroyNode(node);
  }
  /**
   * Create a new texture reference
   *
   * @remarks
   * This method creates a new reference to a texture. The texture is not
   * loaded until it is used on a node.
   *
   * It can be assigned to a node's `texture` property, or it can be used
   * when creating a SubTexture.
   *
   * @param textureType
   * @param props
   * @param options
   * @returns
   */
  createTexture(textureType, props, options) {
    const id = this.nextTextureId++;
    const desc = {
      descType: "texture",
      txType: textureType,
      props,
      options: {
        ...options,
        // This ID is used to identify the texture in the CoreTextureManager's
        // ID Texture Map cache.
        id
      }
    };
    this.textureTracker.registerTexture(desc);
    return desc;
  }
  /**
   * Create a new shader reference
   *
   * @remarks
   * This method creates a new reference to a shader. The shader is not
   * loaded until it is used on a Node.
   *
   * It can be assigned to a Node's `shader` property.
   *
   * @param shaderType
   * @param props
   * @returns
   */
  createShader(shaderType, props) {
    return {
      descType: "shader",
      shType: shaderType,
      props
    };
  }
  /**
   * Get a Node by its ID
   *
   * @param id
   * @returns
   */
  getNodeById(id) {
    return this.nodes.get(id) || null;
  }
  toggleFreeze() {
    throw new Error("Not implemented");
  }
  advanceFrame() {
    throw new Error("Not implemented");
  }
  /**
   * Re-render the current frame without advancing any running animations.
   *
   * @remarks
   * Any state changes will be reflected in the re-rendered frame. Useful for
   * debugging.
   *
   * May not do anything if the render loop is running on a separate worker.
   */
  rerender() {
    throw new Error("Not implemented");
  }
}
class CoreAnimation extends EventEmitter {
  constructor(node, props, settings) {
    super();
    __publicField(this, "node");
    __publicField(this, "props");
    __publicField(this, "settings");
    __publicField(this, "propStartValues", {});
    __publicField(this, "restoreValues", {});
    __publicField(this, "progress", 0);
    __publicField(this, "timingFunction");
    this.node = node;
    this.props = props;
    this.settings = settings;
    this.propStartValues = {};
    Object.keys(props).forEach((propName) => {
      this.propStartValues[propName] = node[propName];
    });
    this.timingFunction = (t) => t;
    if (settings.easing && typeof settings.easing === "string") {
      this.timingFunction = getTimingFunction(settings.easing);
    }
  }
  reset() {
    this.progress = 0;
    this.update(0);
  }
  restore() {
    this.reset();
    Object.keys(this.props).forEach((propName) => {
      this.node[propName] = this.propStartValues[propName];
    });
  }
  reverse() {
    this.progress = 0;
    Object.keys(this.props).forEach((propName) => {
      const startValue = this.props[propName];
      const endValue = this.propStartValues[propName];
      this.props[propName] = endValue;
      this.propStartValues[propName] = startValue;
    });
    if (!this.settings.loop) {
      this.settings.stopMethod = false;
    }
  }
  applyEasing(p, s, e) {
    return (this.timingFunction(p) || p) * (e - s) + s;
  }
  update(dt) {
    const { duration, loop, easing } = this.settings;
    if (!duration) {
      this.emit("finished", {});
      return;
    }
    this.progress += dt / duration;
    if (this.progress > 1) {
      this.progress = loop ? 0 : 1;
      this.emit("finished", {});
    }
    Object.keys(this.props).forEach((propName) => {
      const propValue = this.props[propName];
      const startValue = this.propStartValues[propName];
      const endValue = propValue;
      if (propName.indexOf("color") !== -1) {
        const progressValue = easing ? this.timingFunction(this.progress) || this.progress : this.progress;
        const colorValue = mergeColorProgress(startValue, endValue, progressValue);
        this.node[propName] = easing ? colorValue : mergeColorProgress(startValue, endValue, this.progress);
      } else {
        this.node[propName] = easing ? this.applyEasing(this.progress, startValue, endValue) : startValue + (endValue - startValue) * this.progress;
      }
    });
  }
}
class CoreAnimationController {
  constructor(manager, animation) {
    __publicField(this, "manager");
    __publicField(this, "animation");
    __publicField(this, "stoppedPromise", null);
    /**
     * If this is null, then the animation is in a finished / stopped state.
     */
    __publicField(this, "stoppedResolve", null);
    __publicField(this, "state");
    this.manager = manager;
    this.animation = animation;
    this.state = "stopped";
  }
  start() {
    this.makeStoppedPromise();
    this.animation.once("finished", this.finished.bind(this));
    if (!this.manager.activeAnimations.has(this.animation)) {
      this.manager.registerAnimation(this.animation);
    }
    this.state = "running";
    return this;
  }
  stop() {
    this.manager.unregisterAnimation(this.animation);
    if (this.stoppedResolve !== null) {
      this.stoppedResolve();
      this.stoppedResolve = null;
    }
    this.animation.reset();
    this.state = "stopped";
    return this;
  }
  pause() {
    this.manager.unregisterAnimation(this.animation);
    this.state = "paused";
    return this;
  }
  restore() {
    this.stoppedResolve = null;
    this.animation.restore();
    return this;
  }
  waitUntilStopped() {
    this.makeStoppedPromise();
    const promise = this.stoppedPromise;
    assertTruthy$1(promise);
    return promise;
  }
  makeStoppedPromise() {
    if (this.stoppedResolve === null) {
      this.stoppedPromise = new Promise((resolve) => {
        this.stoppedResolve = resolve;
      });
    }
  }
  finished() {
    assertTruthy$1(this.stoppedResolve);
    const { loop, stopMethod } = this.animation.settings;
    if (stopMethod === "reverse") {
      this.animation.reverse();
      this.start();
      return;
    }
    this.stoppedResolve();
    this.stoppedResolve = null;
    if (loop) {
      return;
    }
    this.manager.unregisterAnimation(this.animation);
  }
}
const m0 = 0;
const m1 = 3;
const m2 = 6;
const m3 = 1;
const m4 = 4;
const m5 = 7;
const m6 = 2;
const m7 = 5;
const m8 = 8;
class Matrix3d {
  /**
   * Creates a new 3x3 matrix.
   *
   * @param entries Row-major 3x3 matrix
   */
  constructor(entries) {
    __publicField(this, "data");
    if (entries) {
      this.data = new Float32Array(9);
      this.data[m0] = entries[0];
      this.data[m1] = entries[3];
      this.data[m2] = entries[6];
      this.data[m3] = entries[1];
      this.data[m4] = entries[4];
      this.data[m5] = entries[7];
      this.data[m6] = entries[2];
      this.data[m7] = entries[5];
      this.data[m8] = entries[8];
    } else {
      this.data = new Float32Array(9);
    }
  }
  /**
   * Returns a temporary matrix that can be used for calculations.
   *
   * @remarks
   * This is useful for avoiding allocations in tight loops.
   *
   * The matrix is not guaranteed to be the same between calls.
   *
   * @returns
   */
  static get temp() {
    return tempMatrix;
  }
  static multiply(a, b, out) {
    const e0 = a.data[m0] * b.data[m0] + a.data[m1] * b.data[m3] + a.data[m2] * b.data[m6];
    const e1 = a.data[m0] * b.data[m1] + a.data[m1] * b.data[m4] + a.data[m2] * b.data[m7];
    const e2 = a.data[m0] * b.data[m2] + a.data[m1] * b.data[m5] + a.data[m2] * b.data[m8];
    const e3 = a.data[m3] * b.data[m0] + a.data[m4] * b.data[m3] + a.data[m5] * b.data[m6];
    const e4 = a.data[m3] * b.data[m1] + a.data[m4] * b.data[m4] + a.data[m5] * b.data[m7];
    const e5 = a.data[m3] * b.data[m2] + a.data[m4] * b.data[m5] + a.data[m5] * b.data[m8];
    const e6 = a.data[m6] * b.data[m0] + a.data[m7] * b.data[m3] + a.data[m8] * b.data[m6];
    const e7 = a.data[m6] * b.data[m1] + a.data[m7] * b.data[m4] + a.data[m8] * b.data[m7];
    const e8 = a.data[m6] * b.data[m2] + a.data[m7] * b.data[m5] + a.data[m8] * b.data[m8];
    if (!out) {
      out = new Matrix3d();
    }
    out.data[m0] = e0;
    out.data[m1] = e1;
    out.data[m2] = e2;
    out.data[m3] = e3;
    out.data[m4] = e4;
    out.data[m5] = e5;
    out.data[m6] = e6;
    out.data[m7] = e7;
    out.data[m8] = e8;
    return out;
  }
  static identity(out) {
    if (!out) {
      out = new Matrix3d();
    }
    out.data[m0] = 1;
    out.data[m1] = 0;
    out.data[m2] = 0;
    out.data[m3] = 0;
    out.data[m4] = 1;
    out.data[m5] = 0;
    out.data[m6] = 0;
    out.data[m7] = 0;
    out.data[m8] = 1;
    return out;
  }
  static translate(x, y, out) {
    if (!out) {
      out = new Matrix3d();
    }
    out.data[m0] = 1;
    out.data[m1] = 0;
    out.data[m2] = x;
    out.data[m3] = 0;
    out.data[m4] = 1;
    out.data[m5] = y;
    out.data[m6] = 0;
    out.data[m7] = 0;
    out.data[m8] = 1;
    return out;
  }
  static scale(sx, sy, out) {
    if (!out) {
      out = new Matrix3d();
    }
    out.data[m0] = sx;
    out.data[m1] = 0;
    out.data[m2] = 0;
    out.data[m3] = 0;
    out.data[m4] = sy;
    out.data[m5] = 0;
    out.data[m6] = 0;
    out.data[m7] = 0;
    out.data[m8] = 1;
    return out;
  }
  static rotate(angle, out) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    if (!out) {
      out = new Matrix3d();
    }
    out.data[m0] = cos;
    out.data[m1] = -sin;
    out.data[m2] = 0;
    out.data[m3] = sin;
    out.data[m4] = cos;
    out.data[m5] = 0;
    out.data[m6] = 0;
    out.data[m7] = 0;
    out.data[m8] = 1;
    return out;
  }
  static copy(src, dst, transpose) {
    if (!dst) {
      dst = new Matrix3d();
    }
    dst.data[0] = src.data[0];
    dst.data[1] = src.data[1];
    dst.data[2] = src.data[2];
    dst.data[3] = src.data[3];
    dst.data[4] = src.data[4];
    dst.data[5] = src.data[5];
    dst.data[6] = src.data[6];
    dst.data[7] = src.data[7];
    dst.data[8] = src.data[8];
    return dst;
  }
  translate(x, y) {
    this.data[m2] = this.data[m0] * x + this.data[m1] * y + this.data[m2];
    this.data[m5] = this.data[m3] * x + this.data[m4] * y + this.data[m5];
    return this;
  }
  scale(sx, sy) {
    this.data[m0] = this.data[m0] * sx;
    this.data[m1] = this.data[m1] * sy;
    this.data[m3] = this.data[m3] * sx;
    this.data[m4] = this.data[m4] * sy;
    return this;
  }
  rotate(angle) {
    if (angle === 0 || !(angle % Math.PI * 2)) {
      return this;
    }
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const e0 = this.data[m0] * cos + this.data[m1] * sin;
    const e1 = this.data[m1] * cos - this.data[m0] * sin;
    const e3 = this.data[m3] * cos + this.data[m4] * sin;
    const e4 = this.data[m4] * cos - this.data[m3] * sin;
    this.data[m0] = e0;
    this.data[m1] = e1;
    this.data[m3] = e3;
    this.data[m4] = e4;
    return this;
  }
  multiply(other) {
    return Matrix3d.multiply(this, other, this);
  }
  get tx() {
    return this.data[m2];
  }
  get ty() {
    return this.data[m5];
  }
  get ta() {
    return this.data[m0];
  }
  get tb() {
    return this.data[m1];
  }
  get tc() {
    return this.data[m3];
  }
  get td() {
    return this.data[m4];
  }
  transformPoint(x, y) {
    return [
      this.data[m0] * x + this.data[m1] * y + this.data[m2],
      this.data[m3] * x + this.data[m4] * y + this.data[m3]
    ];
  }
}
const tempMatrix = new Matrix3d();
class CoreNode extends EventEmitter {
  constructor(stage, props) {
    super();
    __publicField(this, "stage");
    __publicField(this, "children", []);
    __publicField(this, "props");
    /**
     * Recalculation type
     * 0 - no recalculation
     * 1 - alpha recalculation
     * 2 - translate recalculation
     * 4 - transform recalculation
     */
    __publicField(this, "recalculationType", 6);
    __publicField(this, "hasUpdates", true);
    __publicField(this, "globalTransform");
    __publicField(this, "scaleRotateTransform");
    __publicField(this, "localTransform");
    __publicField(this, "isComplex", false);
    __publicField(this, "onTextureLoaded", (target, dimensions) => {
      this.emit("loaded", {
        type: "texture",
        dimensions
      });
    });
    __publicField(this, "onTextureFailed", (target, error) => {
      this.emit("failed", {
        type: "texture",
        error
      });
    });
    this.stage = stage;
    this.props = {
      ...props,
      parent: null
    };
    this.parent = props.parent;
    this.updateScaleRotateTransform();
  }
  //#region Textures
  loadTexture(textureType, props, options = null) {
    if (this.props.texture) {
      this.unloadTexture();
    }
    const { txManager } = this.stage;
    const texture = txManager.loadTexture(textureType, props, options);
    this.props.texture = texture;
    this.props.textureOptions = options;
    queueMicrotask(() => {
      if (texture.state === "loaded") {
        this.onTextureLoaded(texture, texture.dimensions);
      } else if (texture.state === "failed") {
        this.onTextureFailed(texture, texture.error);
      }
      texture.on("loaded", this.onTextureLoaded);
      texture.on("failed", this.onTextureFailed);
    });
  }
  unloadTexture() {
    if (this.props.texture) {
      this.props.texture.off("loaded", this.onTextureLoaded);
      this.props.texture.off("failed", this.onTextureFailed);
    }
    this.props.texture = null;
    this.props.textureOptions = null;
  }
  //#endregion Textures
  loadShader(shaderType, props) {
    const shManager = this.stage.renderer.getShaderManager();
    assertTruthy$1(shManager);
    const { shader, props: p } = shManager.loadShader(shaderType, props);
    this.props.shader = shader;
    this.props.shaderProps = p;
  }
  setHasUpdates() {
    if (!this.props.alpha) {
      return;
    }
    this.hasUpdates = true;
    let p = this == null ? void 0 : this.props.parent;
    while (p) {
      p.hasUpdates = true;
      p = p == null ? void 0 : p.props.parent;
    }
  }
  /**
   * 1 - alpha recalculation
   * 2 - translate recalculation
   * 4 - transform recalculation
   * @param type
   */
  setRecalculationType(type) {
    this.recalculationType |= type;
    this.setHasUpdates();
  }
  updateScaleRotateTransform() {
    this.setRecalculationType(4);
    this.scaleRotateTransform = Matrix3d.rotate(this.props.rotation, this.scaleRotateTransform).scale(this.props.scaleX, this.props.scaleY);
    this.updateLocalTransform();
  }
  updateLocalTransform() {
    assertTruthy$1(this.scaleRotateTransform);
    this.setRecalculationType(2);
    const pivotTranslateX = this.props.pivotX * this.props.width;
    const pivotTranslateY = this.props.pivotY * this.props.height;
    const mountTranslateX = this.props.mountX * this.props.width;
    const mountTranslateY = this.props.mountY * this.props.height;
    this.localTransform = Matrix3d.translate(pivotTranslateX - mountTranslateX + this.props.x, pivotTranslateY - mountTranslateY + this.props.y, this.localTransform).multiply(this.scaleRotateTransform).translate(-pivotTranslateX, -pivotTranslateY);
  }
  /**
   * @todo: test for correct calculation flag
   * @param delta
   */
  update(delta) {
    var _a2;
    assertTruthy$1(this.localTransform);
    const parentGlobalTransform = (_a2 = this.parent) == null ? void 0 : _a2.globalTransform;
    if (parentGlobalTransform) {
      this.globalTransform = Matrix3d.copy(parentGlobalTransform, this.globalTransform).multiply(this.localTransform);
    } else {
      this.globalTransform = Matrix3d.copy(this.localTransform, this.globalTransform);
    }
    if (this.children.length) {
      this.children.forEach((child) => {
        child.update(delta);
      });
    }
    this.hasUpdates = false;
    this.recalculationType = 0;
  }
  renderQuads(renderer, clippingRect) {
    const { width, height, colorTl, colorTr, colorBl, colorBr, texture, textureOptions, shader, shaderProps } = this.props;
    const { zIndex, worldAlpha, globalTransform: gt } = this;
    assertTruthy$1(gt);
    renderer.addRenderable({
      width,
      height,
      colorTl,
      colorTr,
      colorBl,
      colorBr,
      texture,
      textureOptions,
      zIndex,
      shader,
      shaderProps,
      alpha: worldAlpha,
      clippingRect,
      tx: gt.tx,
      ty: gt.ty,
      ta: gt.ta,
      tb: gt.tb,
      tc: gt.tc,
      td: gt.td
    });
  }
  //#region Properties
  get id() {
    return this.props.id;
  }
  get x() {
    return this.props.x;
  }
  set x(value) {
    if (this.props.x !== value) {
      this.props.x = value;
      this.updateLocalTransform();
    }
  }
  get absX() {
    var _a2, _b, _c;
    return this.props.x + (((_a2 = this.props.parent) == null ? void 0 : _a2.absX) || ((_c = (_b = this.props.parent) == null ? void 0 : _b.globalTransform) == null ? void 0 : _c.tx) || 0);
  }
  get absY() {
    var _a2, _b;
    return this.props.y + ((_b = (_a2 = this.props.parent) == null ? void 0 : _a2.absY) != null ? _b : 0);
  }
  get y() {
    return this.props.y;
  }
  set y(value) {
    if (this.props.y !== value) {
      this.props.y = value;
      this.updateLocalTransform();
    }
  }
  get width() {
    return this.props.width;
  }
  set width(value) {
    if (this.props.width !== value) {
      this.props.width = value;
      this.updateLocalTransform();
    }
  }
  get height() {
    return this.props.height;
  }
  set height(value) {
    if (this.props.height !== value) {
      this.props.height = value;
      this.updateLocalTransform();
    }
  }
  get scale() {
    return this.scaleX;
  }
  set scale(value) {
    this.scaleX = value;
    this.scaleY = value;
  }
  get scaleX() {
    return this.props.scaleX;
  }
  set scaleX(value) {
    if (this.props.scaleX !== value) {
      this.props.scaleX = value;
      this.updateScaleRotateTransform();
    }
  }
  get scaleY() {
    return this.props.scaleY;
  }
  set scaleY(value) {
    if (this.props.scaleY !== value) {
      this.props.scaleY = value;
      this.updateScaleRotateTransform();
    }
  }
  get worldScaleX() {
    var _a2, _b;
    return this.props.scaleX * ((_b = (_a2 = this.props.parent) == null ? void 0 : _a2.worldScaleX) != null ? _b : 1) || this.props.scaleX;
  }
  get worldScaleY() {
    var _a2, _b;
    return this.props.scaleY * ((_b = (_a2 = this.props.parent) == null ? void 0 : _a2.worldScaleY) != null ? _b : 1) || this.props.scaleY;
  }
  get mount() {
    return this.props.mount;
  }
  set mount(value) {
    this.props.mountX = value;
    this.props.mountY = value;
    this.props.mount = value;
    this.updateLocalTransform();
  }
  get mountX() {
    return this.props.mountX;
  }
  set mountX(value) {
    this.props.mountX = value;
    this.updateLocalTransform();
  }
  get mountY() {
    return this.props.mountY;
  }
  set mountY(value) {
    this.props.mountY = value;
    this.updateLocalTransform();
  }
  get pivot() {
    return this.props.pivot;
  }
  set pivot(value) {
    if (this.props.pivotX !== value || this.props.pivotY !== value) {
      this.props.pivotX = value;
      this.props.pivotY = value;
      this.updateLocalTransform();
    }
  }
  get pivotX() {
    return this.props.pivotX;
  }
  set pivotX(value) {
    this.props.pivotX = value;
    this.updateLocalTransform();
  }
  get pivotY() {
    return this.props.pivotY;
  }
  set pivotY(value) {
    this.props.pivotY = value;
    this.updateLocalTransform();
  }
  get rotation() {
    return this.props.rotation;
  }
  set rotation(value) {
    if (this.props.rotation !== value) {
      this.props.rotation = value;
      this.updateScaleRotateTransform();
    }
  }
  get alpha() {
    return this.props.alpha;
  }
  set alpha(value) {
    this.props.alpha = value;
  }
  get worldAlpha() {
    const props = this.props;
    const parent = props.parent;
    return props.alpha * ((parent == null ? void 0 : parent.worldAlpha) || 1);
  }
  get clipping() {
    return this.props.clipping;
  }
  set clipping(value) {
    this.props.clipping = value;
  }
  get color() {
    return this.props.color;
  }
  set color(value) {
    if (this.props.colorTl !== value || this.props.colorTr !== value || this.props.colorBl !== value || this.props.colorBr !== value) {
      this.colorTl = value;
      this.colorTr = value;
      this.colorBl = value;
      this.colorBr = value;
    }
    this.props.color = value;
  }
  get colorTop() {
    return this.props.colorTop;
  }
  set colorTop(value) {
    if (this.props.colorTl !== value || this.props.colorTr !== value) {
      this.colorTl = value;
      this.colorTr = value;
    }
    this.props.colorTop = value;
  }
  get colorBottom() {
    return this.props.colorBottom;
  }
  set colorBottom(value) {
    if (this.props.colorBl !== value || this.props.colorBr !== value) {
      this.colorBl = value;
      this.colorBr = value;
    }
    this.props.colorBottom = value;
  }
  get colorLeft() {
    return this.props.colorLeft;
  }
  set colorLeft(value) {
    if (this.props.colorTl !== value || this.props.colorBl !== value) {
      this.colorTl = value;
      this.colorBl = value;
    }
    this.props.colorLeft = value;
  }
  get colorRight() {
    return this.props.colorRight;
  }
  set colorRight(value) {
    if (this.props.colorTr !== value || this.props.colorBr !== value) {
      this.colorTr = value;
      this.colorBr = value;
    }
    this.props.colorRight = value;
  }
  get colorTl() {
    return this.props.colorTl;
  }
  set colorTl(value) {
    this.props.colorTl = value;
  }
  get colorTr() {
    return this.props.colorTr;
  }
  set colorTr(value) {
    this.props.colorTr = value;
  }
  get colorBl() {
    return this.props.colorBl;
  }
  set colorBl(value) {
    this.props.colorBl = value;
  }
  get colorBr() {
    return this.props.colorBr;
  }
  set colorBr(value) {
    this.props.colorBr = value;
  }
  // we're only interested in parent zIndex to test
  // if we should use node zIndex is higher then parent zIndex
  get zIndexLocked() {
    return this.props.zIndexLocked || 0;
  }
  set zIndexLocked(value) {
    this.props.zIndexLocked = value;
  }
  get zIndex() {
    var _a2, _b;
    const props = this.props;
    const z = props.zIndex || 0;
    const p = ((_a2 = props.parent) == null ? void 0 : _a2.zIndex) || 0;
    if ((_b = props.parent) == null ? void 0 : _b.zIndexLocked) {
      return z < p ? z : p;
    }
    return z;
  }
  set zIndex(value) {
    this.props.zIndex = value;
  }
  get parent() {
    return this.props.parent;
  }
  set parent(newParent) {
    const oldParent = this.props.parent;
    if (oldParent === newParent) {
      return;
    }
    this.props.parent = newParent;
    if (oldParent) {
      const index = oldParent.children.indexOf(this);
      assertTruthy$1(index !== -1, "CoreNode.parent: Node not found in old parent's children!");
      oldParent.children.splice(index, 1);
    }
    if (newParent) {
      newParent.children.push(this);
    }
    this.updateScaleRotateTransform();
  }
}
let nextId = 1;
function getNewId() {
  return nextId++;
}
class MainOnlyNode extends EventEmitter {
  constructor(props, rendererMain, stage, coreNode) {
    var _a2;
    super();
    __publicField(this, "rendererMain");
    __publicField(this, "stage");
    __publicField(this, "id");
    __publicField(this, "coreNode");
    // Prop stores
    __publicField(this, "_children", []);
    __publicField(this, "_src", "");
    __publicField(this, "_parent", null);
    __publicField(this, "_texture", null);
    __publicField(this, "_shader", null);
    __publicField(this, "onTextureLoaded", (target, payload) => {
      this.emit("loaded", payload);
    });
    __publicField(this, "onTextureFailed", (target, payload) => {
      this.emit("failed", payload);
    });
    this.rendererMain = rendererMain;
    this.stage = stage;
    this.id = (_a2 = coreNode == null ? void 0 : coreNode.id) != null ? _a2 : getNewId();
    this.coreNode = coreNode || new CoreNode(this.stage, {
      id: this.id,
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      alpha: props.alpha,
      clipping: props.clipping,
      color: props.color,
      colorTop: props.colorTop,
      colorBottom: props.colorBottom,
      colorLeft: props.colorLeft,
      colorRight: props.colorRight,
      colorTl: props.colorTl,
      colorTr: props.colorTr,
      colorBl: props.colorBl,
      colorBr: props.colorBr,
      zIndex: props.zIndex,
      zIndexLocked: props.zIndexLocked,
      scaleX: props.scaleX,
      scaleY: props.scaleY,
      mountX: props.mountX,
      mountY: props.mountY,
      mount: props.mount,
      pivot: props.pivot,
      pivotX: props.pivotX,
      pivotY: props.pivotY,
      rotation: props.rotation,
      parent: null,
      shader: null,
      shaderProps: null,
      texture: null,
      textureOptions: null
    });
    this.coreNode.on("loaded", this.onTextureLoaded);
    this.coreNode.on("failed", this.onTextureFailed);
    this.parent = props.parent;
    this.shader = props.shader;
    this.texture = props.texture;
    this.src = props.src;
  }
  get x() {
    return this.coreNode.x;
  }
  set x(value) {
    this.coreNode.x = value;
  }
  get y() {
    return this.coreNode.y;
  }
  set y(value) {
    this.coreNode.y = value;
  }
  get width() {
    return this.coreNode.width;
  }
  set width(value) {
    this.coreNode.width = value;
  }
  get height() {
    return this.coreNode.height;
  }
  set height(value) {
    this.coreNode.height = value;
  }
  get alpha() {
    return this.coreNode.alpha;
  }
  set alpha(value) {
    this.coreNode.alpha = value;
  }
  get clipping() {
    return this.coreNode.clipping;
  }
  set clipping(value) {
    this.coreNode.clipping = value;
  }
  get color() {
    return this.coreNode.color;
  }
  set color(value) {
    this.coreNode.color = value;
  }
  get colorTop() {
    return this.coreNode.colorTop;
  }
  set colorTop(value) {
    this.coreNode.colorTop = value;
  }
  get colorBottom() {
    return this.coreNode.colorBottom;
  }
  set colorBottom(value) {
    this.coreNode.colorBottom = value;
  }
  get colorLeft() {
    return this.coreNode.colorLeft;
  }
  set colorLeft(value) {
    this.coreNode.colorLeft = value;
  }
  get colorRight() {
    return this.coreNode.colorRight;
  }
  set colorRight(value) {
    this.coreNode.colorRight = value;
  }
  get colorTl() {
    return this.coreNode.colorTl;
  }
  set colorTl(value) {
    this.coreNode.colorTl = value;
  }
  get colorTr() {
    return this.coreNode.colorTr;
  }
  set colorTr(value) {
    this.coreNode.colorTr = value;
  }
  get colorBl() {
    return this.coreNode.colorBl;
  }
  set colorBl(value) {
    this.coreNode.colorBl = value;
  }
  get colorBr() {
    return this.coreNode.colorBr;
  }
  set colorBr(value) {
    this.coreNode.colorBr = value;
  }
  get scale() {
    if (this.scaleX !== this.scaleY) {
      return null;
    }
    return this.coreNode.scaleX;
  }
  set scale(value) {
    if (value === null) {
      return;
    }
    this.coreNode.scaleX = value;
    this.coreNode.scaleY = value;
  }
  get scaleX() {
    return this.coreNode.scaleX;
  }
  set scaleX(value) {
    this.coreNode.scaleX = value;
  }
  get scaleY() {
    return this.coreNode.scaleY;
  }
  set scaleY(value) {
    this.coreNode.scaleY = value;
  }
  get mount() {
    return this.coreNode.mount;
  }
  set mount(value) {
    this.coreNode.mount = value;
  }
  get mountX() {
    return this.coreNode.mountX;
  }
  set mountX(value) {
    this.coreNode.mountX = value;
  }
  get mountY() {
    return this.coreNode.mountY;
  }
  set mountY(value) {
    this.coreNode.mountY = value;
  }
  get pivot() {
    return this.coreNode.pivot;
  }
  set pivot(value) {
    this.coreNode.pivot = value;
  }
  get pivotX() {
    return this.coreNode.pivotX;
  }
  set pivotX(value) {
    this.coreNode.pivotX = value;
  }
  get pivotY() {
    return this.coreNode.pivotY;
  }
  set pivotY(value) {
    this.coreNode.pivotY = value;
  }
  get rotation() {
    return this.coreNode.rotation;
  }
  set rotation(value) {
    this.coreNode.rotation = value;
  }
  get parent() {
    return this._parent;
  }
  set parent(newParent) {
    var _a2;
    const oldParent = this._parent;
    this._parent = newParent;
    this.coreNode.parent = (_a2 = newParent == null ? void 0 : newParent.coreNode) != null ? _a2 : null;
    if (oldParent) {
      const index = oldParent.children.indexOf(this);
      assertTruthy$1(index !== -1, "MainOnlyNode.parent: Node not found in old parent's children!");
      oldParent.children.splice(index, 1);
    }
    if (newParent) {
      newParent.children.push(this);
    }
  }
  get children() {
    return this._children;
  }
  get zIndex() {
    return this.coreNode.zIndex;
  }
  set zIndex(value) {
    this.coreNode.zIndex = value;
  }
  get zIndexLocked() {
    return this.coreNode.zIndexLocked;
  }
  set zIndexLocked(value) {
    this.coreNode.zIndexLocked = value;
  }
  get src() {
    return this._src;
  }
  set src(imageUrl) {
    if (this._src === imageUrl) {
      return;
    }
    this._src = imageUrl;
    if (!imageUrl) {
      this.texture = null;
      return;
    }
    this.texture = this.rendererMain.createTexture("ImageTexture", {
      src: imageUrl
    });
  }
  //#region Texture
  get texture() {
    return this._texture;
  }
  set texture(texture) {
    if (this._texture === texture) {
      return;
    }
    if (this._texture) {
      this.rendererMain.textureTracker.decrementTextureRefCount(this._texture);
    }
    if (texture) {
      this.rendererMain.textureTracker.incrementTextureRefCount(texture);
    }
    this._texture = texture;
    if (texture) {
      this.coreNode.loadTexture(texture.txType, texture.props, texture.options);
    } else {
      this.coreNode.unloadTexture();
    }
  }
  //#endregion Texture
  get shader() {
    return this._shader;
  }
  set shader(shader) {
    if (this._shader === shader) {
      return;
    }
    this._shader = shader;
    if (shader) {
      this.coreNode.loadShader(shader.shType, shader.props);
    }
  }
  destroy() {
    this.emit("beforeDestroy", {});
    this.parent = null;
    this.texture = null;
    this.emit("afterDestroy", {});
    this.removeAllListeners();
  }
  flush() {
  }
  animate(props, settings) {
    const animation = new CoreAnimation(this.coreNode, props, settings);
    const controller = new CoreAnimationController(this.stage.animationManager, animation);
    return controller;
  }
}
class Scene {
  constructor(root) {
    /**
     * Root node of the scene
     *
     * @type {Node}
     * @memberof Scene
     */
    __publicField(this, "root");
    this.root = root;
  }
  /**
   * Get all nodes of a specific type
   * @param type
   * @returns
   */
  getNodeByType(type) {
    return [];
  }
  /**
   * Find a node by id
   * @param id
   * @returns
   */
  getNodeById(id) {
    return null;
  }
  /**
   * Create a new node
   * @param parent
   * @returns
   */
  // public createNode(settings: Partial<INodeWritableProps> = {}): NodeTypes {
  //   return createNode(settings);
  // }
  /**
   * create a new RectangleNode
   * @param w
   * @param h
   * @param parent
   * @returns
   */
  // public rectangle(w: number, h: number, parent: NodeTypes | null = null) {
  //   // TODO: Fix this
  //   // return this.create(new RectangleNode(w, h), parent);
  // }
  /**
   * Create a new CircleNode
   * @param r
   * @param parent
   * @returns
   */
  // public circle(r: number, parent: NodeTypes | null = null) {
  //   // TODO: Fix this
  //   // return this.create(new CircleNode(r), parent);
  // }
  /**
   * Create a new TextNode
   * @param text
   * @param parent
   * @returns
   */
  // public text(text = '', parent: NodeTypes | null = null) {
  //   // TODO: Fix this
  //   // return this.create(new TextNode(text), parent);
  // }
  /**
   * Setup and attaching Node
   * @param node
   * @param parent
   * @returns
   */
  // private create(node: NodeTypes, parent: NodeTypes | null = null): NodeTypes {
  //   if (!parent) {
  //     parent = this.root;
  //   }
  //   node.parent = parent;
  //   return node;
  // }
  /**
   * Update the scene
   * @param delta
   */
  update(delta) {
    this.root.update(delta);
  }
}
const startLoop = (stage) => {
  const loop = () => {
    stage.drawFrame();
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
};
const getTimeStamp = () => {
  return performance ? performance.now() : Date.now();
};
class DefaultShader extends WebGlCoreShader {
  constructor(renderer) {
    super({
      renderer,
      attributes: ["a_position", "a_textureCoordinate", "a_color"],
      uniforms: [
        { name: "u_resolution", uniform: "uniform2fv" },
        { name: "u_pixelRatio", uniform: "uniform1f" },
        { name: "u_texture", uniform: "uniform2fv" }
      ]
    });
  }
  bindTextures(textures) {
    const { gl } = this;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[0].ctxTexture);
  }
}
__publicField(DefaultShader, "shaderSources", {
  vertex: `
      # ifdef GL_FRAGMENT_PRESICISON_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif

      attribute vec2 a_position;
      attribute vec2 a_textureCoordinate;
      attribute vec4 a_color;

      uniform vec2 u_resolution;
      uniform float u_pixelRatio;


      varying vec4 v_color;
      varying vec2 v_textureCoordinate;

      void main() {
        vec2 normalized = a_position * u_pixelRatio / u_resolution;
        vec2 zero_two = normalized * 2.0;
        vec2 clip_space = zero_two - 1.0;

        // pass to fragment
        v_color = a_color;
        v_textureCoordinate = a_textureCoordinate;

        // flip y
        gl_Position = vec4(clip_space * vec2(1.0, -1.0), 0, 1);
      }
    `,
  fragment: `
      # ifdef GL_FRAGMENT_PRESICISON_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif

      uniform vec2 u_resolution;
      uniform sampler2D u_texture;

      varying vec4 v_color;
      varying vec2 v_textureCoordinate;

      void main() {
          vec4 color = texture2D(u_texture, v_textureCoordinate);
          gl_FragColor = vec4(v_color) * texture2D(u_texture, v_textureCoordinate);
      }
    `
});
class DefaultShaderBatched extends WebGlCoreShader {
  constructor(renderer) {
    super({
      renderer,
      attributes: [
        "a_position",
        "a_textureCoordinate",
        "a_color",
        "a_textureIndex"
      ],
      uniforms: [
        { name: "u_resolution", uniform: "uniform2fv" },
        { name: "u_pixelRatio", uniform: "uniform1f" },
        { name: "u_textures[0]", uniform: "uniform1iv" }
      ]
    });
    __publicField(this, "supportsIndexedTextures", true);
  }
  bindTextures(texture) {
    const { renderer, gl } = this;
    if (texture.length > renderer.system.parameters.MAX_VERTEX_TEXTURE_IMAGE_UNITS) {
      throw new Error(`DefaultShaderBatched: Cannot bind more than ${renderer.system.parameters.MAX_VERTEX_TEXTURE_IMAGE_UNITS} textures`);
    }
    texture.forEach((t, i) => {
      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, t.ctxTexture);
    });
    const samplers = Array.from(Array(texture.length).keys());
    this.setUniform("u_textures[0]", samplers);
  }
}
__publicField(DefaultShaderBatched, "shaderSources", {
  vertex: `
      # ifdef GL_FRAGMENT_PRESICISON_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif

      attribute vec2 a_textureCoordinate;
      attribute vec2 a_position;
      attribute vec4 a_color;
      attribute float a_textureIndex;
      attribute float a_depth;

      uniform vec2 u_resolution;
      uniform float u_pixelRatio;

      varying vec4 v_color;
      varying vec2 v_textureCoordinate;
      varying float v_textureIndex;

      void main(){
        vec2 normalized = a_position * u_pixelRatio / u_resolution;
        vec2 zero_two = normalized * 2.0;
        vec2 clip_space = zero_two - 1.0;

        // pass to fragment
        v_color = a_color;
        v_textureCoordinate = a_textureCoordinate;
        v_textureIndex = a_textureIndex;

        // flip y
        gl_Position = vec4(clip_space * vec2(1.0, -1.0), 0, 1);
      }
    `,
  fragment: (textureUnits) => `
      #define txUnits ${textureUnits}
      # ifdef GL_FRAGMENT_PRESICISON_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif

      uniform vec2 u_resolution;
      uniform sampler2D u_image;
      uniform sampler2D u_textures[txUnits];

      varying vec4 v_color;
      varying vec2 v_textureCoordinate;
      varying float v_textureIndex;

      vec4 sampleFromTexture(sampler2D textures[${textureUnits}], int idx, vec2 uv) {
        ${Array.from(Array(textureUnits).keys()).map((idx) => `
          ${idx !== 0 ? "else " : ""}if (idx == ${idx}) {
            return texture2D(textures[${idx}], uv);
          }
        `).join("")}
        return texture2D(textures[0], uv);
      }

      void main(){
        gl_FragColor = vec4(v_color) * sampleFromTexture(u_textures, int(v_textureIndex), v_textureCoordinate);
      }
    `
});
class ShaderEffect {
  constructor(options) {
    __publicField(this, "priority", 1);
    __publicField(this, "name", "");
    __publicField(this, "ref");
    __publicField(this, "target");
    __publicField(this, "passParameters", "");
    __publicField(this, "declaredUniforms", "");
    __publicField(this, "uniformInfo", {});
    const { ref, target, props = {} } = options;
    this.ref = ref;
    this.target = target;
    const uniformInfo = {};
    const passParameters = [];
    let declaredUniforms = "";
    const uniforms = this.constructor.uniforms || {};
    for (const u in uniforms) {
      const unif = uniforms[u];
      const uniType = unif.type;
      const uniformName = `${ref}_${u}`;
      let define = "";
      if (unif.size) {
        define = `[${unif.size(props)}]`;
      }
      passParameters.push(uniformName);
      declaredUniforms += `uniform ${uniType} ${uniformName}${define};`;
      uniformInfo[u] = { name: uniformName, uniform: uniforms[u].method };
    }
    this.passParameters = passParameters.join(",");
    this.declaredUniforms = declaredUniforms;
    this.uniformInfo = uniformInfo;
  }
  static getEffectKey(props) {
    return "";
  }
  static getMethodParameters(uniforms, props) {
    const res = [];
    for (const u in uniforms) {
      const uni = uniforms[u];
      let define = "";
      if (uni.size) {
        define = `[${uni.size(props)}]`;
      }
      res.push(`${uni.type} ${u}${define}`);
    }
    return res.join(",");
  }
  static resolveDefaults(props) {
    return {};
  }
  static makeEffectKey(props) {
    return false;
  }
}
__publicField(ShaderEffect, "uniforms", {});
__publicField(ShaderEffect, "methods");
__publicField(ShaderEffect, "onShaderMask");
__publicField(ShaderEffect, "onColorize");
__publicField(ShaderEffect, "onEffectMask");
const _DynamicShader = class _DynamicShader extends WebGlCoreShader {
  constructor(renderer, props, effectContructors) {
    const shader = _DynamicShader.createShader(props, effectContructors);
    super({
      renderer,
      attributes: ["a_position", "a_textureCoordinate", "a_color"],
      uniforms: [
        { name: "u_resolution", uniform: "uniform2fv" },
        { name: "u_pixelRatio", uniform: "uniform1f" },
        { name: "u_texture", uniform: "uniform2fv" },
        { name: "u_dimensions", uniform: "uniform2fv" },
        { name: "u_alpha", uniform: "uniform1f" },
        ...shader.uniforms
      ],
      shaderSources: {
        vertex: shader.vertex,
        fragment: shader.fragment
      }
    });
    __publicField(this, "effects", []);
    this.effects = shader.effects;
  }
  bindTextures(textures) {
    const { gl } = this;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[0].ctxTexture);
  }
  bindProps(props) {
    var _a2;
    const effects = this.renderer.shManager.getRegisteredEffects();
    (_a2 = props.effects) == null ? void 0 : _a2.forEach((eff, index) => {
      var _a3;
      const effect = this.effects[index];
      const fxClass = effects[effect.name];
      const props2 = (_a3 = eff.props) != null ? _a3 : {};
      const uniInfo = effect.uniformInfo;
      Object.keys(props2).forEach((p) => {
        const fxProp = fxClass.uniforms[p];
        const propInfo = uniInfo[p];
        let value = fxProp.validator ? fxProp.validator(props2[p], props2) : props2[p];
        if (Array.isArray(value)) {
          value = new Float32Array(value);
        }
        this.setUniform(propInfo.name, value);
      });
    });
  }
  static createShader(props, effectContructors) {
    const effectNameCount = {};
    const methods = {};
    let declareUniforms = "";
    const uniforms = [];
    const uFx = [];
    const effects = props.effects.map((effect) => {
      const baseClass = effectContructors[effect.type];
      const key = baseClass.getEffectKey(effect.props || {});
      effectNameCount[key] = effectNameCount[key] ? ++effectNameCount[key] : 1;
      const nr = effectNameCount[key];
      if (nr === 1) {
        uFx.push({ key, type: effect.type, props: effect.props });
      }
      const fxClass = new baseClass({
        ref: `${key}${nr === 1 ? "" : nr}`,
        target: key,
        props: effect.props
      });
      declareUniforms += fxClass.declaredUniforms;
      uniforms.push(...Object.values(fxClass.uniformInfo));
      return fxClass;
    });
    let effectMethods = "";
    uFx == null ? void 0 : uFx.forEach((fx) => {
      var _a2;
      const fxClass = effectContructors[fx.type];
      const fxProps = fxClass.resolveDefaults((_a2 = fx.props) != null ? _a2 : {});
      const remap = [];
      for (const m in fxClass.methods) {
        let cm = m;
        const fxMethod = fxClass.methods[m];
        if (methods[m] && methods[m] !== fxMethod) {
          cm = _DynamicShader.resolveMethodDuplicate(m, fxMethod, methods);
        }
        methods[cm] = fxMethod.replace("function", cm);
        remap.push({ m, cm });
      }
      let onShaderMask = fxClass.onShaderMask instanceof Function ? fxClass.onShaderMask(fxProps) : fxClass.onShaderMask;
      let onColorize = fxClass.onColorize instanceof Function ? fxClass.onColorize(fxProps) : fxClass.onColorize;
      let onEffectMask = fxClass.onEffectMask instanceof Function ? fxClass.onEffectMask(fxProps) : fxClass.onEffectMask;
      remap.forEach((r) => {
        const { m, cm } = r;
        const reg = new RegExp(`\\$${m}`, "g");
        if (onShaderMask) {
          onShaderMask = onShaderMask.replace(reg, cm);
        }
        if (onColorize) {
          onColorize = onColorize.replace(reg, cm);
        }
        if (onEffectMask) {
          onEffectMask = onEffectMask.replace(reg, cm);
        }
      });
      const methodParameters = fxClass.getMethodParameters(fxClass.uniforms, fxProps);
      const pm = methodParameters.length > 0 ? `, ${methodParameters}` : "";
      if (onShaderMask) {
        effectMethods += `
        float fx_${fx.key}_onShaderMask(float shaderMask ${pm}) {
          ${onShaderMask}
        }
        `;
      }
      if (onColorize) {
        effectMethods += `
          vec4 fx_${fx.key}_onColorize(float shaderMask, vec4 maskColor, vec4 shaderColor${pm}) {
            ${onColorize}
          }
        `;
      }
      if (onEffectMask) {
        effectMethods += `
          vec4 fx_${fx.key}_onEffectMask(float shaderMask, vec4 maskColor, vec4 shaderColor${pm}) {
            ${onEffectMask}
          }
        `;
      }
    });
    let sharedMethods = "";
    for (const m in methods) {
      sharedMethods += methods[m];
    }
    let currentMask = `mix(shaderColor, maskColor, clamp(-(lng_DefaultMask), 0.0, 1.0))`;
    let drawEffects = `

    `;
    for (let i = 0; i < effects.length; i++) {
      const current = effects[i];
      const pm = current.passParameters.length > 0 ? `, ${current.passParameters}` : "";
      const currentClass = effectContructors[current.name];
      if (currentClass.onShaderMask) {
        drawEffects += `
        shaderMask = fx_${current.target}_onShaderMask(shaderMask ${pm});
        `;
      }
      if (currentClass.onColorize) {
        drawEffects += `
        maskColor = fx_${current.target}_onColorize(shaderMask, maskColor, shaderColor${pm});
        `;
      }
      if (currentClass.onEffectMask) {
        currentMask = `fx_${current.target}_onEffectMask(shaderMask, maskColor, shaderColor${pm})`;
      }
      const next = effects[i + 1];
      if (next === void 0 || effectContructors[next.name].onEffectMask) {
        drawEffects += `
          shaderColor = ${currentMask};
        `;
      }
    }
    return {
      effects,
      uniforms,
      fragment: _DynamicShader.fragment(declareUniforms, sharedMethods, effectMethods, drawEffects),
      vertex: _DynamicShader.vertex()
    };
  }
  static resolveMethodDuplicate(key, effectMethod, methodCollection, increment = 0) {
    const m = key + (increment > 0 ? increment : "");
    if (methodCollection[m] && methodCollection[m] !== effectMethod) {
      return this.resolveMethodDuplicate(key, effectMethod, methodCollection, ++increment);
    }
    return m;
  }
  static resolveDefaults(props, effectContructors) {
    var _a2;
    return {
      effects: ((_a2 = props.effects) != null ? _a2 : []).map((effect) => ({
        type: effect.type,
        props: effectContructors[effect.type].resolveDefaults(effect.props || {})
      })),
      $dimensions: {
        width: 0,
        height: 0
      },
      $alpha: 0
    };
  }
  static makeCacheKey(props, effectContructors) {
    var _a2;
    let fx = "";
    (_a2 = props.effects) == null ? void 0 : _a2.forEach((effect) => {
      const baseClass = effectContructors[effect.type];
      const key = baseClass.getEffectKey(effect.props || {});
      fx += `,${key}`;
    });
    return `DynamicShader${fx}`;
  }
};
__publicField(_DynamicShader, "z$__type__Props");
__publicField(_DynamicShader, "vertex", () => `
    # ifdef GL_FRAGMENT_PRESICISON_HIGH
    precision highp float;
    # else
    precision mediump float;
    # endif

    attribute vec2 a_textureCoordinate;
    attribute vec2 a_position;
    attribute vec4 a_color;
    attribute float a_textureIndex;

    uniform vec2 u_resolution;
    uniform float u_pixelRatio;

    varying vec4 v_color;
    varying vec2 v_textureCoordinate;
    varying float v_textureIndex;

    void main(){
      vec2 normalized = a_position * u_pixelRatio / u_resolution;
      vec2 zero_two = normalized * 2.0;
      vec2 clip_space = zero_two - 1.0;

      // pass to fragment
      v_color = a_color;
      v_textureCoordinate = a_textureCoordinate;
      v_textureIndex = a_textureIndex;

      // flip y
      gl_Position = vec4(clip_space * vec2(1.0, -1.0), 0, 1);
    }
  `);
__publicField(_DynamicShader, "fragment", (uniforms, methods, effectMethods, drawEffects) => `
    # ifdef GL_FRAGMENT_PRESICISON_HIGH
    precision highp float;
    # else
    precision mediump float;
    # endif

    #define PI 3.14159265359

    uniform vec2 u_resolution;
    uniform vec2 u_dimensions;
    uniform float u_alpha;
    uniform float u_radius;
    uniform sampler2D u_texture;
    uniform float u_pixelRatio;

    ${uniforms}

    varying vec4 v_color;
    varying vec2 v_textureCoordinate;

    ${methods}

    ${effectMethods}

    void main() {
      vec2 p = v_textureCoordinate.xy * u_dimensions - u_dimensions * 0.5;
      vec2 d = abs(p) - (u_dimensions) * 0.5;
      float lng_DefaultMask = min(max(d.x, d.y), 0.0) + length(max(d, 0.0));

      vec4 shaderColor = vec4(0.0);
      float shaderMask = lng_DefaultMask;

      vec4 maskColor = texture2D(u_texture, v_textureCoordinate) * v_color;

      shaderColor = mix(shaderColor, maskColor, clamp(-(lng_DefaultMask + 0.5), 0.0, 1.0));

      ${drawEffects}

      gl_FragColor = shaderColor * u_alpha;
    }
  `);
let DynamicShader = _DynamicShader;
class RoundedRectangle extends WebGlCoreShader {
  constructor(renderer) {
    super({
      renderer,
      attributes: ["a_position", "a_textureCoordinate", "a_color"],
      uniforms: [
        { name: "u_resolution", uniform: "uniform2fv" },
        { name: "u_pixelRatio", uniform: "uniform1f" },
        { name: "u_texture", uniform: "uniform2f" },
        { name: "u_dimensions", uniform: "uniform2fv" },
        { name: "u_radius", uniform: "uniform1f" }
      ]
    });
  }
  static resolveDefaults(props) {
    return {
      radius: props.radius || 10,
      $dimensions: {
        width: 0,
        height: 0
      }
    };
  }
  bindTextures(textures) {
    const { gl } = this;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[0].ctxTexture);
  }
  bindProps(props) {
    this.setUniform("u_radius", props.radius);
  }
  canBatchShaderProps(propsA, propsB) {
    return propsA.radius === propsB.radius && propsA.$dimensions.width === propsB.$dimensions.width && propsA.$dimensions.height === propsB.$dimensions.height;
  }
}
__publicField(RoundedRectangle, "z$__type__Props");
__publicField(RoundedRectangle, "shaderSources", {
  vertex: `
      # ifdef GL_FRAGMENT_PRESICISON_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif

      attribute vec2 a_position;
      attribute vec2 a_textureCoordinate;
      attribute vec4 a_color;
      attribute float a_textureIndex;
      attribute float a_depth;

      uniform vec2 u_resolution;
      uniform float u_pixelRatio;

      varying vec4 v_color;
      varying vec2 v_textureCoordinate;

      void main() {
        vec2 normalized = a_position * u_pixelRatio / u_resolution;
        vec2 zero_two = normalized * 2.0;
        vec2 clip_space = zero_two - 1.0;

        // pass to fragment
        v_color = a_color;
        v_textureCoordinate = a_textureCoordinate;

        // flip y
        gl_Position = vec4(clip_space * vec2(1.0, -1.0), 0, 1);
      }
    `,
  fragment: `
      # ifdef GL_FRAGMENT_PRESICISON_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif

      uniform vec2 u_resolution;
      uniform vec2 u_dimensions;
      uniform float u_radius;
      uniform sampler2D u_texture;

      varying vec4 v_color;
      varying vec2 v_textureCoordinate;

      float boxDist(vec2 p, vec2 size, float radius){
        size -= vec2(radius);
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - radius;
      }

      float fillMask(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }

      void main() {
        vec4 color = texture2D(u_texture, v_textureCoordinate) * v_color;
        vec2 halfDimensions = u_dimensions * 0.5;

        float d = boxDist(v_textureCoordinate.xy * u_dimensions - halfDimensions, halfDimensions + 0.5, u_radius);
        gl_FragColor = mix(vec4(0.0), color, fillMask(d));
      }
    `
});
const IDENTITY_MATRIX_3x3 = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
const _SdfShader = class _SdfShader extends WebGlCoreShader {
  constructor(renderer) {
    super({
      renderer,
      attributes: ["a_position", "a_textureCoordinate"],
      uniforms: [
        { name: "u_resolution", uniform: "uniform2fv" },
        { name: "u_transform", uniform: "uniformMatrix3fv" },
        { name: "u_scrollY", uniform: "uniform1f" },
        { name: "u_pixelRatio", uniform: "uniform1f" },
        { name: "u_texture", uniform: "uniform2f" },
        { name: "u_color", uniform: "uniform4fv" },
        { name: "u_size", uniform: "uniform1f" },
        { name: "u_distanceRange", uniform: "uniform1f" },
        { name: "u_debug", uniform: "uniform1i" }
      ]
    });
  }
  bindTextures(textures) {
    const { gl } = this;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[0].ctxTexture);
  }
  bindProps(props) {
    const resolvedProps = _SdfShader.resolveDefaults(props);
    for (const key in resolvedProps) {
      if (key === "transform") {
        this.setUniform("u_transform", false, resolvedProps[key]);
      } else if (key === "scrollY") {
        this.setUniform("u_scrollY", resolvedProps[key]);
      } else if (key === "color") {
        const components = getNormalizedRgbaComponents(resolvedProps.color);
        this.setUniform("u_color", components);
      } else if (key === "size") {
        this.setUniform("u_size", resolvedProps[key]);
      } else if (key === "distanceRange") {
        this.setUniform("u_distanceRange", resolvedProps[key]);
      } else if (key === "debug") {
        this.setUniform("u_debug", resolvedProps[key] ? 1 : 0);
      }
    }
  }
  static resolveDefaults(props = {}) {
    var _a2, _b, _c, _d, _e, _f;
    return {
      transform: (_a2 = props.transform) != null ? _a2 : IDENTITY_MATRIX_3x3,
      scrollY: (_b = props.scrollY) != null ? _b : 0,
      color: (_c = props.color) != null ? _c : 4294967295,
      size: (_d = props.size) != null ? _d : 16,
      distanceRange: (_e = props.distanceRange) != null ? _e : 1,
      debug: (_f = props.debug) != null ? _f : false
    };
  }
};
__publicField(_SdfShader, "shaderSources", {
  vertex: `
      // an attribute is an input (in) to a vertex shader.
      // It will receive data from a buffer
      attribute vec2 a_position;
      attribute vec2 a_textureCoordinate;

      uniform vec2 u_resolution;
      uniform mat3 u_transform;
      uniform float u_scrollY;
      uniform float u_pixelRatio;
      uniform float u_size;

      varying vec2 v_texcoord;

      void main() {
        vec2 scrolledPosition = a_position * u_size - vec2(0, u_scrollY);
        vec2 transformedPosition = (u_transform * vec3(scrolledPosition, 1)).xy;
        gl_Position = vec4((transformedPosition * u_pixelRatio / u_resolution * 2.0 - 1.0) * vec2(1, -1), 0, 1);
        v_texcoord = a_textureCoordinate;
      }
    `,
  fragment: `
      precision highp float;

      uniform vec4 u_color;
      uniform sampler2D u_texture;
      uniform float u_distanceRange;
      uniform float u_pixelRatio;
      uniform int u_debug;

      varying vec2 v_texcoord;

      float median(float r, float g, float b) {
          return max(min(r, g), min(max(r, g), b));
      }

      void main() {
          vec3 sample = texture2D(u_texture, v_texcoord).rgb;
          if (u_debug == 1) {
            gl_FragColor = vec4(sample.r, sample.g, sample.b, 1.0);
            return;
          }
          float scaledDistRange = u_distanceRange * u_pixelRatio;
          float sigDist = scaledDistRange * (median(sample.r, sample.g, sample.b) - 0.5);
          float opacity = clamp(sigDist + 0.5, 0.0, 1.0) * u_color.a;

          // Build the final color.
          // IMPORTANT: We must premultiply the color by the alpha value before returning it.
          gl_FragColor = vec4(u_color.r * opacity, u_color.g * opacity, u_color.b * opacity, opacity);
      }
    `
});
let SdfShader = _SdfShader;
class RadiusEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "radius");
  }
  static getEffectKey() {
    return `radius`;
  }
  static resolveDefaults(props) {
    var _a2;
    return {
      radius: (_a2 = props.radius) != null ? _a2 : 10
    };
  }
}
__publicField(RadiusEffect, "z$__type__Props");
__publicField(RadiusEffect, "uniforms", {
  radius: {
    value: 0,
    method: "uniform4fv",
    type: "vec4",
    validator: (value) => {
      let r = value;
      if (Array.isArray(r)) {
        if (r.length === 2) {
          r = [r[0], r[1], r[0], r[1]];
        } else if (r.length === 3) {
          r = [r[0], r[1], r[2], r[0]];
        } else if (r.length !== 4) {
          r = [r[0], r[0], r[0], r[0]];
        }
      } else if (typeof r === "number") {
        r = [r, r, r, r];
      }
      return r;
    }
  }
});
__publicField(RadiusEffect, "methods", {
  fillMask: `
      float function(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }
    `,
  boxDist: `
      float function(vec2 p, vec2 size, float radius) {
        size -= vec2(radius);
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - radius;
      }
    `
});
__publicField(RadiusEffect, "onShaderMask", `
  vec2 halfDimensions = u_dimensions * 0.5;
  float r = radius[0] * step(v_textureCoordinate.x, 0.5) * step(v_textureCoordinate.y, 0.5);
  r = r + radius[1] * step(0.5, v_textureCoordinate.x) * step(v_textureCoordinate.y, 0.5);
  r = r + radius[2] * step(0.5, v_textureCoordinate.x) * step(0.5, v_textureCoordinate.y);
  r = r + radius[3] * step(v_textureCoordinate.x, 0.5) * step(0.5, v_textureCoordinate.y);
  return $boxDist(v_textureCoordinate.xy * u_dimensions - halfDimensions, halfDimensions, r);
  `);
__publicField(RadiusEffect, "onEffectMask", `
  return mix(vec4(0.0), maskColor, $fillMask(shaderMask));
  `);
class BorderEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "border");
  }
  static getEffectKey() {
    return `border`;
  }
  static resolveDefaults(props) {
    var _a2, _b;
    return {
      width: (_a2 = props.width) != null ? _a2 : 10,
      color: (_b = props.color) != null ? _b : 4294967295
    };
  }
}
__publicField(BorderEffect, "z$__type__Props");
__publicField(BorderEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  color: {
    value: 4294967295,
    validator: (rgba) => getNormalizedRgbaComponents(rgba),
    method: "uniform4fv",
    type: "vec4"
  }
});
__publicField(BorderEffect, "onEffectMask", `
  float mask = clamp(shaderMask + width, 0.0, 1.0) - clamp(shaderMask, 0.0, 1.0);
  return mix(shaderColor, maskColor, mask);
  `);
__publicField(BorderEffect, "onColorize", `
    return color;
  `);
class LinearGradientEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "linearGradient");
  }
  static getEffectKey(props) {
    return `linearGradient${props.colors.length}`;
  }
  static resolveDefaults(props) {
    var _a2, _b;
    const colors = (_a2 = props.colors) != null ? _a2 : [4278190080, 4294967295];
    let stops = props.stops;
    if (!stops) {
      stops = [];
      const calc = colors.length - 1;
      for (let i = 0; i < colors.length; i++) {
        stops.push(i * (1 / calc));
      }
    }
    return {
      colors,
      stops,
      angle: (_b = props.angle) != null ? _b : 0
    };
  }
}
__publicField(LinearGradientEffect, "z$__type__Props");
__publicField(LinearGradientEffect, "uniforms", {
  angle: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  colors: {
    value: 4294967295,
    validator: (rgbas) => {
      const cols = rgbas.map((rgbas2) => getNormalizedRgbaComponents(rgbas2));
      return cols.reduce((acc, val) => acc.concat(val), []);
    },
    size: (props) => props.colors.length,
    method: "uniform4fv",
    type: "vec4"
  },
  stops: {
    value: [],
    validator: (value, props) => {
      var _a2;
      const colors = (_a2 = props.colors) != null ? _a2 : [];
      let stops = value;
      const tmp = value;
      if (stops.length === 0 || stops && stops.length !== colors.length) {
        for (let i = 0; i < colors.length; i++) {
          if (stops[i]) {
            tmp[i] = stops[i];
            if (stops[i - 1] === void 0 && tmp[i - 2] !== void 0) {
              tmp[i - 1] = tmp[i - 2] + (stops[i] - tmp[i - 2]) / 2;
            }
          } else {
            tmp[i] = i * (1 / (colors.length - 1));
          }
        }
        stops = tmp;
      }
      return tmp;
    },
    size: (props) => props.colors.length,
    method: "uniform1fv",
    type: "float"
  }
});
__publicField(LinearGradientEffect, "methods", {
  fromLinear: `
      vec4 function(vec4 linearRGB) {
        vec4 higher = vec4(1.055)*pow(linearRGB, vec4(1.0/2.4)) - vec4(0.055);
        vec4 lower = linearRGB * vec4(12.92);
        return mix(higher, lower, 1.0);
      }
    `,
  toLinear: `
      vec4 function(vec4 sRGB) {
        vec4 higher = pow((sRGB + vec4(0.055))/vec4(1.055), vec4(2.4));
        vec4 lower = sRGB/vec4(12.92);
        return mix(higher, lower, 1.0);
      }
    `,
  calcPoint: `
      vec2 function(float d, float angle) {
        return d * vec2(cos(angle), sin(angle)) + (u_dimensions * 0.5);
      }
    `
});
__publicField(LinearGradientEffect, "ColorLoop", (amount) => {
  let loop = "";
  for (let i = 2; i < amount; i++) {
    loop += `colorOut = mix(colorOut, colors[${i}], clamp((dist - stops[${i - 1}]) / (stops[${i}] - stops[${i - 1}]), 0.0, 1.0));`;
  }
  return loop;
});
__publicField(LinearGradientEffect, "onColorize", (props) => {
  const colors = props.colors.length || 1;
  return `
      float a = angle - (PI / 180.0 * 90.0);
      float lineDist = abs(u_dimensions.x * cos(a)) + abs(u_dimensions.y * sin(a));
      vec2 f = $calcPoint(lineDist * 0.5, a);
      vec2 t = $calcPoint(lineDist * 0.5, a + PI);
      vec2 gradVec = t - f;
      float dist = dot(v_textureCoordinate.xy * u_dimensions - f, gradVec) / dot(gradVec, gradVec);

      float stopCalc = (dist - stops[0]) / (stops[1] - stops[0]);
      vec4 colorOut = $fromLinear(mix($toLinear(colors[0]), $toLinear(colors[1]), stopCalc));
      for(int i = 1; i < ${colors}-1; i++) {
        stopCalc = (dist - stops[i]) / (stops[i + 1] - stops[i]);
        colorOut = mix(colorOut, colors[i + 1], clamp(stopCalc, 0.0, 1.0));
      }
      return mix(maskColor, colorOut, clamp(colorOut.a, 0.0, 1.0));
    `;
});
class GrayscaleEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "grayscale");
  }
  static getEffectKey() {
    return `grayscale`;
  }
}
__publicField(GrayscaleEffect, "onColorize", `
    vec3 color = pow(maskColor.rgb, vec3(2.0));
    float gray = dot(color, vec3(0.2126, 0.7152, 0.0722));
    float gammaGray = sqrt(gray);
    return vec4(gammaGray, gammaGray, gammaGray, 1.0);
  `);
class BorderRightEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "borderRight");
  }
  static getEffectKey() {
    return `borderRight`;
  }
  static resolveDefaults(props) {
    var _a2, _b;
    return {
      width: (_a2 = props.width) != null ? _a2 : 10,
      color: (_b = props.color) != null ? _b : 4294967295
    };
  }
}
__publicField(BorderRightEffect, "z$__type__Props");
__publicField(BorderRightEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  color: {
    value: 4294967295,
    validator: (rgba) => getNormalizedRgbaComponents(rgba),
    method: "uniform4fv",
    type: "vec4"
  }
});
__publicField(BorderRightEffect, "methods", {
  fillMask: `
      float function(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }
    `,
  rectDist: `
      float function(vec2 p, vec2 size) {
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
      }
    `
});
__publicField(BorderRightEffect, "onEffectMask", `
  vec2 pos = vec2(u_dimensions.x - width * 0.5, 0.0);
  float mask = $rectDist(v_textureCoordinate.xy * u_dimensions - pos, vec2(width*0.5, u_dimensions.y));
  return mix(shaderColor, maskColor, $fillMask(mask));
  `);
__publicField(BorderRightEffect, "onColorize", `
    return color;
  `);
class BorderTopEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "borderTop");
  }
  static getEffectKey() {
    return `borderTop`;
  }
  static resolveDefaults(props) {
    var _a2, _b;
    return {
      width: (_a2 = props.width) != null ? _a2 : 10,
      color: (_b = props.color) != null ? _b : 4294967295
    };
  }
}
__publicField(BorderTopEffect, "z$__type__Props");
__publicField(BorderTopEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  color: {
    value: 4294967295,
    validator: (rgba) => getNormalizedRgbaComponents(rgba),
    method: "uniform4fv",
    type: "vec4"
  }
});
__publicField(BorderTopEffect, "methods", {
  fillMask: `
      float function(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }
    `,
  rectDist: `
      float function(vec2 p, vec2 size) {
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
      }
    `
});
__publicField(BorderTopEffect, "onEffectMask", `
  vec2 pos = vec2(0.0, width * 0.5);
  float mask = $rectDist(v_textureCoordinate.xy * u_dimensions - pos, vec2(u_dimensions.x, width*0.5));
  return mix(shaderColor, maskColor, $fillMask(mask));
  `);
__publicField(BorderTopEffect, "onColorize", `
    return color;
  `);
class BorderBottomEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "borderBottom");
  }
  static getEffectKey() {
    return `borderBottom`;
  }
  static resolveDefaults(props) {
    var _a2, _b;
    return {
      width: (_a2 = props.width) != null ? _a2 : 10,
      color: (_b = props.color) != null ? _b : 4294967295
    };
  }
}
__publicField(BorderBottomEffect, "z$__type__Props");
__publicField(BorderBottomEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  color: {
    value: 4294967295,
    validator: (rgba) => getNormalizedRgbaComponents(rgba),
    method: "uniform4fv",
    type: "vec4"
  }
});
__publicField(BorderBottomEffect, "methods", {
  fillMask: `
      float function(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }
    `,
  rectDist: `
      float function(vec2 p, vec2 size) {
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
      }
    `
});
__publicField(BorderBottomEffect, "onEffectMask", `
  vec2 pos = vec2(0.0, u_dimensions.y - width * 0.5);
  float mask = $rectDist(v_textureCoordinate.xy * u_dimensions - pos, vec2(u_dimensions.x, width*0.5));
  return mix(shaderColor, maskColor, $fillMask(mask));
  `);
__publicField(BorderBottomEffect, "onColorize", `
    return color;
  `);
class BorderLeftEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "borderLeft");
  }
  static getEffectKey() {
    return `borderLeft`;
  }
  static resolveDefaults(props) {
    var _a2, _b;
    return {
      width: (_a2 = props.width) != null ? _a2 : 10,
      color: (_b = props.color) != null ? _b : 4294967295
    };
  }
}
__publicField(BorderLeftEffect, "z$__type__Props");
__publicField(BorderLeftEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  color: {
    value: 4294967295,
    validator: (rgba) => getNormalizedRgbaComponents(rgba),
    method: "uniform4fv",
    type: "vec4"
  }
});
__publicField(BorderLeftEffect, "methods", {
  fillMask: `
      float function(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }
    `,
  rectDist: `
      float function(vec2 p, vec2 size) {
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
      }
    `
});
__publicField(BorderLeftEffect, "onEffectMask", `
  vec2 pos = vec2(width * 0.5, 0.0);
  float mask = $rectDist(v_textureCoordinate.xy * u_dimensions - pos, vec2(width*0.5, u_dimensions.y));
  return mix(shaderColor, maskColor, $fillMask(mask));
  `);
__publicField(BorderLeftEffect, "onColorize", `
    return color;
  `);
class GlitchEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "glitch");
  }
  static getEffectKey(props) {
    return `glitch`;
  }
  static resolveDefaults(props) {
    var _a2, _b, _c, _d, _e;
    return {
      amplitude: (_a2 = props.amplitude) != null ? _a2 : 0.2,
      narrowness: (_b = props.narrowness) != null ? _b : 4,
      blockiness: (_c = props.blockiness) != null ? _c : 2,
      minimizer: (_d = props.minimizer) != null ? _d : 8,
      time: (_e = props.time) != null ? _e : Date.now()
    };
  }
}
__publicField(GlitchEffect, "z$__type__Props");
__publicField(GlitchEffect, "uniforms", {
  amplitude: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  narrowness: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  blockiness: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  minimizer: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  time: {
    value: 0,
    method: "uniform1f",
    validator: (value) => {
      return (Date.now() - value) % 1e3;
    },
    type: "float"
  }
});
__publicField(GlitchEffect, "methods", {
  rand: `
      float function(vec2 p, float time) {
        float t = floor(time * 20.) / 10.;
        return fract(sin(dot(p, vec2(t * 12.9898, t * 78.233))) * 43758.5453);
      }
    `,
  noise: `
      float function(vec2 uv, float blockiness, float time) {
        vec2 lv = fract(uv);
        vec2 id = floor(uv);

        float n1 = rand(id, time);
        float n2 = rand(id+vec2(1,0), time);
        float n3 = rand(id+vec2(0,1), time);
        float n4 = rand(id+vec2(1,1), time);
        vec2 u = smoothstep(0.0, 1.0 + blockiness, lv);
        return mix(mix(n1, n2, u.x), mix(n3, n4, u.x), u.y);
      }
    `,
  fbm: `
      float function(vec2 uv, int count, float blockiness, float complexity, float time) {
        float val = 0.0;
        float amp = 0.5;
        const int MAX_ITERATIONS = 10;

        for(int i = 0; i < MAX_ITERATIONS; i++) {
          if(i >= count) {break;}
          val += amp * noise(uv, blockiness, time);
          amp *= 0.5;
          uv *= complexity;
        }
        return val;
      }
    `
});
__publicField(GlitchEffect, "onColorize", `
    vec2 uv = v_textureCoordinate.xy;
    float aspect = u_dimensions.x / u_dimensions.y;
    vec2 a = vec2(uv.x * aspect , uv.y);
    vec2 uv2 = vec2(a.x / u_dimensions.x, exp(a.y));

    float shift = amplitude * pow($fbm(uv2, 4, blockiness, narrowness, time), minimizer);
    float colR = texture2D(u_texture, vec2(uv.x + shift, uv.y)).r * (1. - shift);
    float colG = texture2D(u_texture, vec2(uv.x - shift, uv.y)).g * (1. - shift);
    float colB = texture2D(u_texture, vec2(uv.x - shift, uv.y)).b * (1. - shift);

    vec3 f = vec3(colR, colG, colB);
    return vec4(f, texture2D(u_texture, vec2(uv.x - shift, uv.y)).a);
  `);
class FadeOutEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "fadeOut");
  }
  static getEffectKey() {
    return `fadeOut`;
  }
  static resolveDefaults(props) {
    var _a2;
    return {
      fade: (_a2 = props.fade) != null ? _a2 : 10
    };
  }
}
__publicField(FadeOutEffect, "z$__type__Props");
__publicField(FadeOutEffect, "uniforms", {
  fade: {
    value: 0,
    method: "uniform4fv",
    type: "vec4",
    validator: (value) => {
      let r = value;
      if (Array.isArray(r)) {
        if (r.length === 2) {
          r = [r[0], r[1], r[0], r[1]];
        } else if (r.length === 3) {
          r = [r[0], r[1], r[2], r[0]];
        } else if (r.length !== 4) {
          r = [r[0], r[0], r[0], r[0]];
        }
      } else if (typeof r === "number") {
        r = [r, r, r, r];
      }
      return r;
    }
  }
});
__publicField(FadeOutEffect, "onColorize", `
  vec2 point = v_textureCoordinate.xy * u_dimensions.xy;
  vec2 pos1;
  vec2 pos2;
  vec2 d;
  float c;
  vec4 result = maskColor;


  if(fade[0] > 0.0) {
    pos1 = vec2(point.x, point.y);
    pos2 = vec2(point.x, point.y + fade[0]);
    d = pos2 - pos1;
    c = dot(pos1, d) / dot(d, d);
    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));
  }

  if(fade[1] > 0.0) {
    pos1 = vec2(point.x - u_dimensions.x - fade[1], v_textureCoordinate.y);
    pos2 = vec2(point.x - u_dimensions.x, v_textureCoordinate.y);
    d = pos1 - pos2;
    c = dot(pos2, d) / dot(d, d);
    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));
  }

  if(fade[2] > 0.0) {
    pos1 = vec2(v_textureCoordinate.x, point.y - u_dimensions.y - fade[2]);
    pos2 = vec2(v_textureCoordinate.x, point.y - u_dimensions.y);
    d = pos1 - pos2;
    c = dot(pos2, d) / dot(d, d);
    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));
  }

  if(fade[3] > 0.0) {
    pos1 = vec2(point.x, point.y);
    pos2 = vec2(point.x + fade[3], point.y);
    d = pos2 - pos1;
    c = dot(pos1, d) / dot(d, d);
    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));
  }

  return result;
  `);
class RadialGradientEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "radialGradient");
  }
  static getEffectKey(props) {
    return `radialGradient${props.colors.length}`;
  }
  static resolveDefaults(props) {
    var _a2, _b, _c, _d, _e;
    const colors = (_a2 = props.colors) != null ? _a2 : [4278190080, 4294967295];
    let stops = props.stops;
    if (!stops) {
      stops = [];
      const calc = colors.length - 1;
      for (let i = 0; i < colors.length; i++) {
        stops.push(i * (1 / calc));
      }
    }
    return {
      colors,
      stops,
      width: (_b = props.width) != null ? _b : 0,
      height: (_d = (_c = props.height) != null ? _c : props.width) != null ? _d : 0,
      pivot: (_e = props.pivot) != null ? _e : [0.5, 0.5]
    };
  }
}
__publicField(RadialGradientEffect, "z$__type__Props");
__publicField(RadialGradientEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  height: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  pivot: {
    value: [0.5, 0.5],
    method: "uniform2fv",
    type: "vec2"
  },
  colors: {
    value: 4294967295,
    validator: (rgbas) => {
      const cols = rgbas.map((rgbas2) => getNormalizedRgbaComponents(rgbas2));
      return cols.reduce((acc, val) => acc.concat(val), []);
    },
    size: (props) => props.colors.length,
    method: "uniform4fv",
    type: "vec4"
  },
  stops: {
    value: [],
    validator: (value, props) => {
      var _a2;
      const colors = (_a2 = props.colors) != null ? _a2 : [];
      let stops = value;
      const tmp = value;
      if (stops.length === 0 || stops && stops.length !== colors.length) {
        for (let i = 0; i < colors.length; i++) {
          if (stops[i]) {
            tmp[i] = stops[i];
            if (stops[i - 1] === void 0 && tmp[i - 2] !== void 0) {
              tmp[i - 1] = tmp[i - 2] + (stops[i] - tmp[i - 2]) / 2;
            }
          } else {
            tmp[i] = i * (1 / (colors.length - 1));
          }
        }
        stops = tmp;
      }
      return tmp;
    },
    size: (props) => props.colors.length,
    method: "uniform1fv",
    type: "float"
  }
});
__publicField(RadialGradientEffect, "onColorize", (props) => {
  const colors = props.colors.length || 1;
  return `
      vec2 point = v_textureCoordinate.xy * u_dimensions;
      vec2 projection = vec2(pivot.x * u_dimensions.x, pivot.y * u_dimensions.y);

      float dist = length((point - projection) / vec2(width, height));

      float stopCalc = (dist - stops[0]) / (stops[1] - stops[0]);
      vec4 colorOut = mix(colors[0], colors[1], stopCalc);
      for(int i = 1; i < ${colors}-1; i++) {
        stopCalc = (dist - stops[i]) / (stops[i + 1] - stops[i]);
        colorOut = mix(colorOut, colors[i + 1], clamp(stopCalc, 0.0, 1.0));
      }
      return mix(maskColor, colorOut, clamp(colorOut.a, 0.0, 1.0));
    `;
});
class RadialProgressEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "radialProgress");
  }
  static getEffectKey() {
    return `radialProgress`;
  }
  static resolveDefaults(props) {
    var _a2, _b, _c, _d, _e, _f, _g;
    return {
      width: (_a2 = props.width) != null ? _a2 : 10,
      progress: (_b = props.progress) != null ? _b : 0.5,
      offset: (_c = props.offset) != null ? _c : 0,
      range: (_d = props.range) != null ? _d : Math.PI * 2,
      rounded: (_e = props.rounded) != null ? _e : false,
      radius: (_f = props.radius) != null ? _f : 1,
      color: (_g = props.color) != null ? _g : 4294967295
    };
  }
}
__publicField(RadialProgressEffect, "z$__type__Props");
__publicField(RadialProgressEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  progress: {
    value: 0.5,
    method: "uniform1f",
    type: "float"
  },
  offset: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  range: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  rounded: {
    value: 0,
    method: "uniform1f",
    type: "float",
    validator: (value) => {
      return value ? 1 : 0;
    }
  },
  radius: {
    value: 1,
    method: "uniform1f",
    type: "float"
  },
  color: {
    value: 4294967295,
    validator: (rgba) => getNormalizedRgbaComponents(rgba),
    method: "uniform4fv",
    type: "vec4"
  }
});
__publicField(RadialProgressEffect, "methods", {
  rotateUV: `
    vec2 function(vec2 uv, float d) {
      float s = sin(d);
      float c = cos(d);
      mat2 rotMatrix = mat2(c, -s, s, c);
      return uv * rotMatrix;
    }
    `,
  drawDot: `
    float function(vec2 uv, vec2 p, float r) {
      uv += p;
      float circle = length(uv) - r;
      return clamp(-circle, 0.0, 1.0);
    }
    `
});
__publicField(RadialProgressEffect, "onEffectMask", `
    float outerRadius = radius * u_dimensions.y * 0.5;

    float endAngle = range * progress - 0.0005;

    vec2 uv = v_textureCoordinate.xy * u_dimensions.xy - u_dimensions * 0.5;

    uv = $rotateUV(uv, -(offset));
    float linewidth = width * u_pixelRatio;
    float circle = length(uv) - (outerRadius - linewidth) ;
    circle = abs(circle) - linewidth;
    circle = clamp(-circle, 0.0, 1.0);

    float angle = (atan(uv.x, -uv.y) / 3.14159265359 * 0.5);
    float p = endAngle / (PI * 2.);

    circle *= step(fract(angle), fract(p));

    circle = rounded < 1. ? circle : max(circle, $drawDot(uv, vec2(0, outerRadius - linewidth), linewidth));
    circle = rounded < 1. ? circle : max(circle, $drawDot($rotateUV(uv, -(endAngle)), vec2(0, outerRadius - linewidth), linewidth));

    return mix(shaderColor, maskColor, circle);
  `);
__publicField(RadialProgressEffect, "onColorize", `
    return color;
  `);
class CoreShaderManager {
  constructor() {
    __publicField(this, "shCache", /* @__PURE__ */ new Map());
    __publicField(this, "shConstructors", {});
    __publicField(this, "attachedShader", null);
    __publicField(this, "effectConstructors", {});
    __publicField(this, "renderer");
    this.registerShaderType("DefaultShader", DefaultShader);
    this.registerShaderType("DefaultShaderBatched", DefaultShaderBatched);
    this.registerShaderType("RoundedRectangle", RoundedRectangle);
    this.registerShaderType("DynamicShader", DynamicShader);
    this.registerShaderType("SdfShader", SdfShader);
    this.registerEffectType("border", BorderEffect);
    this.registerEffectType("borderBottom", BorderBottomEffect);
    this.registerEffectType("borderLeft", BorderLeftEffect);
    this.registerEffectType("borderRight", BorderRightEffect);
    this.registerEffectType("borderTop", BorderTopEffect);
    this.registerEffectType("fadeOut", FadeOutEffect);
    this.registerEffectType("linearGradient", LinearGradientEffect);
    this.registerEffectType("radialGradient", RadialGradientEffect);
    this.registerEffectType("grayscale", GrayscaleEffect);
    this.registerEffectType("glitch", GlitchEffect);
    this.registerEffectType("radius", RadiusEffect);
    this.registerEffectType("radialProgress", RadialProgressEffect);
  }
  registerShaderType(shType, shClass) {
    this.shConstructors[shType] = shClass;
  }
  registerEffectType(effectType, effectClass) {
    this.effectConstructors[effectType] = effectClass;
  }
  getRegisteredEffects() {
    return this.effectConstructors;
  }
  getRegisteredShaders() {
    return this.shConstructors;
  }
  loadShader(shType, props) {
    if (!this.renderer) {
      throw new Error(`Renderer is not been defined`);
    }
    const ShaderClass = this.shConstructors[shType];
    if (!ShaderClass) {
      throw new Error(`Shader type "${shType}" is not registered`);
    }
    if (shType === "DynamicShader") {
      return this.loadDynamicShader(props);
    }
    const resolvedProps = ShaderClass.resolveDefaults(props);
    const cacheKey = ShaderClass.makeCacheKey(resolvedProps) || ShaderClass.name;
    if (cacheKey && this.shCache.has(cacheKey)) {
      return {
        shader: this.shCache.get(cacheKey),
        props: resolvedProps
      };
    }
    const shader = new ShaderClass(this.renderer, props);
    if (cacheKey) {
      this.shCache.set(cacheKey, shader);
    }
    return {
      shader,
      props: resolvedProps
    };
  }
  loadDynamicShader(props) {
    if (!this.renderer) {
      throw new Error(`Renderer is not been defined`);
    }
    const resolvedProps = DynamicShader.resolveDefaults(props, this.effectConstructors);
    const cacheKey = DynamicShader.makeCacheKey(resolvedProps, this.effectConstructors);
    if (cacheKey && this.shCache.has(cacheKey)) {
      return {
        shader: this.shCache.get(cacheKey),
        props: resolvedProps
      };
    }
    const shader = new DynamicShader(this.renderer, props, this.effectConstructors);
    if (cacheKey) {
      this.shCache.set(cacheKey, shader);
    }
    return {
      shader,
      props: resolvedProps
    };
  }
  useShader(shader) {
    if (this.attachedShader === shader) {
      return;
    }
    if (this.attachedShader) {
      this.attachedShader.detach();
    }
    shader.attach();
    this.attachedShader = shader;
  }
}
class AnimationManager {
  constructor() {
    __publicField(this, "activeAnimations", /* @__PURE__ */ new Set());
  }
  registerAnimation(animation) {
    this.activeAnimations.add(animation);
  }
  unregisterAnimation(animation) {
    this.activeAnimations.delete(animation);
  }
  update(dt) {
    this.activeAnimations.forEach((animation) => {
      animation.update(dt);
    });
  }
}
const _ImageTexture = class _ImageTexture extends Texture {
  constructor(txManager, props) {
    super(txManager);
    __publicField(this, "props");
    this.props = _ImageTexture.resolveDefaults(props);
  }
  async getTextureData() {
    const { src, premultiplyAlpha } = this.props;
    if (!src) {
      return {
        data: null
      };
    }
    if (src instanceof ImageData) {
      return {
        data: src,
        premultiplyAlpha
      };
    }
    const response = await fetch(src);
    const blob = await response.blob();
    return {
      data: await createImageBitmap(blob, {
        premultiplyAlpha: premultiplyAlpha ? "premultiply" : "none",
        colorSpaceConversion: "none",
        imageOrientation: "none"
      })
    };
  }
  static makeCacheKey(props) {
    const resolvedProps = _ImageTexture.resolveDefaults(props);
    if (resolvedProps.src instanceof ImageData) {
      return false;
    }
    return `ImageTexture,${resolvedProps.src},${resolvedProps.premultiplyAlpha}`;
  }
  static resolveDefaults(props) {
    var _a2, _b;
    return {
      src: (_a2 = props.src) != null ? _a2 : "",
      premultiplyAlpha: (_b = props.premultiplyAlpha) != null ? _b : true
    };
  }
};
__publicField(_ImageTexture, "z$__type__Props");
let ImageTexture = _ImageTexture;
const _NoiseTexture = class _NoiseTexture extends Texture {
  constructor(txManager, props) {
    super(txManager);
    __publicField(this, "props");
    this.props = _NoiseTexture.resolveDefaults(props);
  }
  async getTextureData() {
    const { width, height } = this.props;
    const size = width * height * 4;
    const pixelData8 = new Uint8ClampedArray(size);
    for (let i = 0; i < size; i += 4) {
      const v = Math.floor(Math.random() * 256);
      pixelData8[i] = v;
      pixelData8[i + 1] = v;
      pixelData8[i + 2] = v;
      pixelData8[i + 3] = 255;
    }
    return {
      data: new ImageData(pixelData8, width, height)
    };
  }
  static makeCacheKey(props) {
    const resolvedProps = _NoiseTexture.resolveDefaults(props);
    return `NoiseTexture,${resolvedProps.width},${resolvedProps.height},${resolvedProps.cacheId}`;
  }
  static resolveDefaults(props) {
    var _a2, _b, _c;
    return {
      width: (_a2 = props.width) != null ? _a2 : 128,
      height: (_b = props.height) != null ? _b : 128,
      cacheId: (_c = props.cacheId) != null ? _c : 0
    };
  }
};
__publicField(_NoiseTexture, "z$__type__Props");
let NoiseTexture = _NoiseTexture;
class CoreTextureManager {
  constructor() {
    /**
     * Amount of used memory defined in pixels
     */
    __publicField(this, "usedMemory", 0);
    __publicField(this, "txConstructors", {});
    __publicField(this, "textureKeyCache", /* @__PURE__ */ new Map());
    __publicField(this, "textureIdCache", /* @__PURE__ */ new Map());
    __publicField(this, "ctxTextureCache", /* @__PURE__ */ new WeakMap());
    __publicField(this, "textureRefCountMap", /* @__PURE__ */ new WeakMap());
    /**
     * Renderer that this texture manager is associated with
     *
     * @remarks
     * This MUST be set before the texture manager is used. Otherwise errors
     * will occur when using the texture manager.
     */
    __publicField(this, "renderer");
    this.registerTextureType("ImageTexture", ImageTexture);
    this.registerTextureType("ColorTexture", ColorTexture);
    this.registerTextureType("NoiseTexture", NoiseTexture);
    this.registerTextureType("SubTexture", SubTexture);
  }
  registerTextureType(textureType, textureClass) {
    this.txConstructors[textureType] = textureClass;
  }
  loadTexture(textureType, props, options = null) {
    var _a2;
    const TextureClass = this.txConstructors[textureType];
    if (!TextureClass) {
      throw new Error(`Texture type "${textureType}" is not registered`);
    }
    let texture;
    if ((options == null ? void 0 : options.id) !== void 0 && this.textureIdCache.has(options.id)) {
      texture = this.textureIdCache.get(options.id);
    }
    if (!texture) {
      const descId = options == null ? void 0 : options.id;
      const cacheKey = (_a2 = options == null ? void 0 : options.cacheKey) != null ? _a2 : TextureClass.makeCacheKey(props);
      if (cacheKey && this.textureKeyCache.has(cacheKey)) {
        texture = this.textureKeyCache.get(cacheKey);
      } else {
        texture = new TextureClass(this, props);
      }
      if (descId) {
        this.addTextureIdToCache(descId, cacheKey, texture);
      }
    }
    if (options == null ? void 0 : options.preload) {
      const ctxTx = this.getCtxTexture(texture);
      ctxTx.load();
    }
    return texture;
  }
  /**
   * Add a `Texture` to the texture cache by its texture desc ID and cache key
   *
   * @remarks
   * This is used internally by the `CoreTextureManager` to cache textures
   * when they are created.
   *
   * It handles updating the texture ID cache, texture key cache, and texture
   * reference count map.
   *
   * @param textureDescId
   * @param cacheKey
   * @param texture
   */
  addTextureIdToCache(textureDescId, cacheKey, texture) {
    const { textureIdCache, textureRefCountMap } = this;
    textureIdCache.set(textureDescId, texture);
    if (textureRefCountMap.has(texture)) {
      textureRefCountMap.get(texture).count++;
    } else {
      textureRefCountMap.set(texture, { cacheKey, count: 1 });
      if (cacheKey) {
        this.textureKeyCache.set(cacheKey, texture);
      }
    }
  }
  /**
   * Remove a `Texture` from the texture cache by its texture desc ID
   *
   * @remarks
   * This is called externally by when we know (at least reasonably well) that
   * the `TextureRef` in the Main API space has been is no longer used. This
   * allows us to remove the `Texture` from the Usage Cache so that it can be
   * garbage collected as well.
   *
   * @param textureDescId
   */
  removeTextureIdFromCache(textureDescId) {
    const { textureIdCache, textureRefCountMap } = this;
    const texture = textureIdCache.get(textureDescId);
    if (!texture) {
      return;
    }
    textureIdCache.delete(textureDescId);
    if (textureRefCountMap.has(texture)) {
      const refCountObj = textureRefCountMap.get(texture);
      assertTruthy$1(refCountObj);
      refCountObj.count--;
      if (refCountObj.count === 0) {
        textureRefCountMap.delete(texture);
        if (refCountObj.cacheKey) {
          this.textureKeyCache.delete(refCountObj.cacheKey);
        }
      }
    }
  }
  /**
   * Get an object containing debug information about the texture manager.
   *
   * @returns
   */
  getDebugInfo() {
    return {
      keyCacheSize: this.textureKeyCache.size,
      idCacheSize: this.textureIdCache.size
    };
  }
  /**
   * Get a CoreContextTexture for the given Texture source.
   *
   * @remarks
   * If the texture source already has an allocated CoreContextTexture, it will be
   * returned from the cache. Otherwise, a new CoreContextTexture will be created
   * and cached.
   *
   * ContextTextures are stored in a WeakMap, so they will be garbage collected
   * when the Texture source is no longer referenced.
   *
   * @param textureSource
   * @returns
   */
  getCtxTexture(textureSource) {
    if (this.ctxTextureCache.has(textureSource)) {
      return this.ctxTextureCache.get(textureSource);
    }
    const texture = this.renderer.createCtxTexture(textureSource);
    this.ctxTextureCache.set(textureSource, texture);
    return texture;
  }
}
class TrFontManager {
  constructor(textRenderers) {
    __publicField(this, "textRenderers");
    this.textRenderers = textRenderers;
  }
  addFontFace(font) {
    for (const trId in this.textRenderers) {
      const tr = this.textRenderers[trId];
      if (tr && tr.isFontFaceSupported(font)) {
        tr.addFontFace(font);
      }
    }
  }
  /**
   * Utility method to resolve a single font face from a list of prioritized family maps based on
   * a set of font properties.
   *
   * @remarks
   * These are to be used by a text renderer to resolve a font face if needed.
   *
   * @param familyMapsByPriority
   * @param props
   * @returns
   */
  static resolveFontFace(familyMapsByPriority, props) {
    const closeFaces = [];
    const exactMatch = familyMapsByPriority.reduce((prev, fontFamiles) => {
      if (prev) {
        return prev;
      }
      const fontFaces = fontFamiles[props.fontFamily];
      if (!fontFaces) {
        return void 0;
      }
      const fontFacesCopy = new Set(fontFaces);
      for (const fontFace of fontFacesCopy) {
        if (fontFace.descriptors.stretch !== props.fontStretch || fontFace.descriptors.style !== props.fontStyle || fontFace.descriptors.weight !== props.fontWeight) {
          fontFacesCopy.delete(fontFace);
        }
      }
      return fontFacesCopy.values().next().value;
    }, void 0);
    return exactMatch || closeFaces[0];
  }
}
const trPropSetterDefaults = {
  x: (state, value) => {
    state.props.x = value;
  },
  y: (state, value) => {
    state.props.y = value;
  },
  width: (state, value) => {
    state.props.width = value;
  },
  height: (state, value) => {
    state.props.height = value;
  },
  color: (state, value) => {
    state.props.color = value;
  },
  zIndex: (state, value) => {
    state.props.zIndex = value;
  },
  fontFamily: (state, value) => {
    state.props.fontFamily = value;
  },
  fontWeight: (state, value) => {
    state.props.fontWeight = value;
  },
  fontStyle: (state, value) => {
    state.props.fontStyle = value;
  },
  fontStretch: (state, value) => {
    state.props.fontStretch = value;
  },
  fontSize: (state, value) => {
    state.props.fontSize = value;
  },
  text: (state, value) => {
    state.props.text = value;
  },
  textAlign: (state, value) => {
    state.props.textAlign = value;
  },
  contain: (state, value) => {
    state.props.contain = value;
  },
  offsetY: (state, value) => {
    state.props.offsetY = value;
  },
  scrollable: (state, value) => {
    state.props.scrollable = value;
  },
  scrollY: (state, value) => {
    state.props.scrollY = value;
  },
  letterSpacing: (state, value) => {
    state.props.letterSpacing = value;
  },
  lineHeight: (state, value) => {
    state.props.lineHeight = value;
  },
  debug: (state, value) => {
    state.props.debug = value;
  }
};
class TextRenderer {
  constructor(stage) {
    __publicField(this, "stage");
    __publicField(this, "set");
    this.stage = stage;
    const propSetters = {
      ...trPropSetterDefaults,
      ...this.getPropertySetters()
    };
    this.set = Object.freeze(Object.fromEntries(Object.entries(propSetters).map(([key, setter]) => {
      return [
        key,
        (state, value) => {
          if (state.props[key] !== value) {
            setter(state, value);
          }
        }
      ];
    })));
  }
  setStatus(state, status, error) {
    if (state.status === status) {
      return;
    }
    state.status = status;
    state.emitter.emit(status, error);
  }
  /**
   * Schedule a state update via queueMicrotask
   *
   * @remarks
   * This method is used to schedule a state update via queueMicrotask. This
   * method should be called whenever a state update is needed, and it will
   * ensure that the state is only updated once per microtask.
   * @param state
   * @returns
   */
  scheduleUpdateState(state) {
    if (state.updateScheduled) {
      return;
    }
    state.updateScheduled = true;
    queueMicrotask(() => {
      state.updateScheduled = false;
      this.updateState(state);
    });
  }
}
const FLOATS_PER_GLYPH = 24;
function getStartConditions(fontSize, offsetY, fontSizeRatio, sdfLineHeight, renderWindow, lineCache, textH) {
  let startLineIndex = 0;
  if (renderWindow) {
    startLineIndex = Math.min(Math.max(Math.floor(renderWindow.y1 / fontSize), 0), lineCache.length);
  }
  const startX = 0;
  const startY = offsetY / fontSizeRatio + startLineIndex * sdfLineHeight;
  if (textH && startY >= textH / fontSizeRatio) {
    return;
  }
  return {
    x: startX,
    y: startY,
    lineIndex: startLineIndex
  };
}
class PeekableIterator {
  constructor(iterator, indexBase = 0) {
    __publicField(this, "iterator");
    __publicField(this, "peekBuffer", []);
    __publicField(this, "_lastIndex");
    this.iterator = iterator;
    this.iterator = iterator;
    this._lastIndex = indexBase - 1;
    this.peekBuffer = [];
  }
  next() {
    const nextResult = this.peekBuffer.length > 0 ? (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.peekBuffer.pop()
    ) : this.iterator.next();
    if (nextResult.done) {
      this._lastIndex = -1;
    } else {
      this._lastIndex++;
    }
    return nextResult;
  }
  peek() {
    if (this.peekBuffer.length > 0) {
      return this.peekBuffer[0];
    }
    const result = this.iterator.next();
    this.peekBuffer.push(result);
    return result;
  }
  get lastIndex() {
    return this._lastIndex;
  }
}
function* getUnicodeCodepoints(text, start = 0) {
  let i = start;
  while (i < text.length) {
    const codePoint = text.codePointAt(i);
    if (codePoint === void 0) {
      throw new Error("Invalid Unicode code point");
    }
    yield codePoint;
    i += codePoint <= 65535 ? 1 : 2;
  }
}
function measureText(text, shaperProps, shaper) {
  const glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(text, 0), 0));
  let width = 0;
  for (const glyph of glyphs) {
    if (glyph.mapped) {
      width += glyph.xAdvance;
    }
  }
  return width;
}
function layoutText(curLineIndex, startX, startY, text, textAlign, width, height, fontSize, letterSpacing, vertexBuffer, contain, lineCache, renderWindow, trFontFace, forceFullLayoutCalc, scrollable) {
  assertTruthy$1(trFontFace, "Font face must be loaded");
  assertTruthy$1(trFontFace.loaded, "Font face must be loaded");
  assertTruthy$1(trFontFace.data, "Font face must be loaded");
  assertTruthy$1(trFontFace.shaper, "Font face must be loaded");
  const vertexLineHeight = trFontFace.data.info.size;
  const fontSizeRatio = fontSize / vertexLineHeight;
  const vertexW = width / fontSizeRatio;
  const vertexLSpacing = letterSpacing / fontSizeRatio;
  const startingLineCacheEntry = lineCache[curLineIndex];
  const startingCodepointIndex = (startingLineCacheEntry == null ? void 0 : startingLineCacheEntry.codepointIndex) || 0;
  const startingMaxX = (startingLineCacheEntry == null ? void 0 : startingLineCacheEntry.maxX) || 0;
  const startingMaxY = (startingLineCacheEntry == null ? void 0 : startingLineCacheEntry.maxY) || 0;
  let maxX = startingMaxX;
  let maxY = startingMaxY;
  let curX = startX;
  let curY = startY;
  let bufferOffset = 0;
  const lastWord = {
    codepointIndex: -1,
    bufferOffset: -1,
    xStart: -1
  };
  const shaper = trFontFace.shaper;
  const shaperProps = {
    letterSpacing: vertexLSpacing
  };
  let glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(text, startingCodepointIndex), startingCodepointIndex));
  let glyphResult;
  let curLineBufferStart = -1;
  const bufferLineInfos = [];
  const truncateSeq = "...";
  const vertexTruncateHeight = height / fontSizeRatio;
  const truncateSeqVertexWidth = measureText(truncateSeq, shaperProps, shaper);
  let moreLines = true;
  while (moreLines) {
    const nextLineWillFit = contain !== "both" || scrollable || curY + vertexLineHeight + vertexLineHeight <= vertexTruncateHeight;
    const lineVertexW = nextLineWillFit ? vertexW : vertexW - truncateSeqVertexWidth;
    let xStartLastWordBoundary = 0;
    while ((glyphResult = glyphs.next()) && !glyphResult.done) {
      const glyph = glyphResult.value;
      if (curLineIndex === lineCache.length) {
        lineCache.push({
          codepointIndex: glyph.cluster,
          maxY,
          maxX
        });
      } else if (curLineIndex > lineCache.length) {
        throw new Error("Unexpected lineCache length");
      }
      if (glyph.codepoint === 32 || glyph.codepoint === 10) {
        if (lastWord.codepointIndex !== -1) {
          lastWord.codepointIndex = -1;
          xStartLastWordBoundary = curX;
        }
      } else if (lastWord.codepointIndex === -1) {
        lastWord.codepointIndex = glyph.cluster;
        lastWord.bufferOffset = bufferOffset;
        lastWord.xStart = xStartLastWordBoundary;
      }
      if (glyph.mapped) {
        const charEndX = curX + glyph.xOffset + glyph.width;
        if (
          // We are containing the text
          contain !== "none" && // The current glyph reaches outside the contained width
          charEndX >= lineVertexW && // There is a last word that we can break to the next line
          lastWord.codepointIndex !== -1 && // We have advanced at least one character since the last word started
          lastWord.codepointIndex < glyph.cluster && // Prevents infinite loop when a single word is longer than the width
          lastWord.xStart > 0
        ) {
          if (nextLineWillFit) {
            glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(text, lastWord.codepointIndex), lastWord.codepointIndex));
            bufferOffset = lastWord.bufferOffset;
            break;
          } else {
            glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(truncateSeq, 0), 0));
            curX = lastWord.xStart;
            bufferOffset = lastWord.bufferOffset;
          }
        } else {
          const quadX = curX + glyph.xOffset;
          const quadY = curY + glyph.yOffset;
          const lineIsBelowWindowTop = renderWindow ? curY + vertexLineHeight >= renderWindow.y1 / fontSizeRatio : true;
          const lineIsAboveWindowBottom = renderWindow ? curY <= renderWindow.y2 / fontSizeRatio : true;
          if (lineIsBelowWindowTop && lineIsAboveWindowBottom) {
            if (curLineBufferStart === -1) {
              curLineBufferStart = bufferOffset;
            }
            const atlasEntry = trFontFace.getAtlasEntry(glyph.glyphId);
            const u = atlasEntry.x / trFontFace.data.common.scaleW;
            const v = atlasEntry.y / trFontFace.data.common.scaleH;
            const uvWidth = atlasEntry.width / trFontFace.data.common.scaleW;
            const uvHeight = atlasEntry.height / trFontFace.data.common.scaleH;
            vertexBuffer[bufferOffset++] = quadX;
            vertexBuffer[bufferOffset++] = quadY;
            vertexBuffer[bufferOffset++] = u;
            vertexBuffer[bufferOffset++] = v;
            vertexBuffer[bufferOffset++] = quadX + glyph.width;
            vertexBuffer[bufferOffset++] = quadY;
            vertexBuffer[bufferOffset++] = u + uvWidth;
            vertexBuffer[bufferOffset++] = v;
            vertexBuffer[bufferOffset++] = quadX;
            vertexBuffer[bufferOffset++] = quadY + glyph.height;
            vertexBuffer[bufferOffset++] = u;
            vertexBuffer[bufferOffset++] = v + uvHeight;
            vertexBuffer[bufferOffset++] = quadX + glyph.width;
            vertexBuffer[bufferOffset++] = quadY + glyph.height;
            vertexBuffer[bufferOffset++] = u + uvWidth;
            vertexBuffer[bufferOffset++] = v + uvHeight;
          }
          maxY = Math.max(maxY, quadY + glyph.height);
          curX += glyph.xAdvance;
          maxX = Math.max(maxX, curX);
        }
      } else {
        if (glyph.codepoint === 10) {
          break;
        }
      }
    }
    if (curLineBufferStart !== -1) {
      bufferLineInfos.push({
        bufferStart: curLineBufferStart,
        bufferEnd: bufferOffset
      });
      curLineBufferStart = -1;
    }
    curX = 0;
    curY += vertexLineHeight;
    curLineIndex++;
    lastWord.codepointIndex = -1;
    xStartLastWordBoundary = 0;
    if (!forceFullLayoutCalc && contain === "both" && renderWindow && curY > renderWindow.y2 / fontSizeRatio) {
      moreLines = false;
    } else if (glyphResult && glyphResult.done) {
      moreLines = false;
    } else if (contain === "both" && !scrollable && !nextLineWillFit) {
      moreLines = false;
    }
  }
  if (textAlign === "center") {
    const vertexTextW = contain === "none" ? maxX : vertexW;
    for (let i = 0; i < bufferLineInfos.length; i++) {
      const line = bufferLineInfos[i];
      const lineWidth = (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        vertexBuffer[line.bufferEnd - 4] - vertexBuffer[line.bufferStart]
      );
      const xOffset = (vertexTextW - lineWidth) / 2;
      for (let j = line.bufferStart; j < line.bufferEnd; j += 4) {
        vertexBuffer[j] += xOffset;
      }
    }
  } else if (textAlign === "right") {
    const vertexTextW = contain === "none" ? maxX : vertexW;
    for (let i = 0; i < bufferLineInfos.length; i++) {
      const line = bufferLineInfos[i];
      const lineWidth = line.bufferEnd === line.bufferStart ? 0 : (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        vertexBuffer[line.bufferEnd - 4] - vertexBuffer[line.bufferStart]
      );
      const xOffset = vertexTextW - lineWidth;
      for (let j = line.bufferStart; j < line.bufferEnd; j += 4) {
        vertexBuffer[j] += xOffset;
      }
    }
  }
  assertTruthy$1(glyphResult);
  return {
    bufferNumFloats: bufferOffset,
    bufferNumQuads: bufferOffset / 16,
    layoutNumCharacters: glyphResult.done ? text.length - startingCodepointIndex : glyphResult.value.cluster - startingCodepointIndex + 1,
    fullyProcessed: !!glyphResult.done,
    maxX,
    maxY
  };
}
function makeRenderWindow(x, y, scrollY, lineHeight, numExtraLines, visibleWindow) {
  const bufferMargin = lineHeight * numExtraLines;
  const x1 = visibleWindow.x1 - x;
  const y1 = visibleWindow.y1 - y;
  return isBoundPositive(visibleWindow) ? {
    x1,
    y1: y1 + scrollY - bufferMargin,
    x2: x1 + (visibleWindow.x2 - visibleWindow.x1),
    y2: y1 + scrollY + (visibleWindow.y2 - visibleWindow.y1) + bufferMargin
  } : {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  };
}
const tmpElementBounds$1 = createBound(0, 0, 0, 0);
class SdfTextRenderer extends TextRenderer {
  constructor(stage) {
    super(stage);
    /**
     * Map of font family names to a set of font faces.
     */
    __publicField(this, "ssdfFontFamilies", {});
    __publicField(this, "msdfFontFamilies", {});
    __publicField(this, "sdfShader");
    __publicField(this, "rendererBounds");
    this.sdfShader = this.stage.shManager.loadShader("SdfShader").shader;
    this.rendererBounds = {
      x1: 0,
      y1: 0,
      x2: this.stage.options.appWidth,
      y2: this.stage.options.appHeight
    };
  }
  //#region Overrides
  getPropertySetters() {
    return {
      fontFamily: (state, value) => {
        state.props.fontFamily = value;
        state.trFontFace = void 0;
        this.invalidateLayoutCache(state);
      },
      fontWeight: (state, value) => {
        state.props.fontWeight = value;
        state.trFontFace = void 0;
        this.invalidateLayoutCache(state);
      },
      fontStyle: (state, value) => {
        state.props.fontStyle = value;
        state.trFontFace = void 0;
        this.invalidateLayoutCache(state);
      },
      fontStretch: (state, value) => {
        state.props.fontStretch = value;
        state.trFontFace = void 0;
        this.invalidateLayoutCache(state);
      },
      fontSize: (state, value) => {
        state.props.fontSize = value;
        this.invalidateLayoutCache(state);
      },
      text: (state, value) => {
        state.props.text = value;
        this.invalidateLayoutCache(state);
      },
      textAlign: (state, value) => {
        state.props.textAlign = value;
        this.invalidateLayoutCache(state);
      },
      color: (state, value) => {
        state.props.color = value;
      },
      x: (state, value) => {
        state.props.x = value;
        this.invalidateVisibleWindowCache(state);
      },
      y: (state, value) => {
        state.props.y = value;
        this.invalidateVisibleWindowCache(state);
      },
      contain: (state, value) => {
        state.props.contain = value;
        this.invalidateLayoutCache(state);
      },
      width: (state, value) => {
        state.props.width = value;
        this.invalidateLayoutCache(state);
      },
      height: (state, value) => {
        state.props.height = value;
        this.invalidateLayoutCache(state);
      },
      offsetY: (state, value) => {
        state.props.offsetY = value;
        this.invalidateLayoutCache(state);
      },
      scrollable: (state, value) => {
        state.props.scrollable = value;
        this.invalidateLayoutCache(state);
      },
      scrollY: (state, value) => {
        state.props.scrollY = value;
        this.scheduleUpdateState(state);
      },
      letterSpacing: (state, value) => {
        state.props.letterSpacing = value;
        this.invalidateLayoutCache(state);
      },
      debug: (state, value) => {
        state.props.debug = value;
      }
    };
  }
  canRenderFont(props) {
    const { fontFamily } = props;
    return fontFamily in this.ssdfFontFamilies || fontFamily in this.msdfFontFamilies || fontFamily === "$$SDF_FAILURE_TEST$$";
  }
  isFontFaceSupported(fontFace) {
    return fontFace instanceof SdfTrFontFace;
  }
  addFontFace(fontFace) {
    assertTruthy$1(fontFace instanceof SdfTrFontFace);
    const familyName = fontFace.fontFamily;
    const fontFamiles = fontFace.type === "ssdf" ? this.ssdfFontFamilies : fontFace.type === "msdf" ? this.msdfFontFamilies : void 0;
    if (!fontFamiles) {
      console.warn(`Invalid font face type: ${fontFace.type}`);
      return;
    }
    let faceSet = fontFamiles[familyName];
    if (!faceSet) {
      faceSet = /* @__PURE__ */ new Set();
      fontFamiles[familyName] = faceSet;
    }
    faceSet.add(fontFace);
  }
  createState(props) {
    return {
      props,
      status: "initialState",
      updateScheduled: false,
      emitter: new EventEmitter(),
      lineCache: [],
      forceFullLayoutCalc: false,
      renderWindow: void 0,
      visibleWindow: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        valid: false
      },
      bufferNumFloats: 0,
      bufferNumQuads: 0,
      vertexBuffer: void 0,
      webGlBuffers: null,
      bufferUploaded: false,
      textH: void 0,
      textW: void 0,
      distanceRange: 0,
      trFontFace: void 0,
      debugData: {
        updateCount: 0,
        layoutCount: 0,
        lastLayoutNumCharacters: 0,
        layoutSum: 0,
        drawSum: 0,
        drawCount: 0,
        bufferSize: 0
      }
    };
  }
  updateState(state) {
    let { trFontFace } = state;
    const { textH, lineCache, debugData, forceFullLayoutCalc } = state;
    debugData.updateCount++;
    if (state.status === "initialState") {
      this.setStatus(state, "loading");
    }
    if (!trFontFace) {
      trFontFace = this.resolveFontFace(state.props);
      state.trFontFace = trFontFace;
      if (!trFontFace) {
        const msg = `SdfTextRenderer: Could not resolve font face for family: '${state.props.fontFamily}'`;
        console.error(msg);
        this.setStatus(state, "failed", new Error(msg));
        return;
      }
    }
    if (!trFontFace.loaded) {
      trFontFace.once("loaded", () => {
        this.scheduleUpdateState(state);
      });
      return;
    }
    assertTruthy$1(trFontFace.data, "Font face data should be loaded");
    const { text, fontSize, x, y, contain, width, height, scrollable } = state.props;
    const scrollY = contain === "both" && scrollable ? state.props.scrollY : 0;
    let { renderWindow } = state;
    const sdfLineHeight = trFontFace.data.info.size;
    const fontSizeRatio = fontSize / sdfLineHeight;
    state.distanceRange = fontSizeRatio * trFontFace.data.distanceField.distanceRange;
    const neededLength = text.length * FLOATS_PER_GLYPH;
    let vertexBuffer = state.vertexBuffer;
    if (!vertexBuffer || vertexBuffer.length < neededLength) {
      vertexBuffer = new Float32Array(neededLength * 2);
    }
    const visibleWindow = state.visibleWindow;
    if (!visibleWindow.valid) {
      const elementBounds = createBound(x, y, contain !== "none" ? x + width : Infinity, contain === "both" ? y + height : Infinity, tmpElementBounds$1);
      intersectBound(this.rendererBounds, elementBounds, state.visibleWindow);
      visibleWindow.valid = true;
    }
    if (!forceFullLayoutCalc && renderWindow) {
      if (x + renderWindow.x1 <= visibleWindow.x1 && x + renderWindow.x2 >= visibleWindow.x2 && y - scrollY + renderWindow.y1 <= visibleWindow.y1 && y - scrollY + renderWindow.y2 >= visibleWindow.y2) {
        this.setStatus(state, "loaded");
        return;
      }
      renderWindow = state.renderWindow = void 0;
      this.setStatus(state, "loading");
    }
    const { offsetY, textAlign } = state.props;
    if (!renderWindow) {
      const visibleWindowHeight = visibleWindow.y2 - visibleWindow.y1;
      const maxLinesPerCanvasPage = Math.ceil(visibleWindowHeight / sdfLineHeight);
      renderWindow = makeRenderWindow(x, y, scrollY, sdfLineHeight, maxLinesPerCanvasPage, visibleWindow);
    }
    const start = getStartConditions(fontSize, offsetY, fontSizeRatio, sdfLineHeight, renderWindow, lineCache, textH);
    if (!start) {
      this.setStatus(state, "loaded");
      return;
    }
    const { letterSpacing } = state.props;
    const out2 = layoutText(start.lineIndex, start.x, start.y, text, textAlign, width, height, fontSize, letterSpacing, vertexBuffer, contain, lineCache, renderWindow, trFontFace, forceFullLayoutCalc, scrollable);
    state.bufferUploaded = false;
    state.bufferNumFloats = out2.bufferNumFloats;
    state.bufferNumQuads = out2.bufferNumQuads;
    state.vertexBuffer = vertexBuffer;
    state.renderWindow = renderWindow;
    debugData.lastLayoutNumCharacters = out2.layoutNumCharacters;
    debugData.bufferSize = vertexBuffer.byteLength;
    if (out2.fullyProcessed) {
      state.textW = out2.maxX * fontSizeRatio;
      state.textH = out2.maxY * fontSizeRatio;
    }
    this.setStatus(state, "loaded");
  }
  renderQuads(state, transform, clippingRect, alpha) {
    var _a2, _b, _c;
    if (!state.vertexBuffer) {
      return;
    }
    performance.now();
    const { renderer } = this.stage;
    this.stage.options;
    const { fontSize, color, contain, scrollable, zIndex, debug } = state.props;
    const scrollY = contain === "both" && scrollable ? state.props.scrollY : 0;
    const { textW = 0, textH = 0, distanceRange, vertexBuffer, bufferUploaded, trFontFace } = state;
    let { webGlBuffers } = state;
    if (!webGlBuffers) {
      const gl = renderer.gl;
      const stride = 4 * Float32Array.BYTES_PER_ELEMENT;
      const webGlBuffer = gl.createBuffer();
      assertTruthy$1(webGlBuffer);
      state.webGlBuffers = new BufferCollection([
        {
          buffer: webGlBuffer,
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
            }
          }
        }
      ]);
      state.bufferUploaded = false;
      assertTruthy$1(state.webGlBuffers);
      webGlBuffers = state.webGlBuffers;
    }
    if (!bufferUploaded) {
      const gl = renderer.gl;
      const buffer = (_a2 = webGlBuffers == null ? void 0 : webGlBuffers.getBuffer("a_textureCoordinate")) != null ? _a2 : null;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertexBuffer, gl.STATIC_DRAW);
      state.bufferUploaded = true;
    }
    assertTruthy$1(trFontFace);
    const renderOp = new WebGlCoreRenderOp(renderer.gl, renderer.options, webGlBuffers, this.sdfShader, {
      transform: transform.data,
      // IMPORTANT: The SDF Shader expects the color NOT to be premultiplied
      // for the best blending results. Which is why we use `mergeColorAlpha`
      // instead of `mergeColorAlphaPremultiplied` here.
      color: mergeColorAlpha(color, alpha),
      size: fontSize / (((_b = trFontFace.data) == null ? void 0 : _b.info.size) || 0),
      scrollY,
      distanceRange,
      debug: debug.sdfShaderDebug
    }, alpha, clippingRect, { height: textH, width: textW }, 0, zIndex);
    const texture = (_c = state.trFontFace) == null ? void 0 : _c.texture;
    assertTruthy$1(texture);
    const ctxTexture = this.stage.txManager.getCtxTexture(texture);
    renderOp.addTexture(ctxTexture);
    renderOp.length = state.bufferNumFloats;
    renderOp.numQuads = state.bufferNumQuads;
    renderer.addRenderable(renderOp);
  }
  //#endregion Overrides
  resolveFontFace(props) {
    return TrFontManager.resolveFontFace([this.msdfFontFamilies, this.ssdfFontFamilies], props);
  }
  /**
   * Invalidate the visible window stored in the state. This will cause a new
   * visible window to be calculated on the next update.
   *
   * @param state
   */
  invalidateVisibleWindowCache(state) {
    state.visibleWindow.valid = false;
    this.scheduleUpdateState(state);
  }
  /**
   * Invalidate the layout cache stored in the state. This will cause the text
   * to be re-layed out on the next update.
   *
   * @remarks
   * This also invalidates the visible window cache.
   *
   * @param state
   */
  invalidateLayoutCache(state) {
    state.visibleWindow.valid = false;
    state.renderWindow = void 0;
    state.textH = void 0;
    state.textW = void 0;
    state.lineCache = [];
    this.setStatus(state, "loading");
    this.scheduleUpdateState(state);
  }
}
const MAX_TEXTURE_DIMENSION = 2048;
class LightningTextTextureRenderer {
  constructor(canvas, context) {
    __publicField(this, "_canvas");
    __publicField(this, "_context");
    __publicField(this, "_settings");
    __publicField(this, "renderInfo");
    this._canvas = canvas;
    this._context = context;
    this._settings = this.mergeDefaults({});
  }
  set settings(v) {
    this._settings = this.mergeDefaults(v);
  }
  get settings() {
    return this._settings;
  }
  getPrecision() {
    return this._settings.precision;
  }
  setFontProperties() {
    this._context.font = this._getFontSetting();
    this._context.textBaseline = this._settings.textBaseline;
  }
  _getFontSetting() {
    const ff = [this._settings.fontFace];
    const ffs = [];
    for (let i = 0, n = ff.length; i < n; i++) {
      if (ff[i] === "serif" || ff[i] === "sans-serif") {
        ffs.push(ff[i]);
      } else {
        ffs.push(`"${ff[i]}"`);
      }
    }
    return `${this._settings.fontStyle} ${this._settings.fontSize * this.getPrecision()}px ${ffs.join(",")}`;
  }
  _load() {
    if (document.fonts) {
      const fontSetting = this._getFontSetting();
      try {
        if (!document.fonts.check(fontSetting, this._settings.text)) {
          return document.fonts.load(fontSetting, this._settings.text).catch((err) => {
            console.warn("[Lightning] Font load error", err, fontSetting);
          }).then(() => {
            if (!document.fonts.check(fontSetting, this._settings.text)) {
              console.warn("[Lightning] Font not found", fontSetting);
            }
          });
        }
      } catch (e) {
        console.warn("[Lightning] Can't check font loading for " + fontSetting);
      }
    }
  }
  calculateRenderInfo() {
    const renderInfo = {};
    const precision = this.getPrecision();
    const paddingLeft = this._settings.paddingLeft * precision;
    const paddingRight = this._settings.paddingRight * precision;
    const fontSize = this._settings.fontSize * precision;
    let offsetY = this._settings.offsetY === null ? null : this._settings.offsetY * precision;
    let lineHeight = (this._settings.lineHeight || fontSize) * precision;
    const w = this._settings.w * precision;
    const h = this._settings.h * precision;
    let wordWrapWidth = this._settings.wordWrapWidth * precision;
    const cutSx = this._settings.cutSx * precision;
    const cutEx = this._settings.cutEx * precision;
    const cutSy = this._settings.cutSy * precision;
    const cutEy = this._settings.cutEy * precision;
    const letterSpacing = (this._settings.letterSpacing || 0) * precision;
    const textIndent = this._settings.textIndent * precision;
    this.setFontProperties();
    let width = w || 2048 / this.getPrecision();
    let innerWidth = width - paddingLeft;
    if (innerWidth < 10) {
      width += 10 - innerWidth;
      innerWidth = 10;
    }
    if (!wordWrapWidth) {
      wordWrapWidth = innerWidth;
    }
    if (this._settings.textOverflow && !this._settings.wordWrap) {
      let suffix;
      switch (this._settings.textOverflow) {
        case "clip":
          suffix = "";
          break;
        case "ellipsis":
          suffix = this._settings.maxLinesSuffix;
          break;
        default:
          suffix = this._settings.textOverflow;
      }
      this._settings.text = this.wrapWord(this._settings.text, wordWrapWidth - textIndent, suffix);
    }
    let linesInfo;
    if (this._settings.wordWrap) {
      linesInfo = this.wrapText(this._settings.text, wordWrapWidth, letterSpacing, textIndent);
    } else {
      linesInfo = { l: this._settings.text.split(/(?:\r\n|\r|\n)/), n: [] };
      const n = linesInfo.l.length;
      for (let i = 0; i < n - 1; i++) {
        linesInfo.n.push(i);
      }
    }
    let lines = linesInfo.l;
    if (this._settings.maxLines && lines.length > this._settings.maxLines) {
      const usedLines = lines.slice(0, this._settings.maxLines);
      let otherLines = null;
      if (this._settings.maxLinesSuffix) {
        const w2 = this._settings.maxLinesSuffix ? this.measureText(this._settings.maxLinesSuffix) : 0;
        const al = this.wrapText(usedLines[usedLines.length - 1], wordWrapWidth - w2, letterSpacing, textIndent);
        usedLines[usedLines.length - 1] = `${al.l[0]}${this._settings.maxLinesSuffix}`;
        otherLines = [al.l.length > 1 ? al.l[1] : ""];
      } else {
        otherLines = [""];
      }
      let i;
      const n = lines.length;
      let j = 0;
      const m = linesInfo.n.length;
      for (i = this._settings.maxLines; i < n; i++) {
        otherLines[j] += `${otherLines[j] ? " " : ""}${lines[i]}`;
        if (i + 1 < m && linesInfo.n[i + 1]) {
          j++;
        }
      }
      renderInfo.remainingText = otherLines.join("\n");
      renderInfo.moreTextLines = true;
      lines = usedLines;
    } else {
      renderInfo.moreTextLines = false;
      renderInfo.remainingText = "";
    }
    let maxLineWidth = 0;
    const lineWidths = [];
    for (let i = 0; i < lines.length; i++) {
      const lineWidth = this.measureText(lines[i], letterSpacing) + (i === 0 ? textIndent : 0);
      lineWidths.push(lineWidth);
      maxLineWidth = Math.max(maxLineWidth, lineWidth);
    }
    renderInfo.lineWidths = lineWidths;
    if (!w) {
      width = maxLineWidth + paddingLeft + paddingRight;
      innerWidth = maxLineWidth;
    }
    lineHeight = lineHeight || fontSize;
    let height;
    if (h) {
      height = h;
    } else {
      const baselineOffset = this._settings.textBaseline != "bottom" ? 0.5 * fontSize : 0;
      height = lineHeight * (lines.length - 1) + baselineOffset + Math.max(lineHeight, fontSize) + (offsetY || 0);
    }
    if (offsetY === null) {
      offsetY = fontSize;
    }
    renderInfo.w = width;
    renderInfo.h = height;
    renderInfo.lines = lines;
    renderInfo.precision = precision;
    if (!width) {
      width = 1;
    }
    if (!height) {
      height = 1;
    }
    if (cutSx || cutEx) {
      width = Math.min(width, cutEx - cutSx);
    }
    if (cutSy || cutEy) {
      height = Math.min(height, cutEy - cutSy);
    }
    renderInfo.width = width;
    renderInfo.innerWidth = innerWidth;
    renderInfo.height = height;
    renderInfo.fontSize = fontSize;
    renderInfo.cutSx = cutSx;
    renderInfo.cutSy = cutSy;
    renderInfo.cutEx = cutEx;
    renderInfo.cutEy = cutEy;
    renderInfo.lineHeight = lineHeight;
    renderInfo.lineWidths = lineWidths;
    renderInfo.offsetY = offsetY;
    renderInfo.paddingLeft = paddingLeft;
    renderInfo.paddingRight = paddingRight;
    renderInfo.letterSpacing = letterSpacing;
    renderInfo.textIndent = textIndent;
    return renderInfo;
  }
  draw(renderInfo, linesOverride) {
    const precision = this.getPrecision();
    const lines = (linesOverride == null ? void 0 : linesOverride.lines) || renderInfo.lines;
    const lineWidths = (linesOverride == null ? void 0 : linesOverride.lineWidths) || renderInfo.lineWidths;
    const height = linesOverride ? linesOverride.lines.length * renderInfo.lineHeight : renderInfo.height;
    this._canvas.width = Math.min(Math.ceil(renderInfo.width + this._settings.textRenderIssueMargin), MAX_TEXTURE_DIMENSION);
    this._canvas.height = Math.min(Math.ceil(height), MAX_TEXTURE_DIMENSION);
    this.setFontProperties();
    if (renderInfo.fontSize >= 128) {
      this._context.globalAlpha = 0.01;
      this._context.fillRect(0, 0, 0.01, 0.01);
      this._context.globalAlpha = 1;
    }
    if (renderInfo.cutSx || renderInfo.cutSy) {
      this._context.translate(-renderInfo.cutSx, -renderInfo.cutSy);
    }
    let linePositionX;
    let linePositionY;
    const drawLines = [];
    for (let i = 0, n = lines.length; i < n; i++) {
      linePositionX = i === 0 ? renderInfo.textIndent : 0;
      linePositionY = i * renderInfo.lineHeight + renderInfo.offsetY;
      if (this._settings.verticalAlign == "middle") {
        linePositionY += (renderInfo.lineHeight - renderInfo.fontSize) / 2;
      } else if (this._settings.verticalAlign == "bottom") {
        linePositionY += renderInfo.lineHeight - renderInfo.fontSize;
      }
      if (this._settings.textAlign === "right") {
        linePositionX += renderInfo.innerWidth - lineWidths[i];
      } else if (this._settings.textAlign === "center") {
        linePositionX += (renderInfo.innerWidth - lineWidths[i]) / 2;
      }
      linePositionX += renderInfo.paddingLeft;
      drawLines.push({
        text: lines[i],
        x: linePositionX,
        y: linePositionY,
        w: lineWidths[i]
      });
    }
    if (this._settings.highlight) {
      const color = this._settings.highlightColor;
      const hlHeight = this._settings.highlightHeight * precision || renderInfo.fontSize * 1.5;
      const offset = this._settings.highlightOffset * precision;
      const hlPaddingLeft = this._settings.highlightPaddingLeft !== null ? this._settings.highlightPaddingLeft * precision : renderInfo.paddingLeft;
      const hlPaddingRight = this._settings.highlightPaddingRight !== null ? this._settings.highlightPaddingRight * precision : renderInfo.paddingRight;
      this._context.fillStyle = getRgbaString(color);
      for (let i = 0; i < drawLines.length; i++) {
        const drawLine = drawLines[i];
        this._context.fillRect(drawLine.x - hlPaddingLeft, drawLine.y - renderInfo.offsetY + offset, drawLine.w + hlPaddingRight + hlPaddingLeft, hlHeight);
      }
    }
    let prevShadowSettings = null;
    if (this._settings.shadow) {
      prevShadowSettings = [
        this._context.shadowColor,
        this._context.shadowOffsetX,
        this._context.shadowOffsetY,
        this._context.shadowBlur
      ];
      this._context.shadowColor = getRgbaString(this._settings.shadowColor);
      this._context.shadowOffsetX = this._settings.shadowOffsetX * precision;
      this._context.shadowOffsetY = this._settings.shadowOffsetY * precision;
      this._context.shadowBlur = this._settings.shadowBlur * precision;
    }
    this._context.fillStyle = getRgbaString(this._settings.textColor);
    for (let i = 0, n = drawLines.length; i < n; i++) {
      const drawLine = drawLines[i];
      if (renderInfo.letterSpacing === 0) {
        this._context.fillText(drawLine.text, drawLine.x, drawLine.y);
      } else {
        const textSplit = drawLine.text.split("");
        let x = drawLine.x;
        for (let i2 = 0, j = textSplit.length; i2 < j; i2++) {
          this._context.fillText(textSplit[i2], x, drawLine.y);
          x += this.measureText(textSplit[i2], renderInfo.letterSpacing);
        }
      }
    }
    if (prevShadowSettings) {
      this._context.shadowColor = prevShadowSettings[0];
      this._context.shadowOffsetX = prevShadowSettings[1];
      this._context.shadowOffsetY = prevShadowSettings[2];
      this._context.shadowBlur = prevShadowSettings[3];
    }
    if (renderInfo.cutSx || renderInfo.cutSy) {
      this._context.translate(renderInfo.cutSx, renderInfo.cutSy);
    }
    this.renderInfo = renderInfo;
  }
  wrapWord(word, wordWrapWidth, suffix) {
    const suffixWidth = this._context.measureText(suffix).width;
    const wordLen = word.length;
    const wordWidth = this._context.measureText(word).width;
    if (wordWidth <= wordWrapWidth) {
      return word;
    }
    let cutoffIndex = Math.floor(wordWrapWidth * wordLen / wordWidth);
    let truncWordWidth = this._context.measureText(word.substring(0, cutoffIndex)).width + suffixWidth;
    if (truncWordWidth > wordWrapWidth) {
      while (cutoffIndex > 0) {
        truncWordWidth = this._context.measureText(word.substring(0, cutoffIndex)).width + suffixWidth;
        if (truncWordWidth > wordWrapWidth) {
          cutoffIndex -= 1;
        } else {
          break;
        }
      }
    } else {
      while (cutoffIndex < wordLen) {
        truncWordWidth = this._context.measureText(word.substring(0, cutoffIndex)).width + suffixWidth;
        if (truncWordWidth < wordWrapWidth) {
          cutoffIndex += 1;
        } else {
          cutoffIndex -= 1;
          break;
        }
      }
    }
    return word.substring(0, cutoffIndex) + (wordWrapWidth >= suffixWidth ? suffix : "");
  }
  /**
   * Applies newlines to a string to have it optimally fit into the horizontal
   * bounds set by the Text object's wordWrapWidth property.
   */
  wrapText(text, wordWrapWidth, letterSpacing, indent = 0) {
    const lines = text.split(/\r?\n/g);
    let allLines = [];
    const realNewlines = [];
    for (let i = 0; i < lines.length; i++) {
      const resultLines = [];
      let result = "";
      let spaceLeft = wordWrapWidth - indent;
      const words = lines[i].split(" ");
      for (let j = 0; j < words.length; j++) {
        const wordWidth = this.measureText(words[j], letterSpacing);
        const wordWidthWithSpace = wordWidth + this.measureText(" ", letterSpacing);
        if (j === 0 || wordWidthWithSpace > spaceLeft) {
          if (j > 0) {
            resultLines.push(result);
            result = "";
          }
          result += words[j];
          spaceLeft = wordWrapWidth - wordWidth - (j === 0 ? indent : 0);
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += ` ${words[j]}`;
        }
      }
      resultLines.push(result);
      result = "";
      allLines = allLines.concat(resultLines);
      if (i < lines.length - 1) {
        realNewlines.push(allLines.length);
      }
    }
    return { l: allLines, n: realNewlines };
  }
  measureText(word, space = 0) {
    if (!space) {
      return this._context.measureText(word).width;
    }
    return word.split("").reduce((acc, char) => {
      return acc + this._context.measureText(char).width + space;
    }, 0);
  }
  mergeDefaults(settings) {
    return {
      text: "",
      w: 0,
      h: 0,
      fontStyle: "normal",
      fontSize: 40,
      fontFace: null,
      wordWrap: true,
      wordWrapWidth: 0,
      wordBreak: false,
      textOverflow: "",
      lineHeight: null,
      textBaseline: "alphabetic",
      textAlign: "left",
      verticalAlign: "top",
      offsetY: null,
      maxLines: 0,
      maxLinesSuffix: "...",
      textColor: [1, 1, 1, 1],
      paddingLeft: 0,
      paddingRight: 0,
      shadow: false,
      shadowColor: [0, 0, 0, 1],
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 5,
      highlight: false,
      highlightHeight: 0,
      highlightColor: [0, 0, 0, 1],
      highlightOffset: 0,
      highlightPaddingLeft: 0,
      highlightPaddingRight: 0,
      letterSpacing: 0,
      textIndent: 0,
      cutSx: 0,
      cutEx: 0,
      cutSy: 0,
      cutEy: 0,
      advancedRenderer: false,
      fontBaselineRatio: 0,
      precision: 1,
      textRenderIssueMargin: 0,
      ...settings
    };
  }
}
const resolvedGlobal$1 = typeof self === "undefined" ? globalThis : self;
const globalFontSet = ((_a = resolvedGlobal$1.document) == null ? void 0 : _a.fonts) || resolvedGlobal$1.fonts;
function getFontCssString(props) {
  const { fontFamily, fontStyle, fontWeight, fontStretch, fontSize } = props;
  return [fontStyle, fontWeight, fontStretch, `${fontSize}px`, fontFamily].join(" ");
}
const tmpElementBounds = createBound(0, 0, 0, 0);
class CanvasTextRenderer extends TextRenderer {
  constructor(stage) {
    super(stage);
    __publicField(this, "canvas");
    __publicField(this, "context");
    __publicField(this, "rendererBounds");
    if (typeof OffscreenCanvas !== "undefined") {
      this.canvas = new OffscreenCanvas(0, 0);
    } else {
      this.canvas = document.createElement("canvas");
    }
    let context = this.canvas.getContext("2d");
    if (!context) {
      this.canvas = document.createElement("canvas");
      context = this.canvas.getContext("2d");
    }
    assertTruthy$1(context);
    this.context = context;
    this.rendererBounds = {
      x1: 0,
      y1: 0,
      x2: this.stage.options.appWidth,
      y2: this.stage.options.appHeight
    };
  }
  //#region Overrides
  getPropertySetters() {
    return {
      fontFamily: (state, value) => {
        state.props.fontFamily = value;
        state.fontInfo = void 0;
        this.invalidateLayoutCache(state);
      },
      fontWeight: (state, value) => {
        state.props.fontWeight = value;
        state.fontInfo = void 0;
        this.invalidateLayoutCache(state);
      },
      fontStyle: (state, value) => {
        state.props.fontStyle = value;
        state.fontInfo = void 0;
        this.invalidateLayoutCache(state);
      },
      fontStretch: (state, value) => {
        state.props.fontStretch = value;
        state.fontInfo = void 0;
        this.invalidateLayoutCache(state);
      },
      fontSize: (state, value) => {
        state.props.fontSize = value;
        state.fontInfo = void 0;
        this.invalidateLayoutCache(state);
      },
      text: (state, value) => {
        state.props.text = value;
        this.invalidateLayoutCache(state);
      },
      textAlign: (state, value) => {
        state.props.textAlign = value;
        this.invalidateLayoutCache(state);
      },
      color: (state, value) => {
        state.props.color = value;
        this.invalidateLayoutCache(state);
      },
      x: (state, value) => {
        state.props.x = value;
        this.invalidateVisibleWindowCache(state);
      },
      y: (state, value) => {
        state.props.y = value;
        this.invalidateVisibleWindowCache(state);
      },
      contain: (state, value) => {
        state.props.contain = value;
        this.invalidateLayoutCache(state);
      },
      width: (state, value) => {
        state.props.width = value;
        this.invalidateLayoutCache(state);
      },
      height: (state, value) => {
        state.props.height = value;
        this.invalidateLayoutCache(state);
      },
      offsetY: (state, value) => {
        state.props.offsetY = value;
        this.invalidateLayoutCache(state);
      },
      scrollY: (state, value) => {
        state.props.scrollY = value;
      },
      letterSpacing: (state, value) => {
        state.props.letterSpacing = value;
        this.invalidateLayoutCache(state);
      },
      lineHeight: (state, value) => {
        state.props.lineHeight = value;
        this.invalidateLayoutCache(state);
      }
      // debug: (state, value) => {
      //   state.props.debug = value;
      // },
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canRenderFont(props) {
    return true;
  }
  isFontFaceSupported(fontFace) {
    return fontFace instanceof WebTrFontFace;
  }
  addFontFace(fontFace) {
    assertTruthy$1(fontFace instanceof WebTrFontFace);
    globalFontSet.add(fontFace.fontFace);
  }
  createState(props) {
    return {
      props,
      status: "initialState",
      updateScheduled: false,
      emitter: new EventEmitter(),
      canvasPages: void 0,
      lightning2TextRenderer: new LightningTextTextureRenderer(this.canvas, this.context),
      renderWindow: void 0,
      visibleWindow: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        valid: false
      },
      renderInfo: void 0,
      forceFullLayoutCalc: false,
      textW: 0,
      textH: 0,
      fontInfo: void 0,
      fontFaceLoadedHandler: void 0,
      debugData: {
        updateCount: 0,
        layoutCount: 0,
        drawCount: 0,
        lastLayoutNumCharacters: 0,
        layoutSum: 0,
        drawSum: 0,
        bufferSize: 0
      }
    };
  }
  updateState(state) {
    if (state.status === "initialState") {
      this.setStatus(state, "loading");
    }
    if (!state.fontInfo) {
      const cssString = getFontCssString(state.props);
      state.fontInfo = {
        cssString,
        // TODO: For efficiency we would use this here but it's not reliable on WPE -> document.fonts.check(cssString),
        loaded: false
      };
      if (!state.fontInfo.loaded) {
        globalFontSet.load(cssString).then(this.onFontLoaded.bind(this, state, cssString)).catch(this.onFontLoadError.bind(this, state, cssString));
        return;
      }
    }
    if (!state.fontInfo.loaded) {
      return;
    }
    if (!state.renderInfo) {
      state.lightning2TextRenderer.settings = {
        text: state.props.text,
        textAlign: state.props.textAlign,
        fontFace: state.props.fontFamily,
        fontSize: state.props.fontSize,
        fontStyle: [
          state.props.fontStretch,
          state.props.fontStyle,
          state.props.fontWeight
        ].join(" "),
        textColor: getNormalizedRgbaComponents(state.props.color),
        offsetY: state.props.fontSize + state.props.offsetY,
        wordWrap: state.props.contain !== "none",
        wordWrapWidth: state.props.contain === "none" ? void 0 : state.props.width,
        letterSpacing: state.props.letterSpacing,
        lineHeight: state.props.lineHeight
      };
      state.renderInfo = state.lightning2TextRenderer.calculateRenderInfo();
      state.textH = state.renderInfo.lineHeight * state.renderInfo.lines.length;
      state.textW = state.renderInfo.width;
      state.renderWindow = void 0;
    }
    const { x, y, width, height, scrollY, contain } = state.props;
    const { visibleWindow } = state;
    let { renderWindow, canvasPages } = state;
    if (!visibleWindow.valid) {
      const elementBounds = createBound(x, y, contain !== "none" ? x + width : Infinity, contain === "both" ? y + height : Infinity, tmpElementBounds);
      intersectBound(this.rendererBounds, elementBounds, visibleWindow);
      visibleWindow.valid = true;
    }
    const visibleWindowHeight = visibleWindow.y2 - visibleWindow.y1;
    const maxLinesPerCanvasPage = Math.ceil(visibleWindowHeight / state.renderInfo.lineHeight);
    if (visibleWindowHeight === 0) {
      canvasPages = void 0;
      renderWindow = void 0;
      this.setStatus(state, "loaded");
      return;
    } else if (renderWindow && canvasPages) {
      const renderWindowScreenX1 = x + renderWindow.x1;
      const renderWindowScreenY1 = y - scrollY + renderWindow.y1;
      const renderWindowScreenX2 = x + renderWindow.x2;
      const renderWindowScreenY2 = y - scrollY + renderWindow.y2;
      if (renderWindowScreenX1 <= visibleWindow.x1 && renderWindowScreenX2 >= visibleWindow.x2 && renderWindowScreenY1 <= visibleWindow.y1 && renderWindowScreenY2 >= visibleWindow.y2) {
        this.setStatus(state, "loaded");
        return;
      }
      if (renderWindowScreenY2 < visibleWindow.y2) {
        renderWindow.y1 += maxLinesPerCanvasPage * state.renderInfo.lineHeight;
        renderWindow.y2 += maxLinesPerCanvasPage * state.renderInfo.lineHeight;
        canvasPages.push(canvasPages.shift());
        canvasPages[2].lineNumStart = canvasPages[1].lineNumStart + maxLinesPerCanvasPage;
        canvasPages[2].lineNumEnd = canvasPages[2].lineNumStart + maxLinesPerCanvasPage;
        canvasPages[2].valid = false;
      } else if (renderWindowScreenY1 > visibleWindow.y1) {
        renderWindow.y1 -= maxLinesPerCanvasPage * state.renderInfo.lineHeight;
        renderWindow.y2 -= maxLinesPerCanvasPage * state.renderInfo.lineHeight;
        canvasPages.unshift(canvasPages.pop());
        canvasPages[0].lineNumStart = canvasPages[1].lineNumStart - maxLinesPerCanvasPage;
        canvasPages[0].lineNumEnd = canvasPages[0].lineNumStart + maxLinesPerCanvasPage;
        canvasPages[0].valid = false;
      }
    } else {
      const pageHeight = state.renderInfo.lineHeight * maxLinesPerCanvasPage;
      const page1Block = Math.ceil(scrollY / pageHeight);
      const page1LineStart = page1Block * maxLinesPerCanvasPage;
      const page0LineStart = page1LineStart - maxLinesPerCanvasPage;
      const page2LineStart = page1LineStart + maxLinesPerCanvasPage;
      canvasPages = [
        {
          texture: canvasPages == null ? void 0 : canvasPages[0].texture,
          lineNumStart: page0LineStart,
          lineNumEnd: page0LineStart + maxLinesPerCanvasPage,
          valid: false
        },
        {
          texture: canvasPages == null ? void 0 : canvasPages[1].texture,
          lineNumStart: page1LineStart,
          lineNumEnd: page1LineStart + maxLinesPerCanvasPage,
          valid: false
        },
        {
          texture: canvasPages == null ? void 0 : canvasPages[2].texture,
          lineNumStart: page2LineStart,
          lineNumEnd: page2LineStart + maxLinesPerCanvasPage,
          valid: false
        }
      ];
      state.canvasPages = canvasPages;
      const scrollYNearestPage = page1Block * pageHeight;
      renderWindow = {
        x1: 0,
        y1: scrollYNearestPage - pageHeight,
        x2: width,
        y2: scrollYNearestPage + pageHeight * 2
      };
    }
    state.renderWindow = renderWindow;
    performance.now();
    for (const pageInfo of canvasPages) {
      if (pageInfo.valid)
        continue;
      if (pageInfo.lineNumStart < 0) {
        pageInfo.texture = this.stage.txManager.loadTexture("ImageTexture", {
          src: ""
        });
        pageInfo.valid = true;
        continue;
      }
      state.lightning2TextRenderer.draw(state.renderInfo, {
        lines: state.renderInfo.lines.slice(pageInfo.lineNumStart, pageInfo.lineNumEnd),
        lineWidths: state.renderInfo.lineWidths.slice(pageInfo.lineNumStart, pageInfo.lineNumEnd)
      });
      if (!(this.canvas.width === 0 || this.canvas.height === 0)) {
        pageInfo.texture = this.stage.txManager.loadTexture("ImageTexture", {
          src: this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        }, {
          preload: true
        });
      }
      pageInfo.valid = true;
    }
    this.setStatus(state, "loaded");
  }
  renderQuads(state, transform, clippingRect, alpha) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const { stage } = this;
    const { canvasPages, textW = 0, textH = 0, renderWindow } = state;
    if (!canvasPages || !renderWindow)
      return;
    const {
      x,
      y,
      scrollY,
      contain,
      width,
      height
      /*, debug*/
    } = state.props;
    const elementRect = {
      x,
      y,
      width: contain !== "none" ? width : textW,
      height: contain === "both" ? height : textH
    };
    intersectRect({
      x: 0,
      y: 0,
      width: stage.options.appWidth,
      height: stage.options.appHeight
    }, elementRect);
    assertTruthy$1(canvasPages, "canvasPages is not defined");
    assertTruthy$1(renderWindow, "renderWindow is not defined");
    const renderWindowHeight = renderWindow.y2 - renderWindow.y1;
    const pageSize = renderWindowHeight / 3;
    const { zIndex, color } = state.props;
    const combinedAlpha = alpha * getNormalizedAlphaComponent(color);
    if (canvasPages[0].valid) {
      this.stage.renderer.addRenderable({
        alpha: combinedAlpha,
        clippingRect,
        colorBl: 4294967295,
        colorBr: 4294967295,
        colorTl: 4294967295,
        colorTr: 4294967295,
        width: ((_b = (_a2 = canvasPages[0].texture) == null ? void 0 : _a2.dimensions) == null ? void 0 : _b.width) || 0,
        height: ((_d = (_c = canvasPages[0].texture) == null ? void 0 : _c.dimensions) == null ? void 0 : _d.height) || 0,
        texture: canvasPages[0].texture,
        textureOptions: {},
        shader: null,
        shaderProps: null,
        zIndex,
        tx: transform.tx,
        ty: transform.ty - scrollY + renderWindow.y1,
        ta: transform.ta,
        tb: transform.tb,
        tc: transform.tc,
        td: transform.td
      });
    }
    if (canvasPages[1].valid) {
      this.stage.renderer.addRenderable({
        alpha: combinedAlpha,
        clippingRect,
        colorBl: 4294967295,
        colorBr: 4294967295,
        colorTl: 4294967295,
        colorTr: 4294967295,
        width: ((_f = (_e = canvasPages[1].texture) == null ? void 0 : _e.dimensions) == null ? void 0 : _f.width) || 0,
        height: ((_h = (_g = canvasPages[1].texture) == null ? void 0 : _g.dimensions) == null ? void 0 : _h.height) || 0,
        texture: canvasPages[1].texture,
        textureOptions: {},
        shader: null,
        shaderProps: null,
        zIndex,
        tx: transform.tx,
        ty: transform.ty - scrollY + renderWindow.y1 + pageSize,
        ta: transform.ta,
        tb: transform.tb,
        tc: transform.tc,
        td: transform.td
      });
    }
    if (canvasPages[2].valid) {
      this.stage.renderer.addRenderable({
        alpha: combinedAlpha,
        clippingRect,
        colorBl: 4294967295,
        colorBr: 4294967295,
        colorTl: 4294967295,
        colorTr: 4294967295,
        width: ((_j = (_i = canvasPages[2].texture) == null ? void 0 : _i.dimensions) == null ? void 0 : _j.width) || 0,
        height: ((_l = (_k = canvasPages[2].texture) == null ? void 0 : _k.dimensions) == null ? void 0 : _l.height) || 0,
        texture: canvasPages[2].texture,
        textureOptions: {},
        shader: null,
        shaderProps: null,
        zIndex,
        tx: transform.tx,
        ty: transform.ty - scrollY + renderWindow.y1 + pageSize + pageSize,
        ta: transform.ta,
        tb: transform.tb,
        tc: transform.tc,
        td: transform.td
      });
    }
  }
  //#endregion Overrides
  /**
   * Invalidate the visible window stored in the state. This will cause a new
   * visible window to be calculated on the next update.
   *
   * @param state
   */
  invalidateVisibleWindowCache(state) {
    state.visibleWindow.valid = false;
    this.setStatus(state, "loading");
    this.scheduleUpdateState(state);
  }
  /**
   * Invalidate the layout cache stored in the state. This will cause the text
   * to be re-layed out on the next update.
   *
   * @remarks
   * This also invalidates the visible window cache.
   *
   * @param state
   */
  invalidateLayoutCache(state) {
    state.renderInfo = void 0;
    this.setStatus(state, "loading");
    this.scheduleUpdateState(state);
  }
  onFontLoaded(state, cssString) {
    var _a2;
    if (cssString !== ((_a2 = state.fontInfo) == null ? void 0 : _a2.cssString) || !state.fontInfo) {
      return;
    }
    state.fontInfo.loaded = true;
    this.scheduleUpdateState(state);
  }
  onFontLoadError(state, cssString, error) {
    var _a2;
    if (cssString !== ((_a2 = state.fontInfo) == null ? void 0 : _a2.cssString) || !state.fontInfo) {
      return;
    }
    state.fontInfo.loaded = true;
    console.error(`CanvasTextRenderer: Error loading font '${state.fontInfo.cssString}'`, error);
    this.scheduleUpdateState(state);
  }
}
const bufferMemory = 2e6;
class Stage {
  /**
   * Stage constructor
   */
  constructor(options) {
    __publicField(this, "options");
    /// Module Instances
    __publicField(this, "animationManager");
    __publicField(this, "txManager");
    __publicField(this, "fontManager");
    __publicField(this, "textRenderers");
    __publicField(this, "shManager");
    __publicField(this, "renderer");
    __publicField(this, "scene");
    /// State
    __publicField(this, "deltaTime", 0);
    __publicField(this, "lastFrameTime", 0);
    __publicField(this, "currentFrameTime", 0);
    this.options = options;
    const { canvas, clearColor, rootId, debug, appWidth, appHeight } = options;
    this.txManager = new CoreTextureManager();
    this.shManager = new CoreShaderManager();
    this.animationManager = new AnimationManager();
    if (debug == null ? void 0 : debug.monitorTextureCache) {
      setInterval(() => {
        assertTruthy$1(this.txManager);
        const debugInfo = this.txManager.getDebugInfo();
        console.log("Texture ID Cache Size: ", debugInfo.idCacheSize);
        console.log("Texture Key Cache Size: ", debugInfo.keyCacheSize);
      }, 1e3);
    }
    this.renderer = new WebGlCoreRenderer({
      stage: this,
      canvas,
      pixelRatio: options.devicePhysicalPixelRatio * options.deviceLogicalPixelRatio,
      clearColor: clearColor != null ? clearColor : 4278190080,
      bufferMemory,
      txManager: this.txManager,
      shManager: this.shManager
    });
    this.txManager.renderer = this.renderer;
    this.textRenderers = {
      canvas: new CanvasTextRenderer(this),
      sdf: new SdfTextRenderer(this)
    };
    this.fontManager = new TrFontManager(this.textRenderers);
    const rootNode = new CoreNode(this, {
      id: rootId,
      x: 0,
      y: 0,
      width: appWidth,
      height: appHeight,
      alpha: 1,
      clipping: false,
      color: 0,
      colorTop: 0,
      colorBottom: 0,
      colorLeft: 0,
      colorRight: 0,
      colorTl: 0,
      colorTr: 0,
      colorBl: 0,
      colorBr: 0,
      zIndex: 0,
      zIndexLocked: 0,
      scaleX: 1,
      scaleY: 1,
      mountX: 0,
      mountY: 0,
      mount: 0,
      pivot: 0.5,
      pivotX: 0.5,
      pivotY: 0.5,
      rotation: 0,
      parent: null,
      texture: null,
      textureOptions: null,
      shader: null,
      shaderProps: null
    });
    this.scene = new Scene(rootNode);
    {
      startLoop(this);
    }
  }
  /**
   * Start a new frame draw
   */
  drawFrame() {
    var _a2, _b;
    const { renderer, scene, animationManager } = this;
    if (!(scene == null ? void 0 : scene.root)) {
      return;
    }
    this.lastFrameTime = this.currentFrameTime;
    this.currentFrameTime = getTimeStamp();
    this.deltaTime = !this.lastFrameTime ? 100 / 6 : this.currentFrameTime - this.lastFrameTime;
    animationManager.update(this.deltaTime);
    renderer == null ? void 0 : renderer.reset();
    if ((_a2 = scene == null ? void 0 : scene.root) == null ? void 0 : _a2.hasUpdates) {
      (_b = scene == null ? void 0 : scene.root) == null ? void 0 : _b.update(this.deltaTime);
    }
    this.addQuads(scene.root);
    renderer == null ? void 0 : renderer.sortRenderables();
    renderer == null ? void 0 : renderer.render();
  }
  addQuads(node, parentClippingRect = null) {
    assertTruthy$1(this.renderer && node.globalTransform);
    const gt = node.globalTransform;
    const isRotated = gt.tb !== 0 || gt.tc !== 0;
    let clippingRect = node.clipping && !isRotated ? {
      x: gt.tx,
      y: gt.ty,
      width: node.width * gt.ta,
      height: node.height * gt.td
    } : null;
    if (parentClippingRect && clippingRect) {
      clippingRect = intersectRect(parentClippingRect, clippingRect);
    } else if (parentClippingRect) {
      clippingRect = parentClippingRect;
    }
    node.renderQuads(this.renderer, clippingRect);
    node.children.forEach((child) => {
      if (child.worldAlpha === 0) {
        return;
      }
      this.addQuads(child, clippingRect);
    });
  }
  /**
   * Given a font name, and possible renderer override, return the best compatible text renderer.
   *
   * @remarks
   * Will always return at least a canvas renderer if no other suitable renderer can be resolved.
   *
   * @param fontFamily
   * @param textRendererOverride
   * @returns
   */
  resolveTextRenderer(trProps, textRendererOverride = null) {
    let rendererId = textRendererOverride;
    let overrideFallback = false;
    if (rendererId) {
      const possibleRenderer = this.textRenderers[rendererId];
      if (!possibleRenderer) {
        console.warn(`Text renderer override '${rendererId}' not found.`);
        rendererId = null;
        overrideFallback = true;
      } else if (!possibleRenderer.canRenderFont(trProps)) {
        console.warn(`Cannot use override text renderer '${rendererId}' for font`, trProps);
        rendererId = null;
        overrideFallback = true;
      }
    }
    if (!rendererId) {
      for (const [trId, tr] of Object.entries(this.textRenderers)) {
        if (trId === "canvas") {
          continue;
        }
        if (tr.canRenderFont(trProps)) {
          rendererId = trId;
          break;
        }
      }
      if (!rendererId) {
        rendererId = "canvas";
      }
    }
    if (overrideFallback) {
      console.warn(`Falling back to text renderer ${String(rendererId)}`);
    }
    const resolvedTextRenderer = this.textRenderers[rendererId];
    assertTruthy$1(resolvedTextRenderer, "resolvedTextRenderer undefined");
    return resolvedTextRenderer;
  }
  //#region Properties
  get root() {
    var _a2;
    return ((_a2 = this.scene) == null ? void 0 : _a2.root) || null;
  }
}
class CoreTextNode extends CoreNode {
  constructor(stage, props) {
    super(stage, props);
    __publicField(this, "textRenderer");
    __publicField(this, "trState");
    __publicField(this, "_textRendererOverride", null);
    __publicField(this, "onTextLoaded", () => {
      const { contain } = this;
      const setWidth = this.trState.props.width;
      const setHeight = this.trState.props.height;
      const calcWidth = this.trState.textW || 0;
      const calcHeight = this.trState.textH || 0;
      if (contain === "both") {
        this.props.width = setWidth;
        this.props.height = setHeight;
      } else if (contain === "width") {
        this.props.width = setWidth;
        this.props.height = calcHeight;
      } else if (contain === "none") {
        this.props.width = calcWidth;
        this.props.height = calcHeight;
      }
      this.updateLocalTransform();
      this.emit("loaded", {
        type: "text",
        dimensions: {
          width: this.trState.textW || 0,
          height: this.trState.textH || 0
        }
      });
    });
    __publicField(this, "onTextFailed", (target, error) => {
      this.emit("failed", {
        type: "text",
        error
      });
    });
    this._textRendererOverride = props.textRendererOverride;
    const { resolvedTextRenderer, textRendererState } = this.resolveTextRendererAndState({
      x: this.absX,
      y: this.absY,
      width: props.width,
      height: props.height,
      textAlign: props.textAlign,
      color: props.color,
      zIndex: props.zIndex,
      contain: props.contain,
      scrollable: props.scrollable,
      scrollY: props.scrollY,
      offsetY: props.offsetY,
      letterSpacing: props.letterSpacing,
      debug: props.debug,
      fontFamily: props.fontFamily,
      fontSize: props.fontSize,
      fontStretch: props.fontStretch,
      fontStyle: props.fontStyle,
      fontWeight: props.fontWeight,
      text: props.text,
      lineHeight: props.lineHeight
    }, void 0);
    this.textRenderer = resolvedTextRenderer;
    this.trState = textRendererState;
  }
  get width() {
    return this.trState.props.width;
  }
  set width(value) {
    this.textRenderer.set.width(this.trState, value);
  }
  get height() {
    return this.trState.props.height;
  }
  set height(value) {
    this.textRenderer.set.height(this.trState, value);
  }
  get color() {
    return this.trState.props.color;
  }
  set color(value) {
    this.textRenderer.set.color(this.trState, value);
  }
  get text() {
    return this.trState.props.text;
  }
  set text(value) {
    this.textRenderer.set.text(this.trState, value);
  }
  get textRendererOverride() {
    return this._textRendererOverride;
  }
  set textRendererOverride(value) {
    this._textRendererOverride = value;
    const { resolvedTextRenderer, textRendererState } = this.resolveTextRendererAndState(this.trState.props, this.trState);
    this.textRenderer = resolvedTextRenderer;
    this.trState = textRendererState;
  }
  get fontSize() {
    return this.trState.props.fontSize;
  }
  set fontSize(value) {
    this.textRenderer.set.fontSize(this.trState, value);
  }
  get fontFamily() {
    return this.trState.props.fontFamily;
  }
  set fontFamily(value) {
    this.textRenderer.set.fontFamily(this.trState, value);
  }
  get fontStretch() {
    return this.trState.props.fontStretch;
  }
  set fontStretch(value) {
    this.textRenderer.set.fontStretch(this.trState, value);
  }
  get fontStyle() {
    return this.trState.props.fontStyle;
  }
  set fontStyle(value) {
    this.textRenderer.set.fontStyle(this.trState, value);
  }
  get fontWeight() {
    return this.trState.props.fontWeight;
  }
  set fontWeight(value) {
    this.textRenderer.set.fontWeight(this.trState, value);
  }
  get textAlign() {
    return this.trState.props.textAlign;
  }
  set textAlign(value) {
    this.textRenderer.set.textAlign(this.trState, value);
  }
  get contain() {
    return this.trState.props.contain;
  }
  set contain(value) {
    this.textRenderer.set.contain(this.trState, value);
  }
  get scrollable() {
    return this.trState.props.scrollable;
  }
  set scrollable(value) {
    this.textRenderer.set.scrollable(this.trState, value);
  }
  get scrollY() {
    return this.trState.props.scrollY;
  }
  set scrollY(value) {
    this.textRenderer.set.scrollY(this.trState, value);
  }
  get offsetY() {
    return this.trState.props.offsetY;
  }
  set offsetY(value) {
    this.textRenderer.set.offsetY(this.trState, value);
  }
  get letterSpacing() {
    return this.trState.props.letterSpacing;
  }
  set letterSpacing(value) {
    this.textRenderer.set.letterSpacing(this.trState, value);
  }
  get lineHeight() {
    return this.trState.props.lineHeight;
  }
  set lineHeight(value) {
    if (this.textRenderer.set.lineHeight) {
      this.textRenderer.set.lineHeight(this.trState, value);
    }
  }
  get debug() {
    return this.trState.props.debug;
  }
  set debug(value) {
    this.textRenderer.set.debug(this.trState, value);
  }
  update(delta) {
    super.update(delta);
    assertTruthy$1(this.globalTransform);
    this.textRenderer.set.x(this.trState, this.globalTransform.tx);
    this.textRenderer.set.y(this.trState, this.globalTransform.ty);
  }
  renderQuads(renderer, clippingRect) {
    assertTruthy$1(this.globalTransform);
    this.textRenderer.renderQuads(this.trState, this.globalTransform, clippingRect, this.worldAlpha);
  }
  /**
   * Resolve a text renderer and a new state based on the current text renderer props provided
   * @param props
   * @returns
   */
  resolveTextRendererAndState(props, prevState) {
    const resolvedTextRenderer = this.stage.resolveTextRenderer(props, this._textRendererOverride);
    const textRendererState = resolvedTextRenderer.createState(props);
    const stateEvents = ["loading", "loaded", "failed"];
    if (prevState) {
      stateEvents.forEach((eventName) => {
        prevState.emitter.off(eventName);
      });
    }
    textRendererState.emitter.on("loaded", this.onTextLoaded);
    textRendererState.emitter.on("failed", this.onTextFailed);
    resolvedTextRenderer.scheduleUpdateState(textRendererState);
    return {
      resolvedTextRenderer,
      textRendererState
    };
  }
}
class MainOnlyTextNode extends MainOnlyNode {
  constructor(props, rendererMain, stage) {
    super(props, rendererMain, stage, new CoreTextNode(stage, {
      id: getNewId(),
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      alpha: props.alpha,
      clipping: props.clipping,
      color: props.color,
      colorTop: props.colorTop,
      colorBottom: props.colorBottom,
      colorLeft: props.colorLeft,
      colorRight: props.colorRight,
      colorTl: props.colorTl,
      colorTr: props.colorTr,
      colorBl: props.colorBl,
      colorBr: props.colorBr,
      zIndex: props.zIndex,
      zIndexLocked: props.zIndexLocked,
      scaleX: props.scaleX,
      scaleY: props.scaleY,
      mountX: props.mountX,
      mountY: props.mountY,
      mount: props.mount,
      pivot: props.pivot,
      pivotX: props.pivotX,
      pivotY: props.pivotY,
      rotation: props.rotation,
      // Text properties
      text: props.text,
      fontSize: props.fontSize,
      fontFamily: props.fontFamily,
      fontWeight: props.fontWeight,
      fontStretch: props.fontStretch,
      fontStyle: props.fontStyle,
      contain: props.contain,
      scrollable: props.scrollable,
      letterSpacing: props.letterSpacing,
      textAlign: props.textAlign,
      scrollY: props.scrollY,
      offsetY: props.offsetY,
      textRendererOverride: props.textRendererOverride,
      debug: props.debug,
      lineHeight: props.lineHeight,
      // These properties will get set appropriately in the base MainOnlyNode class
      parent: null,
      texture: null,
      textureOptions: null,
      shader: null,
      shaderProps: null
    }));
  }
  get text() {
    return this.coreNode.text;
  }
  set text(value) {
    this.coreNode.text = value;
  }
  get textRendererOverride() {
    return this.coreNode.textRendererOverride;
  }
  set textRendererOverride(value) {
    this.coreNode.textRendererOverride = value;
  }
  get fontSize() {
    return this.coreNode.fontSize;
  }
  set fontSize(value) {
    this.coreNode.fontSize = value;
  }
  get fontFamily() {
    return this.coreNode.fontFamily;
  }
  set fontFamily(value) {
    this.coreNode.fontFamily = value;
  }
  get fontWeight() {
    return this.coreNode.fontWeight;
  }
  set fontWeight(value) {
    this.coreNode.fontWeight = value;
  }
  get fontStretch() {
    return this.coreNode.fontStretch;
  }
  set fontStretch(value) {
    this.coreNode.fontStretch = value;
  }
  get fontStyle() {
    return this.coreNode.fontStyle;
  }
  set fontStyle(value) {
    this.coreNode.fontStyle = value;
  }
  get textAlign() {
    return this.coreNode.textAlign;
  }
  set textAlign(value) {
    this.coreNode.textAlign = value;
  }
  get contain() {
    return this.coreNode.contain;
  }
  set contain(value) {
    this.coreNode.contain = value;
  }
  get scrollable() {
    return this.coreNode.scrollable;
  }
  set scrollable(value) {
    this.coreNode.scrollable = value;
  }
  get scrollY() {
    return this.coreNode.scrollY;
  }
  set scrollY(value) {
    this.coreNode.scrollY = value;
  }
  get offsetY() {
    return this.coreNode.offsetY;
  }
  set offsetY(value) {
    this.coreNode.offsetY = value;
  }
  get letterSpacing() {
    return this.coreNode.letterSpacing;
  }
  set letterSpacing(value) {
    this.coreNode.letterSpacing = value;
  }
  get lineHeight() {
    return this.coreNode.lineHeight;
  }
  set lineHeight(value) {
    if (value) {
      this.coreNode.lineHeight = value;
    }
  }
  get debug() {
    return this.coreNode.debug;
  }
  set debug(value) {
    this.coreNode.debug = value;
  }
}
function classExtendsCoreExtension(Class) {
  return Class.prototype instanceof CoreExtension;
}
async function loadCoreExtension(coreExtensionModule, stage) {
  let module;
  try {
    console.log("Loading core extension", coreExtensionModule);
    module = await __vitePreload(() => import(
      coreExtensionModule
      /* @vite-ignore */
    ), true ? [] : void 0);
  } catch (e) {
    console.error(`The core extension module at '${coreExtensionModule}' could not be loaded.`);
    console.error(e);
    return;
  }
  if (!module.default) {
    console.error(`The core extension module at '${coreExtensionModule}' does not have a default export.`);
    return;
  }
  const ExtensionClass = module.default;
  if (classExtendsCoreExtension(ExtensionClass)) {
    const coreExtension = new ExtensionClass();
    try {
      await coreExtension.run(stage);
    } catch (e) {
      console.error(`The core extension at '${coreExtensionModule}' threw an error.`);
      console.error(e);
    }
  } else {
    console.error(`The core extension at '${coreExtensionModule}' does not extend CoreExtension.`);
  }
}
class MainCoreDriver {
  constructor() {
    __publicField(this, "root", null);
    __publicField(this, "stage", null);
    __publicField(this, "rendererMain", null);
  }
  async init(rendererMain, rendererSettings, canvas) {
    this.stage = new Stage({
      rootId: 1,
      appWidth: rendererSettings.appWidth,
      appHeight: rendererSettings.appHeight,
      deviceLogicalPixelRatio: rendererSettings.deviceLogicalPixelRatio,
      devicePhysicalPixelRatio: rendererSettings.devicePhysicalPixelRatio,
      clearColor: rendererSettings.clearColor,
      canvas,
      debug: {
        monitorTextureCache: false
      }
    });
    this.rendererMain = rendererMain;
    assertTruthy$1(this.stage.root);
    const node = new MainOnlyNode(rendererMain.resolveNodeDefaults({}), this.rendererMain, this.stage, this.stage.root);
    this.root = node;
    node.once("beforeDestroy", this.onBeforeDestroyNode.bind(this, node));
    this.onCreateNode(node);
    if (rendererSettings.coreExtensionModule) {
      await loadCoreExtension(rendererSettings.coreExtensionModule, this.stage);
    }
  }
  createNode(props) {
    assertTruthy$1(this.rendererMain);
    assertTruthy$1(this.stage);
    const node = new MainOnlyNode(props, this.rendererMain, this.stage);
    node.once("beforeDestroy", this.onBeforeDestroyNode.bind(this, node));
    this.onCreateNode(node);
    return node;
  }
  createTextNode(props) {
    assertTruthy$1(this.rendererMain);
    assertTruthy$1(this.stage);
    const node = new MainOnlyTextNode(props, this.rendererMain, this.stage);
    node.once("beforeDestroy", this.onBeforeDestroyNode.bind(this, node));
    this.onCreateNode(node);
    return node;
  }
  // TODO: Remove?
  destroyNode(node) {
    node.destroy();
  }
  releaseTexture(id) {
    const { stage } = this;
    assertTruthy$1(stage);
    stage.txManager.removeTextureIdFromCache(id);
  }
  getRootNode() {
    assertTruthy$1(this.root);
    return this.root;
  }
  onCreateNode(node) {
    throw new Error("Method not implemented.");
  }
  onBeforeDestroyNode(node) {
    throw new Error("Method not implemented.");
  }
}
const resolvedGlobal = typeof self === "undefined" ? globalThis : self;
function assertTruthy(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}
class SharedObject {
  constructor(sharedObjectStruct, curProps) {
    /**
     * The ThreadX instance that this SharedObject should interact with
     *
     * @remarks
     * It's unsafe to use `ThreadX.instance` in different, especially asyncronous,
     * locations directly because it may change during the lifetime of a
     * SharedObject. At least it can during tests. So this one should always
     * be referenced when needed.
     */
    __publicField(this, "threadx");
    __publicField(this, "sharedObjectStruct");
    __publicField(this, "mutations");
    __publicField(this, "waitPromise", null);
    __publicField(this, "mutationsQueued", false);
    __publicField(this, "_id");
    __publicField(this, "_typeId");
    __publicField(this, "initialized", false);
    __publicField(this, "destroying", false);
    __publicField(this, "curProps");
    //#region EventEmitter
    __publicField(this, "eventListeners", {});
    this.curProps = curProps;
    this.threadx = ThreadX.instance;
    this.sharedObjectStruct = sharedObjectStruct;
    this._id = sharedObjectStruct.id;
    this._typeId = sharedObjectStruct.typeId;
    const constructor = this.constructor;
    if (!Object.prototype.hasOwnProperty.call(constructor, "staticInitialized") || !constructor.staticInitialized) {
      constructor.staticInitialized = true;
      const prototype = Object.getPrototypeOf(this);
      Object.keys(curProps).forEach((key) => {
        Object.defineProperty(prototype, key, {
          get: function() {
            return this.curProps[key];
          },
          set: function(value) {
            this.curProps[key] = value;
            this.mutations[key] = true;
            this.queueMutations();
          }
        });
      });
    }
    this.mutations = {};
    this._executeMutations();
    this.initialized = true;
  }
  /**
   * Extract the buffer from a SharedObject
   *
   * @remarks
   * For internal use by ThreadX only
   *
   * @param sharedObject
   * @returns
   */
  static extractBuffer(sharedObject) {
    if (sharedObject.destroying || !sharedObject.sharedObjectStruct) {
      throw new Error("SharedObject.extractBuffer(): SharedObject is or was being destroyed.");
    }
    return sharedObject.sharedObjectStruct.buffer;
  }
  get typeId() {
    return this._typeId;
  }
  get id() {
    return this._id;
  }
  /**
   * Assumes lock is acquired
   */
  processDirtyProperties() {
    if (!this.sharedObjectStruct) {
      throw new Error("SharedObject was destroyed");
    }
    const { sharedObjectStruct, mutations, curProps } = this;
    sharedObjectStruct.constructor.propDefs.forEach((propDef, index) => {
      if (sharedObjectStruct.isDirty(index)) {
        const propName = propDef.name;
        delete mutations[propName];
        const oldValue = curProps[propName];
        curProps[propName] = sharedObjectStruct[propName];
        if (this.initialized) {
          this.onPropertyChange(propName, sharedObjectStruct[propName], oldValue);
        }
      }
    });
    sharedObjectStruct.resetDirty();
  }
  onPropertyChange(propName, newValue, oldValue) {
  }
  queueMutations() {
    if (this.mutationsQueued) {
      return;
    }
    this.mutationsQueued = true;
    queueMicrotask(() => {
      this.mutationsQueued = false;
      if (!this.sharedObjectStruct) {
        return;
      }
      this.mutationMicrotask().catch(console.error);
    });
  }
  async mutationMicrotask() {
    if (!this.sharedObjectStruct) {
      throw new Error("SharedObject was destroyed");
    }
    await this.sharedObjectStruct.lockAsync(async () => {
      this._executeMutations();
    });
    if (this.destroying) {
      this.finishDestroy();
    }
  }
  flush() {
    if (this.destroying || !this.sharedObjectStruct) {
      throw new Error("SharedObject was destroyed");
    }
    this.sharedObjectStruct.lock(() => {
      this._executeMutations();
    });
  }
  /**
   * Called when the SharedObject is being destroyed.
   *
   * @remarks
   * This is an opportunity to clean up anything just prior to the SharedObject
   * being completely destroyed. Shared mutations are allowed in this method.
   *
   * IMPORTANT:
   * `super.onDestroy()` must be called at the END of any subclass override to
   * ensure proper cleanup.
   */
  onDestroy() {
  }
  /**
   * Destroy the SharedObject on this worker only.
   *
   * @remarks
   * This stops any internal mutation processing, releases the reference
   * to the underlying BufferStruct/SharedArrayBuffer, and removes all
   * event listeners so that the SharedObject can be garbage collected.
   *
   * This does not destroy the SharedObject on other worker. To do that,
   * call `SharedObject.destroy()` on the other worker.
   */
  destroy() {
    const struct = this.sharedObjectStruct;
    if (this.destroying || !struct) {
      return;
    }
    this.emit("beforeDestroy", {}, { localOnly: true });
    this.destroying = true;
    this.onDestroy();
    this.queueMutations();
  }
  finishDestroy() {
    const struct = this.sharedObjectStruct;
    if (!this.destroying || !struct) {
      return;
    }
    this.threadx.forgetObjects([this], { silent: true }).catch(console.error);
    this.sharedObjectStruct = null;
    struct.notify();
    this.emit("afterDestroy", {}, { localOnly: true });
    this.eventListeners = {};
  }
  get isDestroyed() {
    return this.sharedObjectStruct === null;
  }
  _executeMutations() {
    if (!this.sharedObjectStruct) {
      return;
    }
    if (this.sharedObjectStruct.notifyValue !== this.threadx.workerId && this.sharedObjectStruct.isDirty()) {
      this.processDirtyProperties();
    }
    const { mutations } = this;
    this.mutations = {};
    for (const key in mutations) {
      if (Object.prototype.hasOwnProperty.call(mutations, key)) {
        const value = this.curProps[key];
        this.sharedObjectStruct[key];
        this.sharedObjectStruct[key] = value;
      }
    }
    if (this.waitPromise) {
      this.waitPromise = null;
    }
    let expectedNotifyValue = this.sharedObjectStruct.notifyValue;
    if (this.sharedObjectStruct.isDirty()) {
      this.sharedObjectStruct.notify(this.threadx.workerId);
      expectedNotifyValue = this.threadx.workerId;
    }
    const waitPromise = this.sharedObjectStruct.waitAsync(expectedNotifyValue).then(async (result) => {
      if (this.waitPromise === waitPromise && this.sharedObjectStruct) {
        assertTruthy(result === "ok");
        this.waitPromise = null;
        await this.mutationMicrotask();
      }
    });
    this.waitPromise = waitPromise;
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
  emit(event, data, options = {}) {
    const listeners = this.eventListeners[event];
    if (!options.localOnly) {
      ThreadX.instance.__sharedObjectEmit(this, event, data);
    }
    if (!listeners) {
      return;
    }
    [...listeners].forEach((listener) => {
      listener(this, data);
    });
  }
}
__publicField(SharedObject, "staticInitialized", false);
function isValidTypeIdCharCode(charCode) {
  return charCode >= 65 && charCode <= 90 || charCode >= 48 && charCode <= 57;
}
function genTypeId(tidString) {
  let typeId = 0;
  if (tidString.length === 0) {
    throw new Error(`genTypeId: Type ID string must be at least 1 character`);
  } else if (tidString.length > 4) {
    throw new Error(`genTypeId: Type ID string must be 4 characters or less`);
  }
  for (let i = 0; i < tidString.length; i++) {
    let charCode = tidString.charCodeAt(i);
    if (charCode !== charCode) {
      charCode = 0;
    } else if (!isValidTypeIdCharCode(charCode)) {
      throw new Error(`genTypeId: Invalid character '${tidString[i]}' (char code: ${charCode}) in type ID string. A-Z and 0-9 only.`);
    }
    typeId |= charCode << i * 8;
  }
  return typeId;
}
function stringifyTypeId(typeId) {
  const chars = [];
  for (let i = 0; i < 4; i++) {
    const charCode = typeId & 255;
    if (isValidTypeIdCharCode(charCode)) {
      chars.push(String.fromCharCode(charCode));
    } else if (charCode !== 0 || i === 0) {
      return "????";
    }
    typeId >>>= 8;
  }
  return chars.join("");
}
function isMessage(messageType, message) {
  return typeof message === "object" && message !== null && "threadXMessageType" in message && message.threadXMessageType === messageType;
}
function isWebWorker(selfObj) {
  return typeof selfObj.DedicatedWorkerGlobalScope === "function";
}
class ThreadX {
  constructor(options) {
    __publicField(this, "workerId");
    __publicField(this, "workerName");
    __publicField(this, "sharedObjectFactory");
    __publicField(this, "onSharedObjectCreated");
    __publicField(this, "onBeforeObjectForgotten");
    /**
     * User-defined message handler
     */
    __publicField(this, "onUserMessage");
    __publicField(this, "sharedObjects", /* @__PURE__ */ new Map());
    /**
     * WeakMap of SharedObjects to additional metadata
     */
    __publicField(this, "sharedObjectData", /* @__PURE__ */ new WeakMap());
    __publicField(this, "workers", /* @__PURE__ */ new Map());
    __publicField(this, "workerReadyPromises", /* @__PURE__ */ new Map());
    __publicField(this, "pendingAsyncMsgs", /* @__PURE__ */ new Map());
    __publicField(this, "nextAsyncMsgId", 0);
    __publicField(this, "nextUniqueId", 0);
    /**
     * Suppress emitting events from SharedObjects
     *
     * @remarks
     * This is used to prevent infinite loops when emitting events from a SharedObject
     * that is shared with another worker.
     *
     * We set this to true when we receive a SharedObjectEmitMessage from another worker
     * and set it back to false after we have emitted the event on the SharedObject.
     */
    __publicField(this, "suppressSharedObjectEmit", false);
    this.workerId = options.workerId;
    this.workerName = options.workerName;
    this.nextUniqueId = options.workerId * 1e13 + 1;
    this.sharedObjectFactory = options.sharedObjectFactory;
    this.onSharedObjectCreated = options.onObjectShared;
    this.onBeforeObjectForgotten = options.onBeforeObjectForgotten;
    this.onUserMessage = options.onMessage;
    const mySelf = resolvedGlobal;
    if (isWebWorker(mySelf)) {
      this.registerWorker("parent", mySelf);
      this.sendMessage("parent", {
        threadXMessageType: "ready"
      });
    }
  }
  static init(options) {
    if (resolvedGlobal.THREADX) {
      throw new Error("ThreadX.init(): ThreadX already initialized.");
    }
    const threadX = new ThreadX(options);
    resolvedGlobal.THREADX = threadX;
    return threadX;
  }
  static destroy() {
    if (!resolvedGlobal.THREADX) {
      console.warn("ThreadX.destroy(): ThreadX is not initialized.");
      return;
    }
    delete resolvedGlobal.THREADX;
    return;
  }
  /**
   * Get the Worker ID of the current worker
   *
   * @remarks
   * This is only valid after ThreadX.init() has been called.
   */
  static get workerId() {
    if (!resolvedGlobal.THREADX) {
      throw new Error("ThreadX not initialized");
    }
    return resolvedGlobal.THREADX.workerId;
  }
  /**
   * Get the Worker Name of the current thread
   *
   * @remarks
   * This is only valid after ThreadX.init() has been called.
   */
  static get workerName() {
    if (!resolvedGlobal.THREADX) {
      throw new Error("ThreadX not initialized");
    }
    return resolvedGlobal.THREADX.workerName;
  }
  static get instance() {
    if (!resolvedGlobal.THREADX) {
      throw new Error("ThreadX not initialized");
    }
    return resolvedGlobal.THREADX;
  }
  registerWorker(workerName, worker) {
    this.workers.set(workerName, worker);
    let readyResolve;
    let readyPromise;
    if (workerName === "parent") {
      readyPromise = Promise.resolve();
      readyResolve = () => {
      };
    } else {
      readyPromise = new Promise((resolve) => {
        readyResolve = resolve;
      });
    }
    this.workerReadyPromises.set(workerName, {
      promise: readyPromise,
      resolve: readyResolve
    });
    this.listenForWorkerMessages(workerName, worker);
  }
  closeWorker(workerName) {
    if (!this.workers.has(workerName)) {
      throw new Error(`Worker ${workerName} not registered.`);
    }
    this.closeWorkerAsync(workerName).catch(console.error);
  }
  async closeWorkerAsync(workerName, timeout = 5e3) {
    var _a2;
    const worker = this.workers.get(workerName);
    if (!worker) {
      throw new Error(`Worker ${workerName} not registered.`);
    }
    const result = await Promise.race([
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, timeout);
      }),
      this.sendMessageAsync(workerName, {
        threadXMessageType: "close"
      })
    ]);
    this.workers.delete(workerName);
    this.workerReadyPromises.delete(workerName);
    if (!result) {
      console.warn(`threadX.closeWorkerAsync(): Worker "${workerName}" did not respond to "close" message within ${timeout}ms. Forcing termination.`);
      (_a2 = worker.terminate) == null ? void 0 : _a2.call(worker);
      return "forced";
    }
    return "graceful";
  }
  listenForWorkerMessages(workerName, worker) {
    worker.addEventListener("message", (event) => {
      const { data } = event;
      const asyncMsgId = data.__asyncMsgId;
      this.onMessage(workerName, data).then((response) => {
        if (asyncMsgId !== void 0) {
          worker.postMessage({
            threadXMessageType: "response",
            asyncMsgId,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            data: response
          });
        }
      }).catch((error) => {
        if (asyncMsgId !== void 0) {
          worker.postMessage({
            threadXMessageType: "response",
            asyncMsgId,
            error: true,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            data: error
          });
        }
      });
    });
  }
  /**
   * Share a SharedObject with a worker
   *
   * @param workerName Worker to share with
   * @param sharedObject
   */
  async shareObjects(workerName, sharedObjects) {
    for (const sharedObject of sharedObjects) {
      if (this.sharedObjects.get(sharedObject.id)) {
        console.warn(`ThreadX.shareObject(): SharedObject ${sharedObject.id} (TypeID: ${stringifyTypeId(sharedObject.typeId)}) is already shared.`);
      } else {
        this.sharedObjects.set(sharedObject.id, sharedObject);
        this.sharedObjectData.set(sharedObject, {
          workerName,
          shareConfirmed: false,
          emitQueue: null
        });
      }
    }
    await this.sendMessageAsync(workerName, {
      threadXMessageType: "shareObjects",
      buffers: sharedObjects.map((so) => {
        return SharedObject.extractBuffer(so);
      })
    });
    for (const sharedObject of sharedObjects) {
      const soData = this.sharedObjectData.get(sharedObject);
      if (soData) {
        soData.shareConfirmed = true;
        const { emitQueue } = soData;
        if (emitQueue) {
          for (const event of emitQueue) {
            this.__sharedObjectEmit(sharedObject, event[0], event[1]);
          }
          soData.emitQueue = null;
        }
      }
    }
  }
  /**
   * Tell ThreadX to forget about SharedObjects
   *
   * @remarks
   * This causes ThreadX on the current worker and the worker that the object
   * is shared with to forget about the object. It is up to the worker code to
   * actually make sure that no other references to the SharedObjects exist so
   * that they can be garbage collected.
   *
   * A worker can implement the onObjectForgotten() callback to be notified
   * when a SharedObject is forgotten.
   *
   * @param sharedObject
   * @param options Options
   */
  async forgetObjects(sharedObjects, options = {}) {
    const objectsByWorker = /* @__PURE__ */ new Map();
    for (const sharedObject of sharedObjects) {
      if (!this.sharedObjects.has(sharedObject.id)) {
        if (!options.silent) {
          console.warn(`ThreadX.forgetObject(): SharedObject ${sharedObject.id} (TypeID: ${stringifyTypeId(sharedObject.typeId)}) is not shared.`);
        }
      } else {
        const soData = this.sharedObjectData.get(sharedObject);
        assertTruthy(soData);
        let objectsInWorker = objectsByWorker.get(soData.workerName);
        if (!objectsInWorker) {
          objectsInWorker = [];
          objectsByWorker.set(soData.workerName, objectsInWorker);
        }
        objectsInWorker.push(sharedObject);
        this.sharedObjects.delete(sharedObject.id);
        this.sharedObjectData.delete(sharedObject);
      }
    }
    const promises = [];
    for (const [workerName, objectsInWorker] of objectsByWorker) {
      promises.push(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.sendMessageAsync(workerName, {
          threadXMessageType: "forgetObjects",
          objectIds: objectsInWorker.map((so) => so.id)
        })
      );
    }
    await Promise.all(promises);
  }
  sendMessage(workerName, message, transfer) {
    const worker = this.workers.get(workerName);
    if (!worker) {
      throw new Error(`ThreadX.sendMessage(): Worker '${workerName}' not registered.`);
    }
    this.sendMessageAsync(workerName, message, transfer, {
      skipResponseWait: true
    }).catch(console.error);
  }
  async sendMessageAsync(workerName, message, transfer, options = {}) {
    const worker = this.workers.get(workerName);
    if (!worker) {
      throw new Error(`ThreadX.execMessage(): Worker '${workerName}' not registered.`);
    }
    await this.workerReadyPromises.get(workerName).promise;
    if (options.skipResponseWait) {
      worker.postMessage(message, transfer);
      return;
    }
    const asyncMsgId = this.nextAsyncMsgId++;
    const promise = new Promise((resolve, reject) => {
      this.pendingAsyncMsgs.set(asyncMsgId, {
        resolve,
        reject
      });
    });
    message.__asyncMsgId = asyncMsgId;
    worker.postMessage(message, transfer);
    return promise;
  }
  async onMessage(srcWorkerName, message) {
    var _a2;
    if (isMessage("shareObjects", message)) {
      message.buffers.forEach((buffer) => {
        var _a3, _b;
        const sharedObject = (_a3 = this.sharedObjectFactory) == null ? void 0 : _a3.call(this, buffer);
        if (!sharedObject) {
          throw new Error("ThreadX.onMesasge(): Failed to create shared object.");
        }
        this.sharedObjects.set(sharedObject.id, sharedObject);
        this.sharedObjectData.set(sharedObject, {
          workerName: srcWorkerName,
          shareConfirmed: true,
          emitQueue: null
        });
        (_b = this.onSharedObjectCreated) == null ? void 0 : _b.call(this, sharedObject);
      });
    } else if (isMessage("forgetObjects", message)) {
      message.objectIds.forEach((id) => {
        var _a3;
        const sharedObject = this.sharedObjects.get(id);
        if (!sharedObject) {
          return;
        }
        (_a3 = this.onBeforeObjectForgotten) == null ? void 0 : _a3.call(this, sharedObject);
        this.sharedObjects.delete(id);
        sharedObject.destroy();
      });
    } else if (isMessage("sharedObjectEmit", message)) {
      const sharedObject = this.sharedObjects.get(message.sharedObjectId);
      if (!sharedObject) {
        return;
      }
      this.suppressSharedObjectEmit = true;
      sharedObject.emit(message.eventName, message.data);
      this.suppressSharedObjectEmit = false;
    } else if (isMessage("response", message)) {
      const response = this.pendingAsyncMsgs.get(message.asyncMsgId);
      if (!response) {
        throw new Error(`ThreadX.onMessage(): Received response for unknown request (ID: ${message.asyncMsgId})`);
      }
      this.pendingAsyncMsgs.delete(message.asyncMsgId);
      if (message.error) {
        response.reject(message.data);
      } else {
        response.resolve(message.data);
      }
    } else if (isMessage("close", message)) {
      resolvedGlobal.close();
      return true;
    } else if (isMessage("ready", message)) {
      (_a2 = this.workerReadyPromises.get(srcWorkerName)) == null ? void 0 : _a2.resolve();
      return true;
    } else if (this.onUserMessage) {
      return await this.onUserMessage(message);
    }
  }
  getSharedObjectById(id) {
    return this.sharedObjects.get(id) || null;
  }
  /**
   * Generates an ID that is unique across all ThreadX workers.
   *
   * @remarks
   * The ID is based on the `workerId` set in the `ThreadXOptions` and an
   * incrementing counter. For the ID to actually be unique the `workerId` must
   * also be unique.
   *
   * @returns A unique ID
   */
  generateUniqueId() {
    return this.nextUniqueId++;
  }
  /**
   * Emit an event from a SharedObject to all other workers
   *
   * @internalRemarks
   * For internal ThreadX use only.
   *
   * Since we aren't sure what workers are sharing a SharedObject we need to
   * emit the event to all workers. (TODO: Possible optimization?)
   *
   * @param sharedObject
   * @param eventName
   * @param data
   * @returns
   */
  __sharedObjectEmit(sharedObject, eventName, data) {
    if (this.suppressSharedObjectEmit) {
      return;
    }
    const soData = this.sharedObjectData.get(sharedObject);
    if (!soData) {
      return;
    }
    if (!soData.shareConfirmed) {
      if (!soData.emitQueue) {
        soData.emitQueue = [];
      }
      soData.emitQueue.push([eventName, data]);
      return;
    }
    const worker = this.workers.get(soData.workerName);
    assertTruthy(worker, "Worker not found");
    worker.postMessage({
      threadXMessageType: "sharedObjectEmit",
      sharedObjectId: sharedObject.id,
      eventName,
      data
    });
  }
}
const TYPEID_INT32_INDEX = 0;
const NOTIFY_INT32_INDEX = 1;
const LOCK_INT32_INDEX = 2;
const DIRTY_INT32_INDEX = 6;
const ID_FLOAT64_INDEX = 2;
const MAX_STRING_SIZE = 255;
function valueIsType(expectedType, type, value) {
  return expectedType === type;
}
function valuesAreEqual(a, b) {
  return a === b;
}
function structProp(type, options) {
  return function(target, key, descriptor) {
    const constructor = target.constructor;
    if (!Object.prototype.hasOwnProperty.call(constructor, "staticInitialized") || !constructor.staticInitialized) {
      constructor.initStatic();
    }
    let byteOffset = constructor.size;
    let offset = 0;
    let byteSize = 0;
    if (type === "string") {
      byteOffset += byteOffset % 2;
      offset = byteOffset / 2;
      byteSize = (MAX_STRING_SIZE + 1) * 2;
    } else if (type === "int32" || type === "boolean") {
      byteOffset += byteOffset % 4;
      offset = byteOffset / 4;
      byteSize = 4;
    } else if (type === "number") {
      byteOffset += byteOffset % 8;
      offset = byteOffset / 8;
      byteSize = 8;
    }
    const propDefs = constructor.propDefs;
    const propNum = propDefs.length;
    const propDef = {
      propNum,
      name: key,
      type,
      byteOffset,
      offset,
      byteSize
    };
    propDefs.push(propDef);
    constructor.size = byteOffset + byteSize;
    descriptor.get = function() {
      let value;
      if (type === "string") {
        const length = this.uint16array[offset];
        if (!length)
          return "";
        if (length > MAX_STRING_SIZE) {
          throw new Error(`get SharedObject.${key}: Text length is too long. Length: ${length}`);
        }
        value = String.fromCharCode(...this.uint16array.slice(offset + 1, offset + 1 + length));
      } else if (type === "int32") {
        value = this.int32array[offset];
      } else if (type === "boolean") {
        value = !!this.int32array[offset];
      } else if (type === "number") {
        value = this.float64array[offset];
      }
      if (options == null ? void 0 : options.bufferToProp) {
        value = options.bufferToProp(value);
      }
      return value;
    };
    descriptor.set = function(value) {
      if (options == null ? void 0 : options.propToBuffer) {
        value = options.propToBuffer(value);
      }
      if (valueIsType("string", type)) {
        if (!valuesAreEqual(value, this[key])) {
          this.setDirty(propNum);
          let length = value.length;
          if (length > MAX_STRING_SIZE) {
            console.error(`set SharedObject.${key}: Text length is too long. Truncating...`, length);
            length = MAX_STRING_SIZE;
          }
          this.uint16array[offset] = length;
          const startOffset = offset + 1;
          const endOffset = startOffset + length;
          let charIndex = 0;
          for (let i = startOffset; i < endOffset; i++) {
            this.uint16array[i] = value.charCodeAt(charIndex++);
          }
        }
      } else if (valueIsType("int32", type)) {
        if (!valuesAreEqual(value, this[key])) {
          this.setDirty(propNum);
          this.int32array[offset] = value;
        }
      } else if (valueIsType("boolean", type)) {
        if (!valuesAreEqual(value, this[key])) {
          this.setDirty(propNum);
          this.int32array[offset] = value ? 1 : 0;
        }
      } else if (valueIsType("number", type)) {
        if (!valuesAreEqual(value, this[key])) {
          this.setDirty(propNum);
          this.float64array[offset] = value;
        }
      }
    };
  };
}
const _BufferStruct = class _BufferStruct {
  constructor(buffer) {
    __publicField(this, "buffer");
    // Lock ID that is a valid 32-bit random integer
    __publicField(this, "lockId", Math.floor(Math.random() * 4294967295));
    __publicField(this, "uint16array");
    __publicField(this, "int32array");
    __publicField(this, "float64array");
    const constructor = this.constructor;
    if (!Object.prototype.hasOwnProperty.call(constructor, "staticInitialized") || !constructor.staticInitialized) {
      constructor.initStatic();
    }
    const isNew = !buffer;
    if (!buffer) {
      buffer = new SharedArrayBuffer(Math.ceil(constructor.size / 8) * 8);
    }
    this.buffer = buffer;
    this.uint16array = new Uint16Array(buffer);
    this.int32array = new Int32Array(buffer);
    this.float64array = new Float64Array(buffer);
    const typeId = constructor.typeId;
    if (isNew) {
      this.int32array[TYPEID_INT32_INDEX] = typeId;
      this.float64array[ID_FLOAT64_INDEX] = ThreadX.instance.generateUniqueId();
    } else if (this.int32array[TYPEID_INT32_INDEX] !== typeId) {
      throw new Error(`BufferStruct: TypeId mismatch. Expected '${constructor.typeIdStr}', got '${stringifyTypeId(this.int32array[TYPEID_INT32_INDEX])}'`);
    }
  }
  /**
   * Safely extract the TypeID from any SharedArrayBuffer (as if it is a BufferStruct)
   *
   * @remarks
   * Does not check if the TypeID is valid however it does a basic sanity check to
   * ensure the buffer is large enough to contain the TypeID at Int32[TYPEID_INT32_INDEX].
   *
   * If the buffer is found to be invalid, 0 is returned.
   *
   * @param buffer
   * @returns
   */
  static extractTypeId(buffer) {
    if (buffer.byteLength < _BufferStruct.size || buffer.byteLength % 8 !== 0) {
      return 0;
    }
    return new Int32Array(buffer)[TYPEID_INT32_INDEX] || 0;
  }
  /**
   * Checks if typeId is valid and sets up static properties when the first
   * structProp() decorator is set-up on the class.
   *
   * @remarks
   * WARNING: This should not ever be called directly.
   *
   * @internal
   */
  static initStatic() {
    const typeIdStr = stringifyTypeId(this.typeId);
    if (typeIdStr === "????") {
      throw new Error("BufferStruct.typeId must be set to a valid 32-bit integer");
    }
    this.typeIdStr = typeIdStr;
    this.propDefs = [...this.propDefs];
    this.staticInitialized = true;
  }
  setDirty(propIndex) {
    const dirtyWordOffset = Math.floor(propIndex / 32);
    const dirtyBitOffset = propIndex - dirtyWordOffset * 32;
    this.int32array[DIRTY_INT32_INDEX + dirtyWordOffset] = this.int32array[DIRTY_INT32_INDEX + dirtyWordOffset] | 1 << dirtyBitOffset;
  }
  resetDirty() {
    this.int32array[NOTIFY_INT32_INDEX] = 0;
    this.int32array[DIRTY_INT32_INDEX] = 0;
    this.int32array[DIRTY_INT32_INDEX + 1] = 0;
  }
  isDirty(propIndex) {
    if (propIndex !== void 0) {
      const dirtyWordOffset = Math.floor(propIndex / 32);
      const dirtyBitOffset = propIndex - dirtyWordOffset * 32;
      return !!(this.int32array[DIRTY_INT32_INDEX + dirtyWordOffset] & 1 << dirtyBitOffset);
    }
    return !!(this.int32array[DIRTY_INT32_INDEX] || this.int32array[DIRTY_INT32_INDEX + 1]);
  }
  get typeId() {
    return this.int32array[TYPEID_INT32_INDEX];
  }
  get id() {
    return this.float64array[ID_FLOAT64_INDEX];
  }
  /**
   * Returns the current notify value
   */
  get notifyValue() {
    return Atomics.load(this.int32array, NOTIFY_INT32_INDEX);
  }
  /**
   * Returns true if the BufferStruct is currently locked
   */
  get isLocked() {
    return Atomics.load(this.int32array, LOCK_INT32_INDEX) !== 0;
  }
  lock(callback) {
    let origLock = Atomics.compareExchange(this.int32array, LOCK_INT32_INDEX, 0, this.lockId);
    while (origLock !== 0) {
      try {
        Atomics.wait(this.int32array, LOCK_INT32_INDEX, origLock);
      } catch (e) {
        if (e instanceof TypeError && e.message === "Atomics.wait cannot be called in this context")
          ;
        else {
          throw e;
        }
      }
      origLock = Atomics.compareExchange(this.int32array, LOCK_INT32_INDEX, 0, this.lockId);
    }
    let result;
    try {
      result = callback();
    } finally {
      Atomics.store(this.int32array, LOCK_INT32_INDEX, 0);
      Atomics.notify(this.int32array, LOCK_INT32_INDEX);
    }
    return result;
  }
  async lockAsync(callback) {
    let origLock = Atomics.compareExchange(this.int32array, LOCK_INT32_INDEX, 0, this.lockId);
    while (origLock !== 0) {
      const result2 = Atomics.waitAsync(this.int32array, LOCK_INT32_INDEX, origLock);
      await result2.value;
      origLock = Atomics.compareExchange(this.int32array, LOCK_INT32_INDEX, 0, this.lockId);
    }
    let result;
    try {
      result = await callback();
    } finally {
      Atomics.store(this.int32array, LOCK_INT32_INDEX, 0);
      Atomics.notify(this.int32array, LOCK_INT32_INDEX);
    }
    return result;
  }
  notify(value) {
    if (value !== void 0) {
      Atomics.store(this.int32array, NOTIFY_INT32_INDEX, value);
    }
    return Atomics.notify(this.int32array, NOTIFY_INT32_INDEX);
  }
  wait(expectedValue, timeout = Infinity) {
    const result = Atomics.wait(this.int32array, NOTIFY_INT32_INDEX, expectedValue, timeout);
    return result;
  }
  async waitAsync(expectedValue, timeout = Infinity) {
    const result = Atomics.waitAsync(this.int32array, NOTIFY_INT32_INDEX, expectedValue, timeout);
    return result.value;
  }
};
__publicField(_BufferStruct, "staticInitialized", false);
__publicField(_BufferStruct, "typeId", 0);
__publicField(_BufferStruct, "typeIdStr", "");
__publicField(_BufferStruct, "size", 8 * 4);
// Header size
__publicField(_BufferStruct, "propDefs", []);
let BufferStruct = _BufferStruct;
var __decorate$1 = globalThis && globalThis.__decorate || function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class NodeStruct extends BufferStruct {
  get x() {
    return 0;
  }
  set x(value) {
  }
  get y() {
    return 0;
  }
  set y(value) {
  }
  get width() {
    return 0;
  }
  set width(value) {
  }
  get height() {
    return 0;
  }
  set height(value) {
  }
  get alpha() {
    return 1;
  }
  set alpha(value) {
  }
  get clipping() {
    return false;
  }
  set clipping(value) {
  }
  get color() {
    return 0;
  }
  set color(value) {
  }
  get colorTop() {
    return 0;
  }
  set colorTop(value) {
  }
  get colorBottom() {
    return 0;
  }
  set colorBottom(value) {
  }
  get colorLeft() {
    return 0;
  }
  set colorLeft(value) {
  }
  get colorRight() {
    return 0;
  }
  set colorRight(value) {
  }
  get colorTl() {
    return 0;
  }
  set colorTl(value) {
  }
  get colorTr() {
    return 0;
  }
  set colorTr(value) {
  }
  get colorBl() {
    return 0;
  }
  set colorBl(value) {
  }
  get colorBr() {
    return 0;
  }
  set colorBr(value) {
  }
  get scaleX() {
    return 1;
  }
  set scaleX(value) {
  }
  get scaleY() {
    return 1;
  }
  set scaleY(value) {
  }
  get mount() {
    return 0;
  }
  set mount(value) {
  }
  get mountX() {
    return 0;
  }
  set mountX(value) {
  }
  get mountY() {
    return 0;
  }
  set mountY(value) {
  }
  get pivot() {
    return 0.5;
  }
  set pivot(value) {
  }
  get pivotX() {
    return 0.5;
  }
  set pivotX(value) {
  }
  get pivotY() {
    return 0.5;
  }
  set pivotY(value) {
  }
  get rotation() {
    return 0;
  }
  set rotation(value) {
  }
  get parentId() {
    return 0;
  }
  set parentId(value) {
  }
  get zIndex() {
    return 0;
  }
  set zIndex(value) {
  }
  get zIndexLocked() {
    return 0;
  }
  set zIndexLocked(value) {
  }
}
__publicField(NodeStruct, "typeId", genTypeId("NODE"));
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "x", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "y", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "width", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "height", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "alpha", null);
__decorate$1([
  structProp("boolean")
], NodeStruct.prototype, "clipping", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "color", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "colorTop", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "colorBottom", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "colorLeft", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "colorRight", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "colorTl", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "colorTr", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "colorBl", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "colorBr", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "scaleX", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "scaleY", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "mount", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "mountX", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "mountY", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "pivot", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "pivotX", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "pivotY", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "rotation", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "parentId", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "zIndex", null);
__decorate$1([
  structProp("number")
], NodeStruct.prototype, "zIndexLocked", null);
class SharedNode extends SharedObject {
  /**
   * Must have lock on sharedNode before calling constructor!
   *
   * @param sharedNodeStruct
   */
  constructor(sharedNodeStruct, extendedCurProps) {
    super(sharedNodeStruct, {
      ...extendedCurProps,
      x: sharedNodeStruct.x,
      y: sharedNodeStruct.y,
      width: sharedNodeStruct.width,
      height: sharedNodeStruct.height,
      alpha: sharedNodeStruct.alpha,
      clipping: sharedNodeStruct.clipping,
      color: sharedNodeStruct.color,
      colorTop: sharedNodeStruct.colorTop,
      colorBottom: sharedNodeStruct.colorBottom,
      colorLeft: sharedNodeStruct.colorLeft,
      colorRight: sharedNodeStruct.colorRight,
      colorTl: sharedNodeStruct.colorTl,
      colorTr: sharedNodeStruct.colorTr,
      colorBl: sharedNodeStruct.colorBl,
      colorBr: sharedNodeStruct.colorBr,
      parentId: sharedNodeStruct.parentId,
      zIndex: sharedNodeStruct.zIndex,
      zIndexLocked: sharedNodeStruct.zIndexLocked,
      scaleX: sharedNodeStruct.scaleX,
      scaleY: sharedNodeStruct.scaleY,
      mount: sharedNodeStruct.mount,
      mountX: sharedNodeStruct.mountX,
      mountY: sharedNodeStruct.mountY,
      pivot: sharedNodeStruct.pivot,
      pivotX: sharedNodeStruct.pivotX,
      pivotY: sharedNodeStruct.pivotY,
      rotation: sharedNodeStruct.rotation
    });
  }
}
class ThreadXMainAnimationController {
  constructor(node, id) {
    __publicField(this, "node");
    __publicField(this, "id");
    __publicField(this, "stoppedPromise", null);
    /**
     * If this is null, then the animation is in a finished / stopped state.
     */
    __publicField(this, "stoppedResolve", null);
    __publicField(this, "state");
    this.node = node;
    this.id = id;
    this.onAnimationFinished = this.onAnimationFinished.bind(this);
    this.state = "stopped";
  }
  start() {
    if (this.stoppedResolve === null) {
      this.makeStoppedPromise();
      this.node.on("animationFinished", this.onAnimationFinished);
    }
    this.state = "running";
    this.node.emit("startAnimation", { id: this.id });
    return this;
  }
  stop() {
    this.node.emit("stopAnimation", { id: this.id });
    this.node.off("animationFinished", this.onAnimationFinished);
    if (this.stoppedResolve !== null) {
      this.stoppedResolve();
      this.stoppedResolve = null;
    }
    this.state = "stopped";
    return this;
  }
  pause() {
    this.node.emit("pauseAnimation", { id: this.id });
    this.state = "paused";
    return this;
  }
  restore() {
    return this;
  }
  waitUntilStopped() {
    this.makeStoppedPromise();
    const promise = this.stoppedPromise;
    assertTruthy$1(promise);
    return promise;
  }
  onAnimationFinished(target, { id, loop }) {
    var _a2;
    if (id === this.id) {
      this.node.off("animationFinished", this.onAnimationFinished);
      (_a2 = this.stoppedResolve) == null ? void 0 : _a2.call(this);
      this.stoppedResolve = null;
      this.state = "stopped";
    }
  }
  makeStoppedPromise() {
    if (this.stoppedResolve === null) {
      this.stoppedPromise = new Promise((resolve) => {
        this.stoppedResolve = resolve;
      });
    }
  }
}
class ThreadXMainNode extends SharedNode {
  constructor(rendererMain, sharedNodeStruct, extendedCurProps) {
    super(sharedNodeStruct, extendedCurProps);
    __publicField(this, "rendererMain");
    __publicField(this, "nextAnimationId", 1);
    __publicField(this, "_parent", null);
    __publicField(this, "_children", []);
    __publicField(this, "_texture", null);
    __publicField(this, "_shader", null);
    __publicField(this, "_src", "");
    /**
     * FinalizationRegistry for animation controllers. When an animation
     * controller is garbage collected, we let the render worker know so that
     * it can remove it's corresponding animation controler from it's stored
     * Set. This should ultimately allow the render worker to garbage collect
     * it's animation controller. The animation itself independent from the animation
     * controller, so it will continue to run until it's finished regardless of
     * whether or not the animation controller is garbage collected.
     */
    __publicField(this, "animationRegistry", new FinalizationRegistry((id) => {
      this.emit("destroyAnimation", { id });
    }));
    this.rendererMain = rendererMain;
  }
  get texture() {
    return this._texture;
  }
  set texture(texture) {
    if (this._texture === texture) {
      return;
    }
    if (this._texture) {
      this.rendererMain.textureTracker.decrementTextureRefCount(this._texture);
    }
    if (texture) {
      this.rendererMain.textureTracker.incrementTextureRefCount(texture);
    }
    this._texture = texture;
    if (texture) {
      this.emit("loadTexture", texture);
    } else {
      this.emit("unloadTexture", {});
    }
  }
  get shader() {
    return this._shader;
  }
  set shader(shader) {
    if (this._shader === shader) {
      return;
    }
    this._shader = shader;
    if (shader) {
      this.emit("loadShader", shader);
    }
  }
  get scale() {
    if (this.scaleX !== this.scaleY) {
      return null;
    }
    return this.scaleX;
  }
  set scale(scale) {
    if (scale === null) {
      return;
    }
    this.scaleX = scale;
    this.scaleY = scale;
  }
  animate(props, settings) {
    const id = this.nextAnimationId++;
    this.emit("createAnimation", { id, props, settings });
    const controller = new ThreadXMainAnimationController(this, id);
    this.animationRegistry.register(controller, id);
    return controller;
  }
  get src() {
    return this._src;
  }
  set src(imageUrl) {
    if (this._src === imageUrl) {
      return;
    }
    this._src = imageUrl;
    if (!imageUrl) {
      this.texture = null;
      return;
    }
    this.texture = this.rendererMain.createTexture("ImageTexture", {
      src: imageUrl
    });
  }
  //#region Parent/Child Props
  get parent() {
    return this._parent;
  }
  set parent(newParent) {
    var _a2;
    const oldParent = this._parent;
    this._parent = newParent;
    this.parentId = (_a2 = newParent == null ? void 0 : newParent.id) != null ? _a2 : 0;
    if (oldParent) {
      const index = oldParent.children.indexOf(this);
      assertTruthy$1(index !== -1, "ThreadXMainNode.parent: Node not found in old parent's children!");
      oldParent.children.splice(index, 1);
    }
    if (newParent) {
      newParent.children.push(this);
    }
  }
  get children() {
    return this._children;
  }
  //#endregion Parent/Child Props
  get props() {
    return this.curProps;
  }
  destroy() {
    super.destroy();
    this.texture = null;
  }
}
var __decorate = globalThis && globalThis.__decorate || function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class TextNodeStruct extends NodeStruct {
  get text() {
    return "";
  }
  set text(value) {
  }
  get textRendererOverride() {
    return null;
  }
  set textRendererOverride(value) {
  }
  get fontSize() {
    return 0;
  }
  set fontSize(value) {
  }
  get fontFamily() {
    return "";
  }
  set fontFamily(value) {
  }
  get fontStretch() {
    return "normal";
  }
  set fontStretch(value) {
  }
  get fontStyle() {
    return "normal";
  }
  set fontStyle(value) {
  }
  get fontWeight() {
    return "normal";
  }
  set fontWeight(value) {
  }
  get textAlign() {
    return "left";
  }
  set textAlign(value) {
  }
  get contain() {
    return "none";
  }
  set contain(value) {
  }
  get scrollable() {
    return false;
  }
  set scrollable(value) {
  }
  get scrollY() {
    return 0;
  }
  set scrollY(value) {
  }
  get offsetY() {
    return 0;
  }
  set offsetY(value) {
  }
  get letterSpacing() {
    return 0;
  }
  set letterSpacing(value) {
  }
  get lineHeight() {
    return 0;
  }
  set lineHeight(value) {
  }
}
__publicField(TextNodeStruct, "typeId", genTypeId("TEXT"));
__decorate([
  structProp("string")
], TextNodeStruct.prototype, "text", null);
__decorate([
  structProp("string", {
    propToBuffer(value) {
      return value != null ? value : "$$null";
    },
    bufferToProp(value) {
      return value === "$$null" ? null : value;
    }
  })
], TextNodeStruct.prototype, "textRendererOverride", null);
__decorate([
  structProp("number")
], TextNodeStruct.prototype, "fontSize", null);
__decorate([
  structProp("string")
], TextNodeStruct.prototype, "fontFamily", null);
__decorate([
  structProp("string")
], TextNodeStruct.prototype, "fontStretch", null);
__decorate([
  structProp("string")
], TextNodeStruct.prototype, "fontStyle", null);
__decorate([
  structProp("string")
], TextNodeStruct.prototype, "fontWeight", null);
__decorate([
  structProp("string")
], TextNodeStruct.prototype, "textAlign", null);
__decorate([
  structProp("string")
], TextNodeStruct.prototype, "contain", null);
__decorate([
  structProp("boolean")
], TextNodeStruct.prototype, "scrollable", null);
__decorate([
  structProp("number")
], TextNodeStruct.prototype, "scrollY", null);
__decorate([
  structProp("number")
], TextNodeStruct.prototype, "offsetY", null);
__decorate([
  structProp("number")
], TextNodeStruct.prototype, "letterSpacing", null);
__decorate([
  structProp("number")
], TextNodeStruct.prototype, "lineHeight", null);
class ThreadXMainTextNode extends ThreadXMainNode {
  constructor(rendererMain, sharedNodeStruct) {
    super(rendererMain, sharedNodeStruct, {
      text: sharedNodeStruct.text,
      textRendererOverride: sharedNodeStruct.textRendererOverride,
      fontSize: sharedNodeStruct.fontSize,
      fontFamily: sharedNodeStruct.fontFamily,
      fontStretch: sharedNodeStruct.fontStretch,
      fontStyle: sharedNodeStruct.fontStyle,
      fontWeight: sharedNodeStruct.fontWeight,
      lineHeight: sharedNodeStruct.lineHeight,
      contain: sharedNodeStruct.contain,
      letterSpacing: sharedNodeStruct.letterSpacing,
      offsetY: sharedNodeStruct.offsetY,
      scrollable: sharedNodeStruct.scrollable,
      scrollY: sharedNodeStruct.scrollY,
      textAlign: sharedNodeStruct.textAlign
    });
    __publicField(this, "_debug", {});
  }
  get debug() {
    return this._debug;
  }
  set debug(debug) {
    if (this._debug === debug) {
      return;
    }
    this._debug = debug;
    this.emit("debug", debug);
  }
}
class ThreadXCoreDriver {
  constructor(settings) {
    __publicField(this, "settings");
    __publicField(this, "threadx");
    __publicField(this, "rendererMain", null);
    __publicField(this, "root", null);
    this.settings = settings;
    this.threadx = ThreadX.init({
      workerId: 1,
      workerName: "main",
      sharedObjectFactory: (buffer) => {
        const typeId = BufferStruct.extractTypeId(buffer);
        const rendererMain = this.rendererMain;
        assertTruthy$1(rendererMain);
        if (typeId === NodeStruct.typeId) {
          const nodeStruct = new NodeStruct(buffer);
          return nodeStruct.lock(() => {
            return new ThreadXMainNode(rendererMain, nodeStruct);
          });
        } else if (typeId === TextNodeStruct.typeId) {
          const nodeStruct = new TextNodeStruct(buffer);
          return nodeStruct.lock(() => {
            return new ThreadXMainTextNode(rendererMain, nodeStruct);
          });
        }
        return null;
      }
    });
    this.threadx.registerWorker("renderer", new Worker(this.settings.coreWorkerUrl, { type: "module" }));
  }
  async init(rendererMain, rendererSettings, canvas) {
    this.rendererMain = rendererMain;
    const offscreenCanvas = canvas.transferControlToOffscreen();
    const rootNodeId = await this.threadx.sendMessageAsync("renderer", {
      type: "init",
      canvas: offscreenCanvas,
      appWidth: rendererSettings.appWidth,
      appHeight: rendererSettings.appHeight,
      deviceLogicalPixelRatio: rendererSettings.deviceLogicalPixelRatio,
      devicePhysicalPixelRatio: rendererSettings.devicePhysicalPixelRatio,
      clearColor: rendererSettings.clearColor,
      coreExtensionModule: rendererSettings.coreExtensionModule
    }, [offscreenCanvas]);
    const rootNode = this.threadx.getSharedObjectById(rootNodeId);
    assertTruthy$1(rootNode instanceof ThreadXMainNode, "Unexpected root node type");
    this.root = rootNode;
  }
  getRootNode() {
    assertTruthy$1(this.root, "Driver not initialized");
    return this.root;
  }
  createNode(props) {
    var _a2, _b, _c;
    const rendererMain = this.rendererMain;
    assertTruthy$1(rendererMain);
    const bufferStruct = new NodeStruct();
    Object.assign(bufferStruct, {
      // Node specific properties
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      parentId: props.parent ? props.parent.id : 0,
      clipping: props.clipping,
      color: props.color,
      colorTop: props.colorTop,
      colorRight: props.colorBottom,
      colorBottom: props.colorBottom,
      colorLeft: props.colorLeft,
      colorTl: props.colorTl,
      colorTr: props.colorTr,
      colorBl: props.colorBl,
      colorBr: props.colorBr,
      alpha: props.alpha,
      zIndex: props.zIndex,
      zIndexLocked: props.zIndexLocked,
      scaleX: props.scaleX,
      scaleY: props.scaleY,
      mount: props.mount,
      mountX: props.mountX,
      mountY: props.mountY,
      pivot: props.pivot,
      pivotX: props.pivotX,
      pivotY: props.pivotY,
      rotation: props.rotation
    });
    const node = new ThreadXMainNode(rendererMain, bufferStruct);
    node.once("beforeDestroy", this.onBeforeDestroyNode.bind(this, node));
    this.threadx.shareObjects("renderer", [node]).catch(console.error);
    node.shader = (_a2 = props.shader) != null ? _a2 : null;
    node.texture = (_b = props.texture) != null ? _b : null;
    node.src = (_c = props.src) != null ? _c : "";
    this.onCreateNode(node);
    return node;
  }
  createTextNode(props) {
    var _a2, _b, _c, _d;
    const rendererMain = this.rendererMain;
    assertTruthy$1(rendererMain);
    const bufferStruct = new TextNodeStruct();
    Object.assign(bufferStruct, {
      // Node specific properties
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      parentId: props.parent ? props.parent.id : 0,
      clipping: props.clipping,
      color: props.color,
      colorTop: props.colorTop,
      colorRight: props.colorBottom,
      colorBottom: props.colorBottom,
      colorLeft: props.colorLeft,
      colorTl: props.colorTl,
      colorTr: props.colorTr,
      colorBl: props.colorBl,
      colorBr: props.colorBr,
      alpha: props.alpha,
      zIndex: props.zIndex,
      zIndexLocked: props.zIndexLocked,
      scaleX: props.scaleX,
      scaleY: props.scaleY,
      mount: props.mount,
      mountX: props.mountX,
      mountY: props.mountY,
      pivot: props.pivot,
      pivotX: props.pivotX,
      pivotY: props.pivotY,
      rotation: props.rotation,
      // Text specific properties
      text: props.text,
      textRendererOverride: props.textRendererOverride,
      fontSize: props.fontSize,
      fontFamily: props.fontFamily,
      fontWeight: props.fontWeight,
      fontStretch: props.fontStretch,
      fontStyle: props.fontStyle,
      lineHeight: props.lineHeight,
      contain: props.contain,
      letterSpacing: props.letterSpacing,
      offsetY: props.offsetY,
      textAlign: props.textAlign,
      scrollable: props.scrollable,
      scrollY: props.scrollY
    });
    const node = new ThreadXMainTextNode(rendererMain, bufferStruct);
    node.once("beforeDestroy", this.onBeforeDestroyNode.bind(this, node));
    this.threadx.shareObjects("renderer", [node]).catch(console.error);
    node.shader = (_a2 = props.shader) != null ? _a2 : null;
    node.texture = (_b = props.texture) != null ? _b : null;
    node.src = (_c = props.src) != null ? _c : "";
    node.debug = (_d = props.debug) != null ? _d : {};
    this.onCreateNode(node);
    return node;
  }
  // TODO: Remove?
  destroyNode(node) {
    node.destroy();
  }
  releaseTexture(textureDescId) {
    this.threadx.sendMessage("renderer", {
      type: "releaseTexture",
      textureDescId
    });
  }
  onCreateNode(node) {
    return;
  }
  onBeforeDestroyNode(node) {
    return;
  }
}
const coreWorkerUrl = new URL("CoreWorker-4ed993c7.js", import.meta.url).href;
const coreExtensionModuleUrl = new URL("AppCoreExtension-815ec09d.js", import.meta.url).href;
const getTestPath = (testName) => `./tests/${testName}.ts`;
const testRegex = /\/tests\/(.*)\.ts$/;
const getTestName = (path) => {
  const match = path.match(testRegex);
  if (!match) {
    throw new Error(`Invalid test path: ${path}`);
  }
  return match[1];
};
const testModules = /* @__PURE__ */ Object.assign({ "./tests/alpha-blending.ts": () => __vitePreload(() => import("./alpha-blending-1bb84e74.js"), true ? ["assets/alpha-blending-1bb84e74.js","assets/robot-53414b9d.js","assets/rocko-f986afff.js","assets/LocalStorage-f60767e1.js","assets/CoreExtension-34643308.js"] : void 0), "./tests/alpha.ts": () => __vitePreload(() => import("./alpha-88c90e6a.js"), true ? [] : void 0), "./tests/animation.ts": () => __vitePreload(() => import("./animation-c6328d91.js"), true ? [] : void 0), "./tests/child-positioning.ts": () => __vitePreload(() => import("./child-positioning-298d7e1c.js"), true ? [] : void 0), "./tests/clipping.ts": () => __vitePreload(() => import("./clipping-4beb1e91.js"), true ? ["assets/clipping-4beb1e91.js","assets/utils-4cd19c14.js","assets/CoreExtension-34643308.js","assets/PageContainer-151b4d5b.js","assets/LocalStorage-f60767e1.js","assets/robot-53414b9d.js"] : void 0), "./tests/ds-effect-radial-progress.ts": () => __vitePreload(() => import("./ds-effect-radial-progress-51258c64.js"), true ? [] : void 0), "./tests/dynamic-shader.ts": () => __vitePreload(() => import("./dynamic-shader-3afc6e4a.js"), true ? [] : void 0), "./tests/gradient.ts": () => __vitePreload(() => import("./gradient-36f17a25.js"), true ? [] : void 0), "./tests/mount-pivot.ts": () => __vitePreload(() => import("./mount-pivot-d9625cea.js"), true ? [] : void 0), "./tests/robot.ts": () => __vitePreload(() => import("./robot-a17d98e3.js"), true ? ["assets/robot-a17d98e3.js","assets/robot-53414b9d.js"] : void 0), "./tests/rotation.ts": () => __vitePreload(() => import("./rotation-74cbf435.js"), true ? [] : void 0), "./tests/scaling-animations.ts": () => __vitePreload(() => import("./scaling-animations-d7579338.js"), true ? [] : void 0), "./tests/scaling.ts": () => __vitePreload(() => import("./scaling-f542fcb2.js"), true ? ["assets/scaling-f542fcb2.js","assets/utils-4cd19c14.js","assets/CoreExtension-34643308.js","assets/PageContainer-151b4d5b.js","assets/LocalStorage-f60767e1.js","assets/constructTestRow-f5b297cf.js","assets/robot-53414b9d.js"] : void 0), "./tests/test.ts": () => __vitePreload(() => import("./test-92a405df.js"), true ? ["assets/test-92a405df.js","assets/rocko-f986afff.js","assets/spritemap-5738692a.js","assets/CoreExtension-34643308.js"] : void 0), "./tests/text-alpha.ts": () => __vitePreload(() => import("./text-alpha-46a8d409.js"), true ? ["assets/text-alpha-46a8d409.js","assets/utils-4cd19c14.js","assets/CoreExtension-34643308.js","assets/PageContainer-151b4d5b.js","assets/LocalStorage-f60767e1.js","assets/constructTestRow-f5b297cf.js"] : void 0), "./tests/text-events.ts": () => __vitePreload(() => import("./text-events-4553950a.js"), true ? ["assets/text-events-4553950a.js","assets/CoreExtension-34643308.js"] : void 0), "./tests/text-offscreen-move.ts": () => __vitePreload(() => import("./text-offscreen-move-eb2c6aa6.js"), true ? ["assets/text-offscreen-move-eb2c6aa6.js","assets/PageContainer-151b4d5b.js","assets/LocalStorage-f60767e1.js"] : void 0), "./tests/text-rotation.ts": () => __vitePreload(() => import("./text-rotation-927133c2.js"), true ? ["assets/text-rotation-927133c2.js","assets/utils-4cd19c14.js","assets/CoreExtension-34643308.js","assets/PageContainer-151b4d5b.js","assets/LocalStorage-f60767e1.js","assets/constructTestRow-f5b297cf.js"] : void 0), "./tests/text-scaling.ts": () => __vitePreload(() => import("./text-scaling-90394712.js"), true ? ["assets/text-scaling-90394712.js","assets/utils-4cd19c14.js","assets/CoreExtension-34643308.js","assets/PageContainer-151b4d5b.js","assets/LocalStorage-f60767e1.js","assets/constructTestRow-f5b297cf.js"] : void 0), "./tests/text.ts": () => __vitePreload(() => import("./text-10a51829.js"), true ? ["assets/text-10a51829.js","assets/LocalStorage-f60767e1.js"] : void 0), "./tests/texture-memory-stress.ts": () => __vitePreload(() => import("./texture-memory-stress-16164442.js"), true ? [] : void 0), "./tests/textures.ts": () => __vitePreload(() => import("./textures-c525fe9d.js"), true ? ["assets/textures-c525fe9d.js","assets/rocko-f986afff.js","assets/spritemap-5738692a.js"] : void 0), "./tests/zIndex.ts": () => __vitePreload(() => import("./zIndex-36de53bc.js"), true ? [] : void 0) });
(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const automation = urlParams.get("automation") === "true";
  const test = urlParams.get("test") || (automation ? null : "test");
  const showOverlay = urlParams.get("overlay") !== "false";
  let driverName = urlParams.get("driver");
  if (driverName !== "main" && driverName !== "threadx") {
    driverName = "main";
  }
  if (test) {
    await runTest(test, driverName, urlParams, showOverlay);
    return;
  }
  assertTruthy$1(automation);
  await runAutomation(driverName);
})().catch((err) => {
  console.error(err);
});
async function runTest(test, driverName, urlParams, showOverlay) {
  const testModule = testModules[getTestPath(test)];
  if (!testModule) {
    throw new Error(`Test "${test}" not found`);
  }
  const module = await testModule();
  const customSettings = typeof module.customSettings === "function" ? module.customSettings(urlParams) : {};
  const { renderer, appElement } = await initRenderer(
    driverName,
    customSettings
  );
  if (showOverlay) {
    const overlayText = renderer.createTextNode({
      color: 4278190335,
      text: `Test: ${test} | Driver: ${driverName}`,
      zIndex: 99999,
      parent: renderer.root,
      fontSize: 50
    });
    overlayText.once(
      "loaded",
      (target, { dimensions }) => {
        overlayText.x = renderer.settings.appWidth - dimensions.width - 20;
        overlayText.y = renderer.settings.appHeight - dimensions.height - 20;
      }
    );
  }
  const exampleSettings = {
    testName: test,
    renderer,
    driverName,
    appElement,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    testRoot: renderer.root,
    automation: false,
    snapshot: async () => {
    }
  };
  await module.default(exampleSettings);
}
async function initRenderer(driverName, customSettings) {
  let driver = null;
  if (driverName === "main") {
    driver = new MainCoreDriver();
  } else {
    driver = new ThreadXCoreDriver({
      coreWorkerUrl
    });
  }
  const renderer = new RendererMain(
    {
      appWidth: 1920,
      appHeight: 1080,
      deviceLogicalPixelRatio: 0.6666667,
      devicePhysicalPixelRatio: 1,
      clearColor: 0,
      coreExtensionModule: coreExtensionModuleUrl,
      ...customSettings
    },
    "app",
    driver
  );
  await renderer.init();
  const appElement = document.querySelector("#app");
  assertTruthy$1(appElement instanceof HTMLDivElement);
  return { renderer, appElement };
}
async function runAutomation(driverName) {
  const { renderer, appElement } = await initRenderer(driverName);
  for (const testPath in testModules) {
    const testModule = testModules[testPath];
    const testName = getTestName(testPath);
    assertTruthy$1(testModule);
    const { automation, customSettings } = await testModule();
    console.log(`Attempting to run automation for ${testName}...`);
    if (automation) {
      console.log(`Running automation for ${testName}...`);
      if (customSettings) {
        console.error("customSettings not supported for automation");
      } else {
        const testRoot = renderer.createNode({
          parent: renderer.root,
          color: 0
        });
        const exampleSettings = {
          testName,
          renderer,
          testRoot,
          driverName,
          appElement,
          automation: true,
          snapshot: async () => {
            const snapshot = window.snapshot;
            if (snapshot) {
              console.error(`Calling snapshot(${testName})`);
              await snapshot(testName);
            } else {
              console.error(
                "snapshot() not defined (not running in playwright?)"
              );
            }
          }
        };
        await automation(exampleSettings);
        testRoot.parent = null;
        testRoot.destroy();
      }
    }
  }
  const doneTests = window.doneTests;
  if (doneTests) {
    console.error("Calling doneTests()");
    await doneTests();
  } else {
    console.error("doneTests() not defined (not running in playwright?)");
  }
}
//# sourceMappingURL=index-a24d8497.js.map
