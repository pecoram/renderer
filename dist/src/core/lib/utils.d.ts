export type RGBA = [r: number, g: number, b: number, a: number];
export declare const getNormalizedRgbaComponents: (rgba: number) => RGBA;
export declare const getRgbaComponents: (rgba: number) => RGBA;
export declare const norm: (rgba: number) => number;
export declare function getNormalizedAlphaComponent(rgba: number): number;
/**
 * Get a CSS color string from a RGBA color
 *
 * @param color
 * @returns
 */
export declare function getRgbaString(color: RGBA): string;
export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface Bound {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export declare function intersectBound(a: Bound, b: Bound): Bound;
export declare function intersectRect(a: Rect, b: Rect): Rect;
export declare function compareRect(a: Rect | null, b: Rect | null): boolean;
export declare function isBoundPositive(bound: Bound): boolean;
export declare function isRectPositive(rect: Rect): boolean;
