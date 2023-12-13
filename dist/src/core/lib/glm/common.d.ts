export declare const EPSILON = 0.00001;
export declare const RANDOM: () => number;
export declare const ANGLE_ORDER = "zyx";
export type ConversionOrder = 'xyz' | 'xzy' | 'yxz' | 'yzx' | 'zxy' | 'zyx';
type RemoveIndex<T> = {
    [K in keyof T as number extends K ? never : K]: T[K];
};
export type Float32ArrayLen2 = RemoveIndex<Float32Array> & {
    0: number;
    1: number;
    length: 2;
};
export type NumberArrayLen2 = [number, number];
export type Float32ArrayLen3 = RemoveIndex<Float32Array> & {
    0: number;
    1: number;
    2: number;
    length: 3;
};
export type NumberArrayLen3 = [number, number, number];
export type Float32ArrayLen4 = RemoveIndex<Float32Array> & {
    0: number;
    1: number;
    2: number;
    3: number;
    length: 4;
};
export type NumberArrayLen4 = [number, number, number, number];
export type Float32ArrayLen6 = RemoveIndex<Float32Array> & {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    length: 6;
};
export type NumberArrayLen6 = [number, number, number, number, number, number];
export type Float32ArrayLen8 = RemoveIndex<Float32Array> & {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    length: 8;
};
export type NumberArrayLen8 = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];
export type Float32ArrayLen9 = RemoveIndex<Float32Array> & {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    length: 9;
};
export type NumberArrayLen9 = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];
export type Float32ArrayLen16 = RemoveIndex<Float32Array> & {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    length: 16;
};
export type NumberArrayLen16 = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];
export interface FOV {
    upDegrees: number;
    downDegrees: number;
    leftDegrees: number;
    rightDegrees: number;
}
/**
 * Sets array type to be used.
 *
 * @param {number} size of matrix type
 * @returns {FloatArray} matrix type
 */
export declare function setMatrixArrayType(type: Float32Array | number[]): void;
/**
 * Return array type to be used.
 *
 * @param {number} size of matrix type
 * @returns {FloatArray} matrix type
 */
export declare function getMatrixArrayType(size?: number): Float32Array | number[];
/**
 * Convert Angle in Degrees To Radians
 *
 * @param {number} angle is an Angle in Degrees
 */
export declare function toRadians(angle: number): number;
/**
 * Convert Angle in Radians To an Angle in Radians
 *
 * @param {number} angle is an Angle in Radians
 */
export declare function toDegrees(angle: number): number;
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {number} a The first number to test.
 * @param {number} b The second number to test.
 * @returns {boolean} True if the numbers are approximately equal, false otherwise.
 */
export declare function equals(a: number, b: number): boolean;
export {};
