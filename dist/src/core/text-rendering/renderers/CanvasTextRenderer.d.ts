import type { Stage } from '../../Stage.js';
import type { Matrix3d } from '../../lib/Matrix3d.js';
import { type Bound, type Rect } from '../../lib/utils.js';
import type { ImageTexture } from '../../textures/ImageTexture.js';
import type { TrFontFace } from '../font-face-types/TrFontFace.js';
import { LightningTextTextureRenderer, type RenderInfo } from './LightningTextTextureRenderer.js';
import { TextRenderer, type TextRendererState, type TrFontProps, type TrPropSetters, type TrProps } from './TextRenderer.js';
declare module './TextRenderer.js' {
    interface TextRendererMap {
        canvas: CanvasTextRenderer;
    }
}
interface CanvasPageInfo {
    texture: ImageTexture | undefined;
    lineNumStart: number;
    lineNumEnd: number;
    valid: boolean;
}
export interface CanvasTextRendererState extends TextRendererState {
    props: TrProps;
    fontFaceLoadedHandler: (() => void) | undefined;
    fontInfo: {
        cssString: string;
        loaded: boolean;
    } | undefined;
    canvasPages: [CanvasPageInfo, CanvasPageInfo, CanvasPageInfo] | undefined;
    lightning2TextRenderer: LightningTextTextureRenderer;
    renderInfo: RenderInfo | undefined;
    renderWindow: Bound | undefined;
}
export declare class CanvasTextRenderer extends TextRenderer<CanvasTextRendererState> {
    protected canvas: OffscreenCanvas | HTMLCanvasElement;
    protected context: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;
    constructor(stage: Stage);
    getPropertySetters(): Partial<TrPropSetters<CanvasTextRendererState>>;
    canRenderFont(props: TrFontProps): boolean;
    isFontFaceSupported(fontFace: TrFontFace): boolean;
    addFontFace(fontFace: TrFontFace): void;
    createState(props: TrProps): CanvasTextRendererState;
    updateState(state: CanvasTextRendererState): void;
    renderQuads(state: CanvasTextRendererState, transform: Matrix3d, clippingRect: Rect | null, alpha: number): void;
    private markForReload;
    private onFontLoaded;
    private onFontLoadError;
}
export {};
