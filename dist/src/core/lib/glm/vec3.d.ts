import { type Float32ArrayLen3, type NumberArrayLen3 } from './common.js';
import type { Mat3 } from './mat3.js';
import type { Mat4 } from './mat4.js';
import type { Quat } from './quat.js';
export type Vec3 = Float32ArrayLen3 | NumberArrayLen3;
/**
 * Creates a new, empty Vec3
 *
 * @returns {Vec3} a new 3D vector
 */
export declare function create(): Vec3;
/**
 * Creates a new Vec3 initialized with values from an existing vector
 *
 * @param {Vec3} a vector to clone
 * @returns {Vec3} a new 3D vector
 */
export declare function clone(a: Vec3): Vec3;
/**
 * Calculates the length of a Vec3
 *
 * @param {Vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
export declare function length(a: Vec3): number;
/**
 * Creates a new Vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {Vec3} a new 3D vector
 */
export declare function fromValues(x: number, y: number, z: number): Vec3;
/**
 * Copy the values from one Vec3 to another
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the source vector
 * @returns {Vec3} out
 */
export declare function copy(out: Vec3, a: Vec3): Vec3;
/**
 * Set the components of a Vec3 to the given values
 *
 * @param {Vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {Vec3} out
 */
export declare function set(out: Vec3, x: number, y: number, z: number): Vec3;
/**
 * Adds two Vec3's
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @returns {Vec3} out
 */
export declare function add(out: Vec3, a: Vec3, b: Vec3): Vec3;
/**
 * Subtracts vector b from vector a
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @returns {Vec3} out
 */
export declare function subtract(out: Vec3, a: Vec3, b: Vec3): Vec3;
/**
 * Multiplies two Vec3's
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @returns {Vec3} out
 */
export declare function multiply(out: Vec3, a: Vec3, b: Vec3): Vec3;
/**
 * Divides two Vec3's
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @returns {Vec3} out
 */
export declare function divide(out: Vec3, a: Vec3, b: Vec3): Vec3;
/**
 * Math.ceil the components of a Vec3
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a vector to ceil
 * @returns {Vec3} out
 */
export declare function ceil(out: Vec3, a: Vec3): Vec3;
/**
 * Math.floor the components of a Vec3
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a vector to floor
 * @returns {Vec3} out
 */
export declare function floor(out: Vec3, a: Vec3): Vec3;
/**
 * Returns the minimum of two Vec3's
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @returns {Vec3} out
 */
export declare function min(out: Vec3, a: Vec3, b: Vec3): Vec3;
/**
 * Returns the maximum of two Vec3's
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @returns {Vec3} out
 */
export declare function max(out: Vec3, a: Vec3, b: Vec3): Vec3;
/**
 * Math.round the components of a Vec3
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a vector to round
 * @returns {Vec3} out
 */
export declare function round(out: Vec3, a: Vec3): Vec3;
/**
 * Scales a Vec3 by a scalar number
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {Vec3} out
 */
export declare function scale(out: Vec3, a: Vec3, b: number): Vec3;
/**
 * Adds two Vec3's after scaling the second operand by a scalar value
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {Vec3} out
 */
export declare function scaleAndAdd(out: Vec3, a: Vec3, b: Vec3, scale: number): Vec3;
/**
 * Calculates the euclidian distance between two Vec3's
 *
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @returns {Number} distance between a and b
 */
export declare function distance(a: Vec3, b: Vec3): number;
/**
 * Calculates the squared euclidian distance between two Vec3's
 *
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
export declare function squaredDistance(a: Vec3, b: Vec3): number;
/**
 * Calculates the squared length of a Vec3
 *
 * @param {Vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
export declare function squaredLength(a: Vec3): number;
/**
 * Negates the components of a Vec3
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a vector to negate
 * @returns {Vec3} out
 */
export declare function negate(out: Vec3, a: Vec3): Vec3;
/**
 * Returns the inverse of the components of a Vec3
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a vector to invert
 * @returns {Vec3} out
 */
export declare function inverse(out: Vec3, a: Vec3): Vec3;
/**
 * Normalize a Vec3
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a vector to normalize
 * @returns {Vec3} out
 */
export declare function normalize(out: Vec3, a: Vec3): Vec3;
/**
 * Calculates the dot product of two Vec3's
 *
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
export declare function dot(a: Vec3, b: Vec3): number;
/**
 * Computes the cross product of two Vec3's
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @returns {Vec3} out
 */
export declare function cross(out: Vec3, a: Vec3, b: Vec3): Vec3;
/**
 * Performs a linear interpolation between two Vec3's
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {Vec3} out
 */
export declare function lerp(out: Vec3, a: Vec3, b: Vec3, t: number): Vec3;
/**
 * Performs a spherical linear interpolation between two Vec3's
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {Vec3} out
 */
export declare function slerp(out: Vec3, a: Vec3, b: Vec3, t: number): Vec3;
/**
 * Performs a hermite interpolation with two control points
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @param {Vec3} c the third operand
 * @param {Vec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {Vec3} out
 */
export declare function hermite(out: Vec3, a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number): Vec3;
/**
 * Performs a bezier interpolation with two control points
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the first operand
 * @param {Vec3} b the second operand
 * @param {Vec3} c the third operand
 * @param {Vec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {Vec3} out
 */
export declare function bezier(out: Vec3, a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number): Vec3;
/**
 * Generates a random vector with the given scale
 *
 * @param {Vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
 * @returns {Vec3} out
 */
export declare function random(out: Vec3, scale?: number): Vec3;
/**
 * Transforms the Vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the vector to transform
 * @param {Mat4} m matrix to transform with
 * @returns {Vec3} out
 */
export declare function transformMat4(out: Vec3, a: Vec3, m: Mat4): Vec3;
/**
 * Transforms the Vec3 with a mat3.
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the vector to transform
 * @param {Mat3} m the 3x3 matrix to transform with
 * @returns {Vec3} out
 */
export declare function transformMat3(out: Vec3, a: Vec3, m: Mat3): Vec3;
/**
 * Transforms the Vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {Vec3} out the receiving vector
 * @param {Vec3} a the vector to transform
 * @param {Quat} q quaternion to transform with
 * @returns {Vec3} out
 */
export declare function transformQuat(out: Vec3, a: Vec3, q: Quat): Vec3;
/**
 * Rotate a 3D vector around the x-axis
 * @param {Vec3} out The receiving Vec3
 * @param {Vec3} a The Vec3 point to rotate
 * @param {Vec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {Vec3} out
 */
export declare function rotateX(out: Vec3, a: Vec3, b: Vec3, rad: number): Vec3;
/**
 * Rotate a 3D vector around the y-axis
 * @param {Vec3} out The receiving Vec3
 * @param {Vec3} a The Vec3 point to rotate
 * @param {Vec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {Vec3} out
 */
export declare function rotateY(out: Vec3, a: Vec3, b: Vec3, rad: number): Vec3;
/**
 * Rotate a 3D vector around the z-axis
 * @param {Vec3} out The receiving Vec3
 * @param {Vec3} a The Vec3 point to rotate
 * @param {Vec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {Vec3} out
 */
export declare function rotateZ(out: Vec3, a: Vec3, b: Vec3, rad: number): Vec3;
/**
 * Get the angle between two 3D vectors
 * @param {Vec3} a The first operand
 * @param {Vec3} b The second operand
 * @returns {Number} The angle in radians
 */
export declare function angle(a: Vec3, b: Vec3): number;
/**
 * Set the components of a Vec3 to zero
 *
 * @param {Vec3} out the receiving vector
 * @returns {Vec3} out
 */
export declare function zero(out: Vec3): Vec3;
/**
 * Returns a string representation of a vector
 *
 * @param {Vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
export declare function str(a: Vec3): string;
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {Vec3} a The first vector.
 * @param {Vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export declare function exactEquals(a: Vec3, b: Vec3): boolean;
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {Vec3} a The first vector.
 * @param {Vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export declare function equals(a: Vec3, b: Vec3): boolean;
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
 * Alias for {@link squaredDistance}
 * @function
 */
export declare const sqrDist: typeof squaredDistance;
/**
 * Alias for {@link length}
 * @function
 */
export declare const len: typeof length;
/**
 * Alias for {@link squaredLength}
 * @function
 */
export declare const sqrLen: typeof squaredLength;
/**
 * Perform some operation over an array of Vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each Vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of Vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
export declare const forEach: (a: Vec3[], stride: number, offset: number, count: number, fn: (a: Vec3[], b: Vec3[], arg: number) => void, arg: number) => Vec3[];
