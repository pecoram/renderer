import type { TrProps, TextRendererState } from '../../TextRenderer.js';
import type { SdfTextRendererState } from '../SdfTextRenderer.js';
/**
 * Gets the start conditions for the layout loop.
 *
 * @remarks
 * Returns `undefined` if the layout loop should not be run.
 *
 * @param fontSize
 * @param fontSizeRatio
 * @param sdfLineHeight
 * @param renderWindow
 * @param lineCache
 * @param textH
 * @returns
 */
export declare function getStartConditions(fontSize: TrProps['fontSize'], offsetY: TrProps['offsetY'], fontSizeRatio: number, sdfLineHeight: number, renderWindow: SdfTextRendererState['renderWindow'], lineCache: SdfTextRendererState['lineCache'], textH: TextRendererState['textH']): {
    x: number;
    y: number;
    lineIndex: number;
} | undefined;
