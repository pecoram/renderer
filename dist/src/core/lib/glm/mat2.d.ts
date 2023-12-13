import { type Float32ArrayLen4, type NumberArrayLen4 } from './common.js';
import type { Vec2 } from './vec2.js';
export type Mat2 = Float32ArrayLen4 | NumberArrayLen4;
/**
 * Creates a new identity Mat2
 *
 * @returns {Mat2} a new 2x2 matrix
 */
export declare function create(): Mat2;
/**
 * Creates a new Mat2 initialized with values from an existing matrix
 *
 * @param {Mat2} a matrix to clone
 * @returns {Mat2} a new 2x2 matrix
 */
export declare function clone(a: Mat2): Mat2;
/**
 * Copy the values from one Mat2 to another
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the source matrix
 * @returns {Mat2} out
 */
export declare function copy(out: Mat2, a: Mat2): Mat2;
/**
 * Set a Mat2 to the identity matrix
 *
 * @param {Mat2} out the receiving matrix
 * @returns {Mat2} out
 */
export declare function identity(out: Mat2): Mat2;
/**
 * Create a new Mat2 with the given values
 *
 * @param {number} m00 Component in column 0, row 0 position (index 0)
 * @param {number} m01 Component in column 0, row 1 position (index 1)
 * @param {number} m10 Component in column 1, row 0 position (index 2)
 * @param {number} m11 Component in column 1, row 1 position (index 3)
 * @returns {Mat2} out A new 2x2 matrix
 */
export declare function fromValues(m00: number, m01: number, m10: number, m11: number): Mat2;
/**
 * Set the components of a Mat2 to the given values
 *
 * @param {Mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {Mat2} out
 */
export declare function set(out: Mat2, m00: number, m01: number, m10: number, m11: number): Mat2;
/**
 * Transpose the values of a Mat2
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the source matrix
 * @returns {Mat2} out
 */
export declare function transpose(out: Mat2, a: Mat2): Mat2;
/**
 * Inverts a Mat2
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the source matrix
 * @returns {Mat2} out
 */
export declare function invert(out: Mat2, a: Mat2): Mat2 | null;
/**
 * Calculates the adjugate of a Mat2
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the source matrix
 * @returns {Mat2} out
 */
export declare function adjoint(out: Mat2, a: Mat2): Mat2;
/**
 * Calculates the determinant of a Mat2
 *
 * @param {Mat2} a the source matrix
 * @returns {number} determinant of a
 */
export declare function determinant(a: Mat2): number;
/**
 * Multiplies two Mat2's
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the first operand
 * @param {Mat2} b the second operand
 * @returns {Mat2} out
 */
export declare function multiply(out: Mat2, a: Mat2, b: Mat2): Mat2;
/**
 * Rotates a Mat2 by the given angle
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat2} out
 */
export declare function rotate(out: Mat2, a: Mat2, rad: number): Mat2;
/**
 * Scales the Mat2 by the dimensions in the given vec2
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the matrix to rotate
 * @param {Vec2} v the vec2 to scale the matrix by
 * @returns {Mat2} out
 **/
export declare function scale(out: Mat2, a: Mat2, v: Vec2): Mat2;
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     Mat2.identity(dest);
 *     Mat2.rotate(dest, dest, rad);
 *
 * @param {Mat2} out Mat2 receiving operation result
 * @param {number} rad the angle to rotate the matrix by
 * @returns {Mat2} out
 */
export declare function fromRotation(out: Mat2, rad: number): Mat2;
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     Mat2.identity(dest);
 *     Mat2.scale(dest, dest, vec);
 *
 * @param {Mat2} out Mat2 receiving operation result
 * @param {Vec2} v Scaling vector
 * @returns {Mat2} out
 */
export declare function fromScaling(out: Mat2, v: Vec2): Mat2;
/**
 * Returns a string representation of a Mat2
 *
 * @param {Mat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
export declare function str(a: Mat2): string;
/**
 * Returns Frobenius norm of a Mat2
 *
 * @param {Mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
export declare function frob(a: Mat2): number;
/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {Mat2} L the lower triangular matrix
 * @param {Mat2} D the diagonal matrix
 * @param {Mat2} U the upper triangular matrix
 * @param {Mat2} a the input matrix to factorize
 */
export declare function LDU(L: Mat2, D: Mat2, U: Mat2, a: Mat2): Mat2[];
/**
 * Adds two Mat2's
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the first operand
 * @param {Mat2} b the second operand
 * @returns {Mat2} out
 */
export declare function add(out: Mat2, a: Mat2, b: Mat2): Mat2;
/**
 * Subtracts matrix b from matrix a
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the first operand
 * @param {Mat2} b the second operand
 * @returns {Mat2} out
 */
export declare function subtract(out: Mat2, a: Mat2, b: Mat2): Mat2;
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {Mat2} a The first matrix.
 * @param {Mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
export declare function exactEquals(a: Mat2, b: Mat2): boolean;
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {Mat2} a The first matrix.
 * @param {Mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
export declare function equals(a: Mat2, b: Mat2): boolean;
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {Mat2} out
 */
export declare function multiplyScalar(out: Mat2, a: Mat2, b: number): Mat2;
/**
 * Adds two Mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {Mat2} out the receiving vector
 * @param {Mat2} a the first operand
 * @param {Mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {Mat2} out
 */
export declare function multiplyScalarAndAdd(out: Mat2, a: Mat2, b: Mat2, scale: number): Mat2;
/**
 * Alias for {@link multiply}
 * @function
 */
export declare const mul: typeof multiply;
/**
 * Alias for {@link subtract}
 * @function
 */
export declare const sub: typeof subtract;
