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
import { ManualCountTextureUsageTracker, } from './texture-usage-trackers/ManualCountTextureUsageTracker.js';
import { FinalizationRegistryTextureUsageTracker } from './texture-usage-trackers/FinalizationRegistryTextureUsageTracker.js';
/**
 * The Renderer Main API
 *
 * @remarks
 * This is the primary class used to configure and operate the Renderer.
 *
 * It is used to create and destroy Nodes, as well as Texture and Shader
 * references.
 *
 * Example:
 * ```ts
 * import { RendererMain, MainRenderDriver } from '@lightningjs/renderer';
 *
 * // Initialize the Renderer
 * const renderer = new RendererMain(
 *   {
 *     appWidth: 1920,
 *     appHeight: 1080
 *   },
 *   'app',
 *   new MainRenderDriver(),
 * );
 * ```
 */
export class RendererMain {
    root = null;
    driver;
    canvas;
    settings;
    nodes = new Map();
    nextTextureId = 1;
    /**
     * Texture Usage Tracker for Usage Based Texture Garbage Collection
     *
     * @remarks
     * For internal use only. DO NOT ACCESS.
     */
    textureTracker;
    /**
     * Constructs a new Renderer instance
     *
     * @param settings Renderer settings
     * @param target Element ID or HTMLElement to insert the canvas into
     * @param driver Core Driver to use
     */
    constructor(settings, target, driver) {
        const resolvedSettings = {
            appWidth: settings.appWidth || 1920,
            appHeight: settings.appHeight || 1080,
            deviceLogicalPixelRatio: settings.deviceLogicalPixelRatio || 1,
            devicePhysicalPixelRatio: settings.devicePhysicalPixelRatio || window.devicePixelRatio,
            clearColor: settings.clearColor ?? 0x00000000,
            coreExtensionModule: settings.coreExtensionModule || null,
            experimental_FinalizationRegistryTextureUsageTracker: settings.experimental_FinalizationRegistryTextureUsageTracker ?? false,
            textureCleanupOptions: settings.textureCleanupOptions || {},
        };
        this.settings = resolvedSettings;
        const { appWidth, appHeight, deviceLogicalPixelRatio, devicePhysicalPixelRatio, } = resolvedSettings;
        const releaseCallback = (textureId) => {
            this.driver.releaseTexture(textureId);
        };
        const useFinalizationRegistryTracker = resolvedSettings.experimental_FinalizationRegistryTextureUsageTracker &&
            typeof FinalizationRegistry === 'function';
        this.textureTracker = useFinalizationRegistryTracker
            ? new FinalizationRegistryTextureUsageTracker(releaseCallback)
            : new ManualCountTextureUsageTracker(releaseCallback, this.settings.textureCleanupOptions);
        const deviceLogicalWidth = appWidth * deviceLogicalPixelRatio;
        const deviceLogicalHeight = appHeight * deviceLogicalPixelRatio;
        this.driver = driver;
        const canvas = document.createElement('canvas');
        this.canvas = canvas;
        canvas.width = deviceLogicalWidth * devicePhysicalPixelRatio;
        canvas.height = deviceLogicalHeight * devicePhysicalPixelRatio;
        canvas.style.width = `${deviceLogicalWidth}px`;
        canvas.style.height = `${deviceLogicalHeight}px`;
        let targetEl;
        if (typeof target === 'string') {
            targetEl = document.getElementById(target);
        }
        else {
            targetEl = target;
        }
        if (!targetEl) {
            throw new Error('Could not find target element');
        }
        // Hook up the driver's callbacks
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
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
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
        const data = {
            ...this.resolveNodeDefaults(props),
            text: props.text ?? '',
            textRendererOverride: props.textRendererOverride ?? null,
            fontSize: props.fontSize ?? 16,
            fontFamily: props.fontFamily ?? 'sans-serif',
            fontStyle: props.fontStyle ?? 'normal',
            fontWeight: props.fontWeight ?? 'normal',
            fontStretch: props.fontStretch ?? 'normal',
            textAlign: props.textAlign ?? 'left',
            contain: props.contain ?? 'none',
            scrollable: props.scrollable ?? false,
            scrollY: props.scrollY ?? 0,
            offsetY: props.offsetY ?? 0,
            letterSpacing: props.letterSpacing ?? 0,
            lineHeight: props.lineHeight ?? 0,
            maxLines: props.maxLines ?? 0,
            maxLinesSuffix: props.maxLinesSuffix ?? '',
            textOverflow: props.textOverflow ?? 'ellipsis',
            verticalAlign: props.verticalAlign ?? 'middle',
            textBaseline: props.textBaseline ?? 'alphabetic',
            debug: props.debug ?? {},
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
        const color = props.color ?? 0xffffffff;
        const colorTl = props.colorTl ?? props.colorTop ?? props.colorLeft ?? color;
        const colorTr = props.colorTr ?? props.colorTop ?? props.colorRight ?? color;
        const colorBl = props.colorBl ?? props.colorBottom ?? props.colorLeft ?? color;
        const colorBr = props.colorBr ?? props.colorBottom ?? props.colorRight ?? color;
        return {
            x: props.x ?? 0,
            y: props.y ?? 0,
            width: props.width ?? 0,
            height: props.height ?? 0,
            alpha: props.alpha ?? 1,
            clipping: props.clipping ?? false,
            color,
            colorTop: props.colorTop ?? color,
            colorBottom: props.colorBottom ?? color,
            colorLeft: props.colorLeft ?? color,
            colorRight: props.colorRight ?? color,
            colorBl,
            colorBr,
            colorTl,
            colorTr,
            zIndex: props.zIndex ?? 0,
            zIndexLocked: props.zIndexLocked ?? 0,
            parent: props.parent ?? null,
            texture: props.texture ?? null,
            shader: props.shader ?? null,
            // Since setting the `src` will trigger a texture load, we need to set it after
            // we set the texture. Otherwise, problems happen.
            src: props.src ?? '',
            scale: props.scale ?? null,
            scaleX: props.scaleX ?? props.scale ?? 1,
            scaleY: props.scaleY ?? props.scale ?? 1,
            mount: props.mount ?? 0,
            mountX: props.mountX ?? props.mount ?? 0,
            mountY: props.mountY ?? props.mount ?? 0,
            pivot: props.pivot ?? 0.5,
            pivotX: props.pivotX ?? props.pivot ?? 0.5,
            pivotY: props.pivotY ?? props.pivot ?? 0.5,
            rotation: props.rotation ?? 0,
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
            descType: 'texture',
            txType: textureType,
            props,
            options: {
                ...options,
                // This ID is used to identify the texture in the CoreTextureManager's
                // ID Texture Map cache.
                id,
            },
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
            descType: 'shader',
            shType: shaderType,
            props: props,
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
        throw new Error('Not implemented');
    }
    advanceFrame() {
        throw new Error('Not implemented');
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
        throw new Error('Not implemented');
    }
}
//# sourceMappingURL=RendererMain.js.map