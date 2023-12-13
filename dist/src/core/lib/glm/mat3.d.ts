import { type Float32ArrayLen9, type NumberArrayLen9 } from './common.js';
import type { Vec2 } from './vec2.js';
import type { Mat2d } from './mat2d.js';
import type { Mat4 } from './mat4.js';
import type { Quat } from './quat.js';
export type Mat3 = Float32ArrayLen9 | NumberArrayLen9;
export declare function create(): Mat3;
/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {Mat3} a   the source 4x4 matrix
 * @returns {mat3} out
 */
export declare function fromMat4(out: Mat3, a: Mat4): Mat3;
/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {Mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
export declare function clone(a: Mat3): Mat3;
/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {Mat3} a the source matrix
 * @returns {mat3} out
 */
export declare function copy(out: Mat3, a: Mat3): Mat3;
/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
export declare function fromValues(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): Mat3;
/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
export declare function set(out: Mat3, m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): Mat3;
/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
export declare function identity(out: Mat3): Mat3;
/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {Mat3} a the source matrix
 * @returns {mat3} out
 */
export declare function transpose(out: Mat3, a: Mat3): Mat3;
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {Mat3} a the source matrix
 * @returns {mat3} out
 */
export declare function invert(out: Mat3, a: Mat3): Mat3 | null;
/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {Mat3} a the source matrix
 * @returns {mat3} out
 */
export declare function adjoint(out: Mat3, a: Mat3): Mat3;
/**
 * Calculates the determinant of a mat3
 *
 * @param {Mat3} a the source matrix
 * @returns {Number} determinant of a
 */
export declare function determinant(a: Mat3): number;
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {Mat3} a the first operand
 * @param {Mat3} b the second operand
 * @returns {mat3} out
 */
export declare function multiply(out: Mat3, a: Mat3, b: Mat3): Mat3;
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {Mat3} a the matrix to translate
 * @param {Vec2} v vector to translate by
 * @returns {mat3} out
 */
export declare function translate(out: Mat3, a: Mat3, v: Mat3): Mat3;
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {Mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
export declare function rotate(out: Mat3, a: Mat3, rad: number): Mat3;
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {Mat3} a the matrix to rotate
 * @param {Vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
export declare function scale(out: Mat3, a: Mat3, v: Mat3): Mat3;
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Vec2} v Translation vector
 * @returns {mat3} out
 */
export declare function fromTranslation(out: Mat3, v: Vec2): Mat3;
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
export declare function fromRotation(out: Mat3, rad: number): Mat3;
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Vec2} v Scaling vector
 * @returns {mat3} out
 */
export declare function fromScaling(out: Mat3, v: Vec2): Mat3;
/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {Mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
export declare function fromMat2d(out: Mat3, a: Mat2d): Mat3;
/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Quat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */
export declare function fromQuat(out: Mat3, q: Quat): Mat3;
/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Mat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */
export declare function normalFromMat4(out: Mat3, a: Mat4): Mat3 | null;
/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */
export declare function projection(out: Mat3, width: number, height: number): Mat3;
/**
 * Returns a string representation of a mat3
 *
 * @param {Mat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
export declare function str(a: Mat3): string;
/**
 * Returns Frobenius norm of a mat3
 *
 * @param {Mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
export declare function frob(a: Mat3): number;
/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {Mat3} a the first operand
 * @param {Mat3} b the second operand
 * @returns {mat3} out
 */
export declare function add(out: Mat3, a: Mat3, b: Mat3): Mat3;
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {Mat3} a the first operand
 * @param {Mat3} b the second operand
 * @returns {mat3} out
 */
export declare function subtract(out: Mat3, a: Mat3, b: Mat3): Mat3;
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {Mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
export declare function multiplyScalar(out: Mat3, a: Mat3, b: number): Mat3;
/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {Mat3} a the first operand
 * @param {Mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
export declare function multiplyScalarAndAdd(out: Mat3, a: Mat3, b: Mat3, scale: number): Mat3;
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {Mat3} a The first matrix.
 * @param {Mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
export declare function exactEquals(a: Mat3, b: Mat3): boolean;
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {Mat3} a The first matrix.
 * @param {Mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
export declare function equals(a: Mat3, b: Mat3): boolean;
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
