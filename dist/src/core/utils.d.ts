/**
 * Core Utility Functions
 *
 * @module
 */
export declare const EPSILON = 0.000001;
export declare let ARRAY_TYPE: Float32ArrayConstructor | ArrayConstructor;
export declare const RANDOM: () => number;
export declare const ANGLE_ORDER = "zyx";
export declare const setMatrixArrayType: (type: Float32ArrayConstructor | ArrayConstructor) => void;
export declare const toRadian: (a: number) => number;
export declare const equals: (a: number, b: number) => boolean;
export declare const rand: (min: number, max: number) => number;
export declare const isPowerOfTwo: (value: number) => boolean | 0;
export declare const getTimingFunction: (str: string) => (time: number) => number | undefined;
