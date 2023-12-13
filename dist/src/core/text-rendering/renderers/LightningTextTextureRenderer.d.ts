import { type RGBA } from '../../lib/utils.js';
/**
 * Text Overflow Values
 */
export type TextOverflow = 'ellipsis' | 'clip' | (string & Record<never, never>);
/***
 * Text Horizontal Align Values
 */
export type TextAlign = 'left' | 'center' | 'right';
/***
 * Text Baseline Values
 */
export type TextBaseline = 'alphabetic' | 'top' | 'hanging' | 'middle' | 'ideographic' | 'bottom';
/***
 * Text Vertical Align Values
 */
export type TextVerticalAlign = 'top' | 'middle' | 'bottom';
/**
 * Text Texture Settings
 */
export interface Settings {
    w: number;
    h: number;
    text: string;
    fontStyle: string;
    fontSize: number;
    fontBaselineRatio: number;
    fontFace: string | null;
    wordWrap: boolean;
    wordWrapWidth: number;
    wordBreak: boolean;
    textOverflow: TextOverflow | null;
    lineHeight: number | null;
    textBaseline: TextBaseline;
    textAlign: TextAlign;
    verticalAlign: TextVerticalAlign;
    offsetY: number | null;
    maxLines: number;
    maxLinesSuffix: string;
    precision: number;
    textColor: RGBA;
    paddingLeft: number;
    paddingRight: number;
    shadow: boolean;
    shadowColor: RGBA;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowBlur: number;
    highlight: boolean;
    highlightHeight: number;
    highlightColor: RGBA;
    highlightOffset: number;
    highlightPaddingLeft: number;
    highlightPaddingRight: number;
    letterSpacing: number;
    textIndent: number;
    cutSx: number;
    cutSy: number;
    cutEx: number;
    cutEy: number;
    advancedRenderer: boolean;
    textRenderIssueMargin: number;
}
export interface RenderInfo {
    w: number;
    h: number;
    lines: string[];
    precision: number;
    remainingText: string;
    moreTextLines: boolean;
    width: number;
    innerWidth: number;
    height: number;
    fontSize: number;
    cutSx: number;
    cutSy: number;
    cutEx: number;
    cutEy: number;
    lineHeight: number;
    lineWidths: number[];
    offsetY: number;
    paddingLeft: number;
    paddingRight: number;
    letterSpacing: number;
    textIndent: number;
}
export declare class LightningTextTextureRenderer {
    private _canvas;
    private _context;
    private _settings;
    private renderInfo;
    constructor(canvas: OffscreenCanvas | HTMLCanvasElement, context: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D);
    set settings(v: Partial<Settings>);
    get settings(): Settings;
    getPrecision(): number;
    setFontProperties(): void;
    _getFontSetting(): string;
    _load(): Promise<void> | undefined;
    calculateRenderInfo(): RenderInfo;
    draw(renderInfo: RenderInfo, linesOverride?: {
        lines: string[];
        lineWidths: number[];
    }): void;
    wrapWord(word: string, wordWrapWidth: number, suffix: string): string;
    /**
     * Applies newlines to a string to have it optimally fit into the horizontal
     * bounds set by the Text object's wordWrapWidth property.
     */
    wrapText(text: string, wordWrapWidth: number, letterSpacing: number, indent?: number): {
        l: string[];
        n: number[];
    };
    measureText(word: string, space?: number): number;
    mergeDefaults(settings: Partial<Settings>): Settings;
}
