import type { FontShaper, FontShaperProps } from '../../../font-face-types/SdfTrFontFace/internal/FontShaper.js';
/**
 * Measures a single-line of text width ignoring any unmapped glyphs including line breaks
 *
 * @param text
 * @param shaperProps
 * @param shaper
 * @returns
 */
export declare function measureText(text: string, shaperProps: FontShaperProps, shaper: FontShaper): number;
