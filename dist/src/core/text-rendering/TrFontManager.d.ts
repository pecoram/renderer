import type { TrFontFace } from './font-face-types/TrFontFace.js';
import type { TextRendererMap, TrFontProps } from './renderers/TextRenderer.js';
/**
 * Structure mapping font family names to a set of font faces.
 */
export interface FontFamilyMap {
    [familyName: string]: Set<TrFontFace>;
}
export declare class TrFontManager {
    private textRenderers;
    constructor(textRenderers: Partial<TextRendererMap>);
    addFontFace(font: TrFontFace): void;
    /**
     * Utility method to resolve a single font face from a list of prioritized family maps based on
     * a set of font properties.
     *
     * @remarks
     * These are to be used by a text renderer to resolve a font face if needed.
     *
     * @param familyMapsByPriority
     * @param props
     * @returns
     */
    static resolveFontFace(familyMapsByPriority: FontFamilyMap[], props: TrFontProps): TrFontFace | undefined;
}
