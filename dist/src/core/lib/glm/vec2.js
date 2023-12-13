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
import { EPSILON, getMatrixArrayType, RANDOM, } from './common.js';
/**
 * Creates a new, empty Vec2
 *
 * @returns {Vec2} a new 2D vector
 */
export function create() {
    const out = getMatrixArrayType(2);
    if (!(out instanceof Float32Array)) {
        out[0] = 0;
        out[1] = 0;
    }
    return out;
}
/**
 * Creates a new Vec2 initialized with values from an existing vector
 *
 * @param {Vec2} a vector to clone
 * @returns {Vec2} a new 2D vector
 */
export function clone(a) {
    const out = getMatrixArrayType(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
}
/**
 * Creates a new Vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {Vec2} a new 2D vector
 */
export function fromValues(x, y) {
    const out = getMatrixArrayType(2);
    out[0] = x;
    out[1] = y;
    return out;
}
/**
 * Copy the values from one Vec2 to another
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the source vector
 * @returns {Vec2} out
 */
export function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
}
/**
 * Set the components of a Vec2 to the given values
 *
 * @param {Vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {Vec2} out
 */
export function set(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
}
/**
 * Adds two Vec2's
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec2} out
 */
export function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec2} out
 */
export function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
}
/**
 * Multiplies two Vec2's
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec2} out
 */
export function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
}
/**
 * Divides two Vec2's
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec2} out
 */
export function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
}
/**
 * Math.ceil the components of a Vec2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a vector to ceil
 * @returns {Vec2} out
 */
export function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
}
/**
 * Math.floor the components of a Vec2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a vector to floor
 * @returns {Vec2} out
 */
export function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
}
/**
 * Returns the minimum of two Vec2's
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec2} out
 */
export function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
}
/**
 * Returns the maximum of two Vec2's
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec2} out
 */
export function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
}
/**
 * Math.round the components of a Vec2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a vector to round
 * @returns {Vec2} out
 */
export function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
}
/**
 * Scales a Vec2 by a scalar number
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {Vec2} out
 */
export function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
}
/**
 * Adds two Vec2's after scaling the second operand by a scalar value
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {Vec2} out
 */
export function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    return out;
}
/**
 * Calculates the euclidian distance between two Vec2's
 *
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Number} distance between a and b
 */
export function distance(a, b) {
    const x = b[0] - a[0], y = b[1] - a[1];
    return Math.hypot(x, y);
}
/**
 * Calculates the squared euclidian distance between two Vec2's
 *
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
export function squaredDistance(a, b) {
    const x = b[0] - a[0], y = b[1] - a[1];
    return x * x + y * y;
}
/**
 * Calculates the length of a Vec2
 *
 * @param {Vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
export function length(a) {
    const x = a[0], y = a[1];
    return Math.hypot(x, y);
}
/**
 * Calculates the squared length of a Vec2
 *
 * @param {Vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
export function squaredLength(a) {
    const x = a[0], y = a[1];
    return x * x + y * y;
}
/**
 * Negates the components of a Vec2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a vector to negate
 * @returns {Vec2} out
 */
export function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
}
/**
 * Returns the inverse of the components of a Vec2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a vector to invert
 * @returns {Vec2} out
 */
export function inverse(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    return out;
}
/**
 * Normalize a Vec2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a vector to normalize
 * @returns {Vec2} out
 */
export function normalize(out, a) {
    const x = a[0], y = a[1];
    let len = x * x + y * y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    return out;
}
/**
 * Calculates the dot product of two Vec2's
 *
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
export function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two Vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec3} out
 */
export function cross(out, a, b) {
    const z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
}
/**
 * Performs a linear interpolation between two Vec2's
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {Vec2} out
 */
export function lerp(out, a, b, t) {
    const ax = a[0], ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {Vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
 * @returns {Vec2} out
 */
export function random(out, scale) {
    scale = scale ?? 1.0;
    const r = RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
}
/**
 * Transforms the Vec2 with a mat2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the vector to transform
 * @param {ReadOnlyMat2} m matrix to transform with
 * @returns {Vec2} out
 */
export function transformMat2(out, a, m) {
    const x = a[0], y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
}
/**
 * Transforms the Vec2 with a mat2d
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the vector to transform
 * @param {Mat2d} m matrix to transform with
 * @returns {Vec2} out
 */
export function transformMat2d(out, a, m) {
    const x = a[0], y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
}
/**
 * Transforms the Vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the vector to transform
 * @param {Mat3} m matrix to transform with
 * @returns {Vec2} out
 */
export function transformMat3(out, a, m) {
    const x = a[0], y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
}
/**
 * Transforms the Vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the vector to transform
 * @param {Mat4} m matrix to transform with
 * @returns {Vec2} out
 */
export function transformMat4(out, a, m) {
    const x = a[0];
    const y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
}
/**
 * Rotate a 2D vector
 * @param {Vec2} out The receiving Vec2
 * @param {Vec2} a The Vec2 point to rotate
 * @param {Vec2} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {Vec2} out
 */
export function rotate(out, a, b, rad) {
    //Translate point to the origin
    const p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(rad), cosC = Math.cos(rad); //perform rotation and translate to correct position
    out[0] = p0 * cosC - p1 * sinC + b[0];
    out[1] = p0 * sinC + p1 * cosC + b[1];
    return out;
}
/**
 * Get the angle between two 2D vectors
 * @param {Vec2} a The first operand
 * @param {Vec2} b The second operand
 * @returns {Number} The angle in radians
 */
export function angle(a, b) {
    const x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1], 
    // mag is the product of the magnitudes of a and b
    mag = Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2)), 
    // mag &&.. short circuits if mag == 0
    cosine = mag && (x1 * x2 + y1 * y2) / mag; // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a Vec2 to zero
 *
 * @param {Vec2} out the receiving vector
 * @returns {Vec2} out
 */
export function zero(out) {
    out[0] = 0.0;
    out[1] = 0.0;
    return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {Vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
export function str(a) {
    return `Vec2(${a[0]}, ${a[1]})`;
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {Vec2} a The first vector.
 * @param {Vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {Vec2} a The first vector.
 * @param {Vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export function equals(a, b) {
    const a0 = a[0], a1 = a[1];
    const b0 = b[0], b1 = b[1];
    return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)));
}
/**
 * Alias for {@link length}
 * @function
 */
export const len = length;
/**
 * Alias for {@link subtract}
 * @function
 */
export const sub = subtract;
/**
 * Alias for {@link multiply}
 * @function
 */
export const mul = multiply;
/**
 * Alias for {@link divide}
 * @function
 */
export const div = divide;
/**
 * Alias for {@link distance}
 * @function
 */
export const dist = distance;
/**
 * Alias for {@link vsquaredDistance}
 * @function
 */
export const sqrDist = squaredDistance;
/**
 * Alias for {@link squaredLength}
 * @function
 */
export const sqrLen = squaredLength;
/**
 * Perform some operation over an array of Vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each Vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of Vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
export const forEach = (function () {
    const vec = [];
    return function (a, stride, offset, count, fn, arg) {
        let i, l;
        if (!stride) {
            stride = 2;
        }
        if (!offset) {
            offset = 0;
        }
        if (count) {
            l = Math.min(count * stride + offset, a.length);
        }
        else {
            l = a.length;
        }
        for (i = offset; i < l; i += stride) {
            /* eslint-disable @typescript-eslint/no-non-null-assertion */
            vec[0] = a[i];
            vec[1] = a[i + 1];
            /* eslint-enable @typescript-eslint/no-non-null-assertion */
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
        }
        return a;
    };
})();
//# sourceMappingURL=vec2.js.map