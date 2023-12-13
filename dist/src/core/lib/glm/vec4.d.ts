import { type Float32ArrayLen4, type NumberArrayLen4 } from './common.js';
import type { Mat4 } from './mat4.js';
import type { Quat } from './quat.js';
import type { Quat2 } from './quat2.js';
export type Vec4 = Float32ArrayLen4 | NumberArrayLen4;
/**
 * Creates a new, empty Vec4
 *
 * @returns {Vec4} a new 4D vector
 */
export declare function create(): Vec4;
/**
 * Creates a new Vec4 initialized with values from an existing vector
 *
 * @param {Vec4} a vector to clone
 * @returns {Vec4} a new 4D vector
 */
export declare function clone(a: Vec4): Vec4;
/**
 * Creates a new Vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {Vec4} a new 4D vector
 */
export declare function fromValues(x: number, y: number, z: number, w: number): Vec4;
/**
 * Copy the values from one Vec4 to another
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a the source vector
 * @returns {Vec4} out
 */
export declare function copy(out: Vec4, a: Vec4): Vec4;
/**
 * Set the components of a Vec4 to the given values
 *
 * @param {Vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {Vec4} out
 */
export declare function set(out: Vec4, x: number, y: number, z: number, w: number): Vec4;
/**
 * Adds two Vec4's
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a the first operand
 * @param {Vec4} b the second operand
 * @returns {Vec4} out
 */
export declare function add(out: Vec4, a: Vec4, b: Vec4): Vec4;
/**
 * Subtracts vector b from vector a
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a the first operand
 * @param {Vec4} b the second operand
 * @returns {Vec4} out
 */
export declare function subtract(out: Vec4, a: Vec4, b: Vec4): Vec4;
/**
 * Multiplies two Vec4's
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a the first operand
 * @param {Vec4} b the second operand
 * @returns {Vec4} out
 */
export declare function multiply(out: Vec4, a: Vec4, b: Vec4): Vec4;
/**
 * Divides two Vec4's
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a the first operand
 * @param {Vec4} b the second operand
 * @returns {Vec4} out
 */
export declare function divide(out: Vec4, a: Vec4, b: Vec4): Vec4;
/**
 * Math.ceil the components of a Vec4
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a vector to ceil
 * @returns {Vec4} out
 */
export declare function ceil(out: Vec4, a: Vec4): Vec4;
/**
 * Math.floor the components of a Vec4
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a vector to floor
 * @returns {Vec4} out
 */
export declare function floor(out: Vec4, a: Vec4): Vec4;
/**
 * Returns the minimum of two Vec4's
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a the first operand
 * @param {Vec4} b the second operand
 * @returns {Vec4} out
 */
export declare function min(out: Vec4, a: Vec4, b: Vec4): Vec4;
/**
 * Returns the maximum of two Vec4's
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a the first operand
 * @param {Vec4} b the second operand
 * @returns {Vec4} out
 */
export declare function max(out: Vec4, a: Vec4, b: Vec4): Vec4;
/**
 * Math.round the components of a Vec4
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a vector to round
 * @returns {Vec4} out
 */
export declare function round(out: Vec4, a: Vec4): Vec4;
/**
 * Scales a Vec4 by a scalar number
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {Vec4} out
 */
export declare function scale(out: Vec4, a: Vec4, b: number): Vec4;
/**
 * Adds two Vec4's after scaling the second operand by a scalar value
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a the first operand
 * @param {Vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {Vec4} out
 */
export declare function scaleAndAdd(out: Vec4, a: Vec4, b: Vec4, scale: number): Vec4;
/**
 * Calculates the euclidian distance between two Vec4's
 *
 * @param {Vec4} a the first operand
 * @param {Vec4} b the second operand
 * @returns {Number} distance between a and b
 */
export declare function distance(a: Vec4, b: Vec4): number;
/**
 * Calculates the squared euclidian distance between two Vec4's
 *
 * @param {Vec4} a the first operand
 * @param {Vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
export declare function squaredDistance(a: Vec4, b: Vec4): number;
/**
 * Calculates the length of a Vec4
 *
 * @param {Vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
export declare function length(a: Vec4): number;
/**
 * Calculates the squared length of a Vec4
 *
 * @param {Vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
export declare function squaredLength(a: Vec4 | Quat2): number;
/**
 * Negates the components of a Vec4
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a vector to negate
 * @returns {Vec4} out
 */
export declare function negate(out: Vec4, a: Vec4): Vec4;
/**
 * Returns the inverse of the components of a Vec4
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a vector to invert
 * @returns {Vec4} out
 */
export declare function inverse(out: Vec4, a: Vec4): Vec4;
/**
 * Normalize a Vec4
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a vector to normalize
 * @returns {Vec4} out
 */
export declare function normalize(out: Vec4, a: Vec4): Vec4;
/**
 * Calculates the dot product of two Vec4's
 *
 * @param {Vec4} a the first operand
 * @param {Vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
export declare function dot(a: Vec4 | Quat2, b: Vec4 | Quat2): number;
/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} u the first vector
 * @param {Vec4} v the second vector
 * @param {Vec4} w the third vector
 * @returns {Vec4} result
 */
export declare function cross(out: Vec4, u: Vec4, v: Vec4, w: Vec4): Vec4;
/**
 * Performs a linear interpolation between two Vec4's
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a the first operand
 * @param {Vec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {Vec4} out
 */
export declare function lerp(out: Vec4, a: Vec4, b: Vec4, t: number): Vec4;
/**
 * Generates a random vector with the given scale
 *
 * @param {Vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
 * @returns {Vec4} out
 */
export declare function random(out: Vec4, scale?: number): Vec4;
/**
 * Transforms the Vec4 with a Mat4.
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {Vec4} out
 */
export declare function transformMat4(out: Vec4, a: Vec4, m: Mat4): Vec4;
/**
 * Transforms the Vec4 with a quat
 *
 * @param {Vec4} out the receiving vector
 * @param {Vec4} a the vector to transform
 * @param {Quat} q quaternion to transform with
 * @returns {Vec4} out
 */
export declare function transformQuat(out: Vec4, a: Vec4, q: Quat): Vec4;
/**
 * Set the components of a Vec4 to zero
 *
 * @param {Vec4} out the receiving vector
 * @returns {Vec4} out
 */
export declare function zero(out: Vec4): Vec4;
/**
 * Returns a string representation of a vector
 *
 * @param {Vec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
export declare function str(a: Vec4): string;
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {Vec4} a The first vector.
 * @param {Vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export declare function exactEquals(a: Vec4, b: Vec4): boolean;
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {Vec4} a The first vector.
 * @param {Vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export declare function equals(a: Vec4, b: Vec4): boolean;
/**
 * Alias for {@link Vec4.subtract}
 * @function
 */
export declare const sub: typeof subtract;
/**
 * Alias for {@link Vec4.multiply}
 * @function
 */
export declare const mul: typeof multiply;
/**
 * Alias for {@link Vec4.divide}
 * @function
 */
export declare const div: typeof divide;
/**
 * Alias for {@link Vec4.distance}
 * @function
 */
export declare const dist: typeof distance;
/**
 * Alias for {@link Vec4.squaredDistance}
 * @function
 */
export declare const sqrDist: typeof squaredDistance;
/**
 * Alias for {@link Vec4.length}
 * @function
 */
export declare const len: typeof length;
/**
 * Alias for {@link Vec4.squaredLength}
 * @function
 */
export declare const sqrLen: typeof squaredLength;
/**
 * Perform some operation over an array of Vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each Vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of Vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
export declare const forEach: (a: Vec4[], stride: number, offset: number, count: number, fn: (a: Vec4[], b: Vec4[], arg: object) => void, arg: object) => Vec4[];
