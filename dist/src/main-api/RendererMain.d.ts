import type { ShaderMap } from '../core/CoreShaderManager.js';
import type { ExtractProps, TextureMap, TextureOptions } from '../core/CoreTextureManager.js';
import type { INode, INodeWritableProps, ITextNode, ITextNodeWritableProps } from './INode.js';
import type { IRenderDriver } from './IRenderDriver.js';
import { type ManualCountTextureUsageTrackerOptions } from './texture-usage-trackers/ManualCountTextureUsageTracker.js';
import type { TextureUsageTracker } from './texture-usage-trackers/TextureUsageTracker.js';
/**
 * An immutable reference to a specific Texture type
 *
 * @remarks
 * See {@link TextureRef} for more details.
 */
export interface SpecificTextureRef<TxType extends keyof TextureMap> {
    readonly descType: 'texture';
    readonly txType: TxType;
    readonly props: ExtractProps<TextureMap[TxType]>;
    readonly options?: Readonly<TextureOptions>;
}
type MapTextureRefs<TxType extends keyof TextureMap> = TxType extends keyof TextureMap ? SpecificTextureRef<TxType> : never;
/**
 * An immutable reference to a Texture
 *
 * @remarks
 * This structure should only be created by the RendererMain's `createTexture`
 * method. The structure is immutable and should not be modified once created.
 *
 * A `TextureRef` exists in the Main API Space and is used to point to an actual
 * `Texture` instance in the Core API Space. The `TextureRef` is used to
 * communicate with the Core API Space to create, load, and destroy the
 * `Texture` instance.
 *
 * This type is technically a discriminated union of all possible texture types.
 * If you'd like to represent a specific texture type, you can use the
 * `SpecificTextureRef` generic type.
 */
export type TextureRef = MapTextureRefs<keyof TextureMap>;
/**
 * An immutable reference to a specific Shader type
 *
 * @remarks
 * See {@link ShaderRef} for more details.
 */
export interface SpecificShaderRef<ShType extends keyof ShaderMap> {
    readonly descType: 'shader';
    readonly shType: ShType;
    readonly props: ExtractProps<ShaderMap[ShType]>;
}
type MapShaderRefs<ShType extends keyof ShaderMap> = ShType extends keyof ShaderMap ? SpecificShaderRef<ShType> : never;
/**
 * An immutable reference to a Shader
 *
 * @remarks
 * This structure should only be created by the RendererMain's `createShader`
 * method. The structure is immutable and should not be modified once created.
 *
 * A `ShaderRef` exists in the Main API Space and is used to point to an actual
 * `Shader` instance in the Core API Space. The `ShaderRef` is used to
 * communicate with the Core API Space to create, load, and destroy the
 * `Shader` instance.
 *
 * This type is technically a discriminated union of all possible shader types.
 * If you'd like to represent a specific shader type, you can use the
 * `SpecificShaderRef` generic type.
 */
export type ShaderRef = MapShaderRefs<keyof ShaderMap>;
/**
 * Configuration settings for {@link RendererMain}
 */
export interface RendererMainSettings {
    /**
     * Authored logical pixel width of the application
     *
     * @defaultValue `1920`
     */
    appWidth?: number;
    /**
     * Authored logical pixel height of the application
     *
     * @defaultValue `1080`
     */
    appHeight?: number;
    /**
     * Factor to convert app-authored logical coorindates to device logical coordinates
     *
     * @remarks
     * This value allows auto-scaling to support larger/small resolutions than the
     * app was authored for.
     *
     * If the app was authored for 1920x1080 and this value is 2, the app's canvas
     * will be rendered at 3840x2160 logical pixels.
     *
     * Likewise, if the app was authored for 1920x1080 and this value is 0.66667,
     * the app's canvas will be rendered at 1280x720 logical pixels.
     *
     * @defaultValue `1`
     */
    deviceLogicalPixelRatio?: number;
    /**
     * Factor to convert device logical coordinates to device physical coordinates
     *
     * @remarks
     * This value allows auto-scaling to support devices with different pixel densities.
     *
     * This controls the number of physical pixels that are used to render each logical
     * pixel. For example, if the device has a pixel density of 2, each logical pixel
     * will be rendered using 2x2 physical pixels.
     *
     * By default, it will be set to `window.devicePixelRatio` which is the pixel
     * density of the device the app is running on reported by the browser.
     *
     * @defaultValue `window.devicePixelRatio`
     */
    devicePhysicalPixelRatio?: number;
    /**
     * RGBA encoded number of the background to use
     *
     * @defaultValue `0x00000000`
     */
    clearColor?: number;
    /**
     * Path to a custom core module to use
     *
     * @defaultValue `null`
     */
    coreExtensionModule?: string | null;
    /**
     * Enable experimental FinalizationRegistry-based texture usage tracking
     * for texture garbage collection
     *
     * @remarks
     * By default, the Renderer uses a manual reference counting system to track
     * texture usage. Textures are eventually released from the Core Texture
     * Manager's Usage Cache when they are no longer referenced by any Nodes (or
     * SubTextures that are referenced by nodes). This works well enough, but has
     * the consequence of textures being removed from Usage Cache even if their
     * references are still alive in memory. This can require a texture to be
     * reloaded from the source when it is used again after being removed from
     * cache.
     *
     * This is an experimental feature that uses a FinalizationRegistry to track
     * texture usage. This causes textures to be removed from the Usage Cache only
     * when their references are no longer alive in memory. Meaning a loaded texture
     * will remain in the Usage Cache until it's reference is garbage collected.
     *
     * This feature is not enabled by default because browser support for the
     * FinalizationRegistry is limited. It should NOT be enabled in production apps
     * as this behavior is not guaranteed to be supported in the future. Developer
     * feedback on this feature, however, is welcome.
     *
     * @defaultValue `false`
     */
    experimental_FinalizationRegistryTextureUsageTracker?: boolean;
    textureCleanupOptions?: ManualCountTextureUsageTrackerOptions;
}
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
export declare class RendererMain {
    readonly root: INode | null;
    readonly driver: IRenderDriver;
    readonly canvas: HTMLCanvasElement;
    readonly settings: Readonly<Required<RendererMainSettings>>;
    private nodes;
    private nextTextureId;
    /**
     * Texture Usage Tracker for Usage Based Texture Garbage Collection
     *
     * @remarks
     * For internal use only. DO NOT ACCESS.
     */
    textureTracker: TextureUsageTracker;
    /**
     * Constructs a new Renderer instance
     *
     * @param settings Renderer settings
     * @param target Element ID or HTMLElement to insert the canvas into
     * @param driver Core Driver to use
     */
    constructor(settings: RendererMainSettings, target: string | HTMLElement, driver: IRenderDriver);
    /**
     * Initialize the renderer
     *
     * @remarks
     * This method must be called and resolved asyncronously before any other
     * methods are called.
     */
    init(): Promise<void>;
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
    createNode(props: Partial<INodeWritableProps>): INode;
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
    createTextNode(props: Partial<ITextNodeWritableProps>): ITextNode;
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
    resolveNodeDefaults(props: Partial<INodeWritableProps>): INodeWritableProps;
    /**
     * Destroy a node
     *
     * @remarks
     * This method destroys a node but does not destroy its children.
     *
     * @param node
     * @returns
     */
    destroyNode(node: INode): void;
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
    createTexture<TxType extends keyof TextureMap>(textureType: TxType, props: SpecificTextureRef<TxType>['props'], options?: TextureOptions): SpecificTextureRef<TxType>;
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
    createShader<ShType extends keyof ShaderMap>(shaderType: ShType, props?: SpecificShaderRef<ShType>['props']): SpecificShaderRef<ShType>;
    /**
     * Get a Node by its ID
     *
     * @param id
     * @returns
     */
    getNodeById(id: number): INode | null;
    toggleFreeze(): void;
    advanceFrame(): void;
    /**
     * Re-render the current frame without advancing any running animations.
     *
     * @remarks
     * Any state changes will be reflected in the re-rendered frame. Useful for
     * debugging.
     *
     * May not do anything if the render loop is running on a separate worker.
     */
    rerender(): void;
}
export {};
