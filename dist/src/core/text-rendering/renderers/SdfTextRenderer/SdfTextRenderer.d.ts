import { type Bound, type Rect } from '../../../lib/utils.js';
import { TextRenderer, type TrProps, type TextRendererState, type TrFontProps, type TrPropSetters } from '../TextRenderer.js';
import { SdfTrFontFace } from '../../font-face-types/SdfTrFontFace/SdfTrFontFace.js';
import type { TrFontFace } from '../../font-face-types/TrFontFace.js';
import type { Stage } from '../../../Stage.js';
import { BufferCollection } from '../../../renderers/webgl/internal/BufferCollection.js';
import type { Matrix3d } from '../../../lib/Matrix3d.js';
declare module '../TextRenderer.js' {
    interface TextRendererMap {
        sdf: SdfTextRenderer;
    }
    interface TextRendererDebugProps {
        sdfShaderDebug: boolean;
    }
}
export interface LineCacheItem {
    codepointIndex: number;
    maxY: number;
    maxX: number;
}
export interface SdfTextRendererState extends TextRendererState {
    /**
     * Cache for layout resume points indexed by the `curY` for each line
     * in the render sequence.
     *
     * Allows faster rendering by skipping parts of the layout loop that are
     * outside of the renderWindow.
     */
    lineCache: LineCacheItem[];
    renderWindow: Bound | undefined;
    bufferNumFloats: number;
    bufferNumQuads: number;
    vertexBuffer: Float32Array | undefined;
    webGlBuffers: BufferCollection | null;
    bufferUploaded: boolean;
    distanceRange: number;
    trFontFace: SdfTrFontFace | undefined;
}
/**
 * Singleton class for rendering text using signed distance fields.
 *
 * @remarks
 * SdfTextRenderer supports both single-channel and multi-channel signed distance fields.
 */
export declare class SdfTextRenderer extends TextRenderer<SdfTextRendererState> {
    /**
     * Map of font family names to a set of font faces.
     */
    private ssdfFontFamilies;
    private msdfFontFamilies;
    private sdfShader;
    constructor(stage: Stage);
    getPropertySetters(): Partial<TrPropSetters<SdfTextRendererState>>;
    canRenderFont(props: TrFontProps): boolean;
    isFontFaceSupported(fontFace: TrFontFace): boolean;
    addFontFace(fontFace: TrFontFace): void;
    createState(props: TrProps): SdfTextRendererState;
    updateState(state: SdfTextRendererState): void;
    renderQuads(state: SdfTextRendererState, transform: Matrix3d, clippingRect: Rect | null, alpha: number): void;
    resolveFontFace(props: TrFontProps): SdfTrFontFace | undefined;
    /**
     * Invalidate the cache stored in the state. This will cause the text to be
     * re-layed out on the next update.
     *
     * @param state
     */
    protected invalidateCache(state: SdfTextRendererState): void;
}
