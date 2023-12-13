import { EventEmitter } from '../../../common/EventEmitter.js';
/**
 * Augmentable map of font type IDs to font types
 *
 * @example
 * ```ts
 * declare module './TrFontFace' {
 *   interface TrFontFaceMap {
 *     canvas: CanvasTrFontFace;
 *   }
 * }
 * ```
 */
export interface TrFontFaceMap {
}
/**
 * Descriptors defining a font face.
 *
 * Used when selecting a font face from a font family.
 *
 * @remarks
 * Based on the `@font-face` CSS rule. Not all descriptors are supported by all
 * text renderers.
 *
 * @see https://www.w3.org/TR/css-fonts-3/#font-face-rule
 */
export interface TrFontFaceDescriptors {
    style: 'normal' | 'italic' | 'oblique';
    weight: 'normal' | 'bold' | number;
    stretch: 'normal' | 'ultra-condensed' | 'extra-condensed' | 'condensed' | 'semi-condensed' | 'semi-expanded' | 'expanded' | 'extra-expanded' | 'ultra-expanded';
    unicodeRange?: string;
    display?: FontDisplay;
    featureSettings?: string;
    variant?: string;
}
export declare class TrFontFace extends EventEmitter {
    readonly fontFamily: string;
    readonly descriptors: TrFontFaceDescriptors;
    readonly loaded: boolean;
    constructor(fontFamily: string, descriptors: Partial<TrFontFaceDescriptors>);
    /**
     * Convert a TrFontFaceDescriptors to a FontFaceDescriptors which differ slightly
     *
     * @param descriptors
     * @returns
     */
    static convertToCssFontFaceDescriptors(descriptors: TrFontFaceDescriptors): FontFaceDescriptors;
}
