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
export const EPSILON = 0.00001;
export const RANDOM = Math.random;
export const ANGLE_ORDER = 'zyx';
let useFloat32Arrays = true;
/**
 * Sets array type to be used.
 *
 * @param {number} size of matrix type
 * @returns {FloatArray} matrix type
 */
export function setMatrixArrayType(type) {
    useFloat32Arrays = type instanceof Float32Array;
}
/**
 * Return array type to be used.
 *
 * @param {number} size of matrix type
 * @returns {FloatArray} matrix type
 */
export function getMatrixArrayType(size) {
    if (useFloat32Arrays && typeof Float32Array !== 'undefined') {
        return size ? new Float32Array(size) : new Float32Array();
    }
    return [];
}
/**
 * Convert Angle in Degrees To Radians
 *
 * @param {number} angle is an Angle in Degrees
 */
export function toRadians(angle) {
    return angle * (Math.PI / 180);
}
/**
 * Convert Angle in Radians To an Angle in Radians
 *
 * @param {number} angle is an Angle in Radians
 */
export function toDegrees(angle) {
    return angle * (180 / Math.PI);
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {number} a The first number to test.
 * @param {number} b The second number to test.
 * @returns {boolean} True if the numbers are approximately equal, false otherwise.
 */
export function equals(a, b) {
    return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
if (!Math.hypot)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Math.hypot = function (...args) {
        let y = 0, i = arguments.length;
        while (i--) {
            y += args[i] * args[i];
        }
        return Math.sqrt(y);
    };
//# sourceMappingURL=common.js.map