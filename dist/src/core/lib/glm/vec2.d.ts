import { type Float32ArrayLen2, type NumberArrayLen2 } from './common.js';
import type { Vec3 } from './vec3.js';
import type { Mat2d } from './mat2d.js';
import type { Mat3 } from './mat3.js';
import type { Mat4 } from './mat4.js';
import type { Mat2 } from './mat2.js';
export type Vec2 = Float32ArrayLen2 | NumberArrayLen2;
/**
 * Creates a new, empty Vec2
 *
 * @returns {Vec2} a new 2D vector
 */
export declare function create(): Vec2;
/**
 * Creates a new Vec2 initialized with values from an existing vector
 *
 * @param {Vec2} a vector to clone
 * @returns {Vec2} a new 2D vector
 */
export declare function clone(a: Vec2): Vec2;
/**
 * Creates a new Vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {Vec2} a new 2D vector
 */
export declare function fromValues(x: number, y: number): Vec2;
/**
 * Copy the values from one Vec2 to another
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the source vector
 * @returns {Vec2} out
 */
export declare function copy(out: Vec2, a: Vec2): Vec2;
/**
 * Set the components of a Vec2 to the given values
 *
 * @param {Vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {Vec2} out
 */
export declare function set(out: Vec2, x: number, y: number): Vec2;
/**
 * Adds two Vec2's
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec2} out
 */
export declare function add(out: Vec2, a: Vec2, b: Vec2): Vec2;
/**
 * Subtracts vector b from vector a
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec2} out
 */
export declare function subtract(out: Vec2, a: Vec2, b: Vec2): Vec2;
/**
 * Multiplies two Vec2's
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec2} out
 */
export declare function multiply(out: Vec2, a: Vec2, b: Vec2): Vec2;
/**
 * Divides two Vec2's
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec2} out
 */
export declare function divide(out: Vec2, a: Vec2, b: Vec2): Vec2;
/**
 * Math.ceil the components of a Vec2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a vector to ceil
 * @returns {Vec2} out
 */
export declare function ceil(out: Vec2, a: Vec2): Vec2;
/**
 * Math.floor the components of a Vec2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a vector to floor
 * @returns {Vec2} out
 */
export declare function floor(out: Vec2, a: Vec2): Vec2;
/**
 * Returns the minimum of two Vec2's
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec2} out
 */
export declare function min(out: Vec2, a: Vec2, b: Vec2): Vec2;
/**
 * Returns the maximum of two Vec2's
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec2} out
 */
export declare function max(out: Vec2, a: Vec2, b: Vec2): Vec2;
/**
 * Math.round the components of a Vec2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a vector to round
 * @returns {Vec2} out
 */
export declare function round(out: Vec2, a: Vec2): Vec2;
/**
 * Scales a Vec2 by a scalar number
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {Vec2} out
 */
export declare function scale(out: Vec2, a: Vec2, b: number): Vec2;
/**
 * Adds two Vec2's after scaling the second operand by a scalar value
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {Vec2} out
 */
export declare function scaleAndAdd(out: Vec2, a: Vec2, b: Vec2, scale: number): Vec2;
/**
 * Calculates the euclidian distance between two Vec2's
 *
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Number} distance between a and b
 */
export declare function distance(a: Vec2, b: Vec2): number;
/**
 * Calculates the squared euclidian distance between two Vec2's
 *
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
export declare function squaredDistance(a: Vec2, b: Vec2): number;
/**
 * Calculates the length of a Vec2
 *
 * @param {Vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
export declare function length(a: Vec2): number;
/**
 * Calculates the squared length of a Vec2
 *
 * @param {Vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
export declare function squaredLength(a: Vec2): number;
/**
 * Negates the components of a Vec2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a vector to negate
 * @returns {Vec2} out
 */
export declare function negate(out: Vec2, a: Vec2): Vec2;
/**
 * Returns the inverse of the components of a Vec2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a vector to invert
 * @returns {Vec2} out
 */
export declare function inverse(out: Vec2, a: Vec2): Vec2;
/**
 * Normalize a Vec2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a vector to normalize
 * @returns {Vec2} out
 */
export declare function normalize(out: Vec2, a: Vec2): Vec2;
/**
 * Calculates the dot product of two Vec2's
 *
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
export declare function dot(a: Vec2, b: Vec2): number;
/**
 * Computes the cross product of two Vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @returns {Vec3} out
 */
export declare function cross(out: Vec3, a: Vec2, b: Vec2): Vec3;
/**
 * Performs a linear interpolation between two Vec2's
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the first operand
 * @param {Vec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {Vec2} out
 */
export declare function lerp(out: Vec2, a: Vec2, b: Vec2, t: number): Vec2;
/**
 * Generates a random vector with the given scale
 *
 * @param {Vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
 * @returns {Vec2} out
 */
export declare function random(out: Vec2, scale?: number): Vec2;
/**
 * Transforms the Vec2 with a mat2
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the vector to transform
 * @param {ReadOnlyMat2} m matrix to transform with
 * @returns {Vec2} out
 */
export declare function transformMat2(out: Vec2, a: Vec2, m: Mat2): Vec2;
/**
 * Transforms the Vec2 with a mat2d
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the vector to transform
 * @param {Mat2d} m matrix to transform with
 * @returns {Vec2} out
 */
export declare function transformMat2d(out: Vec2, a: Vec2, m: Mat2d): Vec2;
/**
 * Transforms the Vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {Vec2} out the receiving vector
 * @param {Vec2} a the vector to transform
 * @param {Mat3} m matrix to transform with
 * @returns {Vec2} out
 */
export declare function transformMat3(out: Vec2, a: Vec2, m: Mat3): Vec2;
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
export declare function transformMat4(out: Vec2, a: Vec2, m: Mat4): Vec2;
/**
 * Rotate a 2D vector
 * @param {Vec2} out The receiving Vec2
 * @param {Vec2} a The Vec2 point to rotate
 * @param {Vec2} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {Vec2} out
 */
export declare function rotate(out: Vec2, a: Vec2, b: Vec2, rad: number): Vec2;
/**
 * Get the angle between two 2D vectors
 * @param {Vec2} a The first operand
 * @param {Vec2} b The second operand
 * @returns {Number} The angle in radians
 */
export declare function angle(a: Vec2, b: Vec2): number;
/**
 * Set the components of a Vec2 to zero
 *
 * @param {Vec2} out the receiving vector
 * @returns {Vec2} out
 */
export declare function zero(out: Vec2): Vec2;
/**
 * Returns a string representation of a vector
 *
 * @param {Vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
export declare function str(a: Vec2): string;
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {Vec2} a The first vector.
 * @param {Vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export declare function exactEquals(a: Vec2, b: Vec2): boolean;
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {Vec2} a The first vector.
 * @param {Vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export declare function equals(a: Vec2, b: Vec2): boolean;
/**
 * Alias for {@link length}
 * @function
 */
export declare const len: typeof length;
/**
 * Alias for {@link subtract}
 * @function
 */
export declare const sub: typeof subtract;
/**
 * Alias for {@link multiply}
 * @function
 */
export declare const mul: typeof multiply;
/**
 * Alias for {@link divide}
 * @function
 */
export declare const div: typeof divide;
/**
 * Alias for {@link distance}
 * @function
 */
export declare const dist: typeof distance;
/**
 * Alias for {@link vsquaredDistance}
 * @function
 */
export declare const sqrDist: typeof squaredDistance;
/**
 * Alias for {@link squaredLength}
 * @function
 */
export declare const sqrLen: typeof squaredLength;
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
export declare const forEach: (a: Vec2[], stride: number, offset: number, count: number, fn: (a: Vec2[], b: Vec2[], arg: object) => void, arg: object) => Vec2[];
