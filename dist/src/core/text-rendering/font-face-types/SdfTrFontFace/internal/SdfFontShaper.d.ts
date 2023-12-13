import type { PeekableIterator } from '../../../renderers/SdfTextRenderer/internal/PeekableGenerator.js';
import { FontShaper, type FontShaperProps, type MappedGlyphInfo, type UnmappedCharacterInfo } from './FontShaper.js';
export declare class SdfFontShaper extends FontShaper {
    private readonly data;
    private readonly kernings;
    constructor(data: SdfFontData);
    shapeText(props: FontShaperProps, codepoints: PeekableIterator<number>): Generator<MappedGlyphInfo | UnmappedCharacterInfo, void>;
}
export interface SdfFontData {
    pages: string[];
    chars: Array<{
        id: number;
        char: string;
        x: number;
        y: number;
        width: number;
        height: number;
        xoffset: number;
        yoffset: number;
        xadvance: number;
        page: number;
        chnl: number;
    }>;
    kernings: Array<{
        first: number;
        second: number;
        amount: number;
    }>;
    info: {
        face: string;
        size: number;
        bold: number;
        italic: number;
        charset: string[];
        unicode: number;
        stretchH: number;
        smooth: number;
        aa: number;
        padding: [number, number, number, number];
        spacing: [number, number];
        outline: number;
    };
    common: {
        lineHeight: number;
        base: number;
        scaleW: number;
        scaleH: number;
        pages: number;
        packed: number;
        alphaChnl: number;
        redChnl: number;
        greenChnl: number;
        blueChnl: number;
    };
    distanceField: {
        fieldType: 'sdf' | 'msdf';
        distanceRange: number;
    };
}
