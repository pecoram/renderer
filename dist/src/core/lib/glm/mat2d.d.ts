import { type Float32ArrayLen6, type NumberArrayLen6 } from './common.js';
import type { Vec2 } from './vec2.js';
export type Mat2d = Float32ArrayLen6 | NumberArrayLen6;
/**
 * 2x3 Matrix
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, b,
 *  c, d,
 *  tx, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, b, 0,
 *  c, d, 0,
 *  tx, ty, 1]
 * </pre>
 * The last column is ignored so the array is shorter and operations are faster.
 */
/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
export declare function create(): Mat2d;
/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {Mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
export declare function clone(a: Mat2d): Mat2d;
/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {Mat2d} a the source matrix
 * @returns {mat2d} out
 */
export declare function copy(out: Mat2d, a: Mat2d): Mat2d;
/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
export declare function identity(out: Mat2d): Mat2d;
/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */
export declare function fromValues(a: number, b: number, c: number, d: number, tx: number, ty: number): Mat2d;
/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */
export declare function set(out: Mat2d, a: number, b: number, c: number, d: number, tx: number, ty: number): Mat2d;
/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {Mat2d} a the source matrix
 * @returns {mat2d} out
 */
export declare function invert(out: Mat2d, a: Mat2d): Mat2d | null;
/**
 * Calculates the determinant of a mat2d
 *
 * @param {Mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
export declare function determinant(a: Mat2d): number;
/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {Mat2d} a the first operand
 * @param {Mat2d} b the second operand
 * @returns {mat2d} out
 */
export declare function multiply(out: Mat2d, a: Mat2d, b: Mat2d): Mat2d;
/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {Mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
export declare function rotate(out: Mat2d, a: Mat2d, rad: number): Mat2d;
/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {Mat2d} a the matrix to translate
 * @param {Vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
export declare function scale(out: Mat2d, a: Mat2d, v: Vec2): Mat2d;
/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {Mat2d} a the matrix to translate
 * @param {Vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
export declare function translate(out: Mat2d, a: Mat2d, v: Vec2): Mat2d;
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
export declare function fromRotation(out: Mat2d, rad: number): Mat2d;
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Vec2} v Scaling vector
 * @returns {mat2d} out
 */
export declare function fromScaling(out: Mat2d, v: Vec2): Mat2d;
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Vec2} v Translation vector
 * @returns {mat2d} out
 */
export declare function fromTranslation(out: Mat2d, v: Vec2): Mat2d;
/**
 * Returns a string representation of a mat2d
 *
 * @param {Mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
export declare function str(a: Mat2d): string;
/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {Mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
export declare function frob(a: Mat2d): number;
/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {Mat2d} a the first operand
 * @param {Mat2d} b the second operand
 * @returns {mat2d} out
 */
export declare function add(out: Mat2d, a: Mat2d, b: Mat2d): Mat2d;
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {Mat2d} a the first operand
 * @param {Mat2d} b the second operand
 * @returns {mat2d} out
 */
export declare function subtract(out: Mat2d, a: Mat2d, b: Mat2d): Mat2d;
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {Mat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */
export declare function multiplyScalar(out: Mat2d, a: Mat2d, b: number): Mat2d;
/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {Mat2d} a the first operand
 * @param {Mat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */
export declare function multiplyScalarAndAdd(out: Mat2d, a: Mat2d, b: Mat2d, scale: number): Mat2d;
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {Mat2d} a The first matrix.
 * @param {Mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
export declare function exactEquals(a: Mat2d, b: Mat2d): boolean;
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {Mat2d} a The first matrix.
 * @param {Mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
export declare function equals(a: Mat2d, b: Mat2d): boolean;
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
