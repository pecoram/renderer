import type { TrProps, TextRendererState } from '../../TextRenderer.js';
import type { SdfTextRendererState } from '../SdfTextRenderer.js';
export declare function layoutText(curLineIndex: number, startX: number, startY: number, text: TrProps['text'], textAlign: TrProps['textAlign'], width: TrProps['width'], height: TrProps['height'], fontSize: TrProps['fontSize'], letterSpacing: TrProps['letterSpacing'], 
/**
 * Mutated
 */
vertexBuffer: NonNullable<SdfTextRendererState['vertexBuffer']>, contain: TrProps['contain'], 
/**
 * Mutated
 */
lineCache: SdfTextRendererState['lineCache'], renderWindow: SdfTextRendererState['renderWindow'], trFontFace: SdfTextRendererState['trFontFace'], forceFullLayoutCalc: TextRendererState['forceFullLayoutCalc'], scrollable: TrProps['scrollable']): {
    bufferNumFloats: number;
    bufferNumQuads: number;
    layoutNumCharacters: number;
    fullyProcessed: boolean;
    maxX: number;
    maxY: number;
};
