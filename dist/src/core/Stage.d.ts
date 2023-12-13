import { WebGlCoreRenderer } from './renderers/webgl/WebGlCoreRenderer.js';
import { AnimationManager } from './animations/AnimationManager.js';
import { CoreNode } from './CoreNode.js';
import { CoreTextureManager } from './CoreTextureManager.js';
import { TrFontManager } from './text-rendering/TrFontManager.js';
import { CoreShaderManager } from './CoreShaderManager.js';
import type { TextRenderer, TextRendererMap, TrProps } from './text-rendering/renderers/TextRenderer.js';
import { type Rect } from './lib/utils.js';
export interface StageOptions {
    rootId: number;
    appWidth: number;
    appHeight: number;
    deviceLogicalPixelRatio: number;
    devicePhysicalPixelRatio: number;
    canvas: HTMLCanvasElement | OffscreenCanvas;
    clearColor: number;
    debug?: {
        monitorTextureCache?: boolean;
    };
}
export declare class Stage {
    readonly options: StageOptions;
    readonly animationManager: AnimationManager;
    readonly txManager: CoreTextureManager;
    readonly fontManager: TrFontManager;
    readonly textRenderers: Partial<TextRendererMap>;
    readonly shManager: CoreShaderManager;
    readonly renderer: WebGlCoreRenderer;
    private scene;
    deltaTime: number;
    lastFrameTime: number;
    currentFrameTime: number;
    /**
     * Stage constructor
     */
    constructor(options: StageOptions);
    /**
     * Start a new frame draw
     */
    drawFrame(): void;
    addQuads(node: CoreNode, parentClippingRect?: Rect | null): void;
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
    resolveTextRenderer(trProps: TrProps, textRendererOverride?: keyof TextRendererMap | null): TextRenderer;
    get root(): CoreNode;
}
