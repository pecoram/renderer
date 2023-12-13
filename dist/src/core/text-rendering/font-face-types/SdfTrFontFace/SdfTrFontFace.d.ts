import type { Stage } from '../../../Stage.js';
import { ImageTexture } from '../../../textures/ImageTexture.js';
import { TrFontFace, type TrFontFaceDescriptors } from '../TrFontFace.js';
import type { FontShaper } from './internal/FontShaper.js';
import { type SdfFontData } from './internal/SdfFontShaper.js';
type SdfFontType = 'ssdf' | 'msdf';
declare module '../TrFontFace.js' {
    interface TrFontFaceMap {
        ssdf: SdfTrFontFace<'ssdf'>;
        msdf: SdfTrFontFace<'msdf'>;
    }
}
interface GlyphAtlasEntry {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare class SdfTrFontFace<FontTypeT extends SdfFontType = SdfFontType> extends TrFontFace {
    readonly type: FontTypeT;
    readonly texture: ImageTexture;
    readonly data: SdfFontData | undefined;
    readonly shaper: FontShaper | undefined;
    readonly glyphMap: Map<number, SdfFontData['chars'][0]>;
    constructor(fontFamily: string, descriptors: Partial<TrFontFaceDescriptors>, type: FontTypeT, stage: Stage, atlasUrl: string, atlasDataUrl: string);
    getAtlasEntry(glyphId: number): GlyphAtlasEntry;
    private checkLoaded;
}
export {};
