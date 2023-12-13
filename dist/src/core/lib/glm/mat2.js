/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2023 Comcast Cable Communications Management, LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { EPSILON, getMatrixArrayType, } from './common.js';
/**
 * Creates a new identity Mat2
 *
 * @returns {Mat2} a new 2x2 matrix
 */
export function create() {
    const out = getMatrixArrayType(4);
    if (!(out instanceof Float32Array)) {
        out[1] = 0;
        out[2] = 0;
    }
    out[0] = 1;
    out[3] = 1;
    return out;
}
/**
 * Creates a new Mat2 initialized with values from an existing matrix
 *
 * @param {Mat2} a matrix to clone
 * @returns {Mat2} a new 2x2 matrix
 */
export function clone(a) {
    const out = getMatrixArrayType(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}
/**
 * Copy the values from one Mat2 to another
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the source matrix
 * @returns {Mat2} out
 */
export function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}
/**
 * Set a Mat2 to the identity matrix
 *
 * @param {Mat2} out the receiving matrix
 * @returns {Mat2} out
 */
export function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
}
/**
 * Create a new Mat2 with the given values
 *
 * @param {number} m00 Component in column 0, row 0 position (index 0)
 * @param {number} m01 Component in column 0, row 1 position (index 1)
 * @param {number} m10 Component in column 1, row 0 position (index 2)
 * @param {number} m11 Component in column 1, row 1 position (index 3)
 * @returns {Mat2} out A new 2x2 matrix
 */
export function fromValues(m00, m01, m10, m11) {
    const out = getMatrixArrayType(4);
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
}
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
export function set(out, m00, m01, m10, m11) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
}
/**
 * Transpose the values of a Mat2
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the source matrix
 * @returns {Mat2} out
 */
export function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache
    // some values
    if (out === a) {
        const a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    }
    else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    return out;
}
/**
 * Inverts a Mat2
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the source matrix
 * @returns {Mat2} out
 */
export function invert(out, a) {
    const a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3]; // Calculate the determinant
    let det = a0 * a3 - a2 * a1;
    if (!det) {
        return null;
    }
    det = 1.0 / det;
    out[0] = a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] = a0 * det;
    return out;
}
/**
 * Calculates the adjugate of a Mat2
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the source matrix
 * @returns {Mat2} out
 */
export function adjoint(out, a) {
    // Caching this value is necessary if out == a
    const a0 = a[0];
    out[0] = a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a0;
    return out;
}
/**
 * Calculates the determinant of a Mat2
 *
 * @param {Mat2} a the source matrix
 * @returns {number} determinant of a
 */
export function determinant(a) {
    return a[0] * a[3] - a[2] * a[1];
}
/**
 * Multiplies two Mat2's
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the first operand
 * @param {Mat2} b the second operand
 * @returns {Mat2} out
 */
export function multiply(out, a, b) {
    const a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    const b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
}
/**
 * Rotates a Mat2 by the given angle
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat2} out
 */
export function rotate(out, a, rad) {
    const a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    out[0] = a0 * c + a2 * s;
    out[1] = a1 * c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
}
/**
 * Scales the Mat2 by the dimensions in the given vec2
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the matrix to rotate
 * @param {Vec2} v the vec2 to scale the matrix by
 * @returns {Mat2} out
 **/
export function scale(out, a, v) {
    const a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    const v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
}
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
export function fromRotation(out, rad) {
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
}
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
export function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
}
/**
 * Returns a string representation of a Mat2
 *
 * @param {Mat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
export function str(a) {
    return `Mat2(${a[0]}, ${a[1]}, ${a[2]}, ${a[3]})`;
}
/**
 * Returns Frobenius norm of a Mat2
 *
 * @param {Mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
export function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3]);
}
/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {Mat2} L the lower triangular matrix
 * @param {Mat2} D the diagonal matrix
 * @param {Mat2} U the upper triangular matrix
 * @param {Mat2} a the input matrix to factorize
 */
export function LDU(L, D, U, a) {
    L[2] = a[2] / a[0];
    U[0] = a[0];
    U[1] = a[1];
    U[3] = a[3] - L[2] * U[1];
    return [L, D, U];
}
/**
 * Adds two Mat2's
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the first operand
 * @param {Mat2} b the second operand
 * @returns {Mat2} out
 */
export function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the first operand
 * @param {Mat2} b the second operand
 * @returns {Mat2} out
 */
export function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {Mat2} a The first matrix.
 * @param {Mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
export function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {Mat2} a The first matrix.
 * @param {Mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
export function equals(a, b) {
    const a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    const b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
        Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
        Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)));
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {Mat2} out the receiving matrix
 * @param {Mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {Mat2} out
 */
export function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
}
/**
 * Adds two Mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {Mat2} out the receiving vector
 * @param {Mat2} a the first operand
 * @param {Mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {Mat2} out
 */
export function multiplyScalarAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    return out;
}
/**
 * Alias for {@link multiply}
 * @function
 */
export const mul = multiply;
/**
 * Alias for {@link subtract}
 * @function
 */
export const sub = subtract;
//# sourceMappingURL=mat2.js.map