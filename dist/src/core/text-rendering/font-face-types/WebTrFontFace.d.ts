import { TrFontFace, type TrFontFaceDescriptors } from './TrFontFace.js';
declare module './TrFontFace.js' {
    interface TrFontFaceMap {
        web: WebTrFontFace;
    }
}
export declare class WebTrFontFace extends TrFontFace {
    readonly fontFace: FontFace;
    readonly fontUrl: string;
    constructor(fontFamily: string, descriptors: Partial<TrFontFaceDescriptors>, fontUrl: string);
}
