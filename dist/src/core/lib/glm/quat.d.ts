import { type ConversionOrder, type Float32ArrayLen4, type NumberArrayLen4 } from './common.js';
import type { Mat3 } from './mat3.js';
import type { Vec3 } from './vec3.js';
import type { Quat2 } from './quat2.js';
import * as vec4 from './vec4.js';
export type Quat = Float32ArrayLen4 | NumberArrayLen4;
/**
 * Quaternion in the format XYZW
 * @module quat
 */
/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
export declare function create(): Quat;
/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
export declare function identity(out: Quat): Quat;
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {Vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
export declare function setAxisAngle(out: Quat, axis: Vec3, rad: number): Quat;
/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {Vec3} out_axis  Vector receiving the axis of rotation
 * @param  {Quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
export declare function getAxisAngle(out_axis: Vec3, q: Quat): number;
/**
 * Gets the angular distance between two unit quaternions
 *
 * @param  {Quat} a     Origin unit quaternion
 * @param  {Quat} b     Destination unit quaternion
 * @return {Number}     Angle, in radians, between the two quaternions
 */
export declare function getAngle(a: Quat, b: Quat): number;
/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {Quat} a the first operand
 * @param {Quat} b the second operand
 * @returns {quat} out
 */
export declare function multiply(out: Quat, a: Quat, b: Quat): Quat;
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {Quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
export declare function rotateX(out: Quat | Quat2, a: Quat | Quat2, rad: number): Quat | Quat2;
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {Quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
export declare function rotateY(out: Quat | Quat2, a: Quat | Quat2, rad: number): Quat | Quat2;
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {Quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
export declare function rotateZ(out: Quat | Quat2, a: Quat | Quat2, rad: number): Quat | Quat2;
/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {Quat} a quat to calculate W component of
 * @returns {quat} out
 */
export declare function calculateW(out: Quat, a: Quat): Quat;
/**
 * Calculate the exponential of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {Quat} a quat to calculate the exponential of
 * @returns {quat} out
 */
export declare function exp(out: Quat, a: Quat): Quat;
/**
 * Calculate the natural logarithm of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {Quat} a quat to calculate the exponential of
 * @returns {quat} out
 */
export declare function ln(out: Quat, a: Quat): Quat;
/**
 * Calculate the scalar power of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {Quat} a quat to calculate the exponential of
 * @param {Number} b amount to scale the quaternion by
 * @returns {quat} out
 */
export declare function pow(out: Quat, a: Quat, b: number): Quat;
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {Quat} a the first operand
 * @param {Quat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */
export declare function slerp(out: Quat, a: Quat, b: Quat, t: number): Quat;
/**
 * Generates a random unit quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
export declare function random(out: Quat): Quat;
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {Quat} a quat to calculate inverse of
 * @returns {quat} out
 */
export declare function invert(out: Quat, a: Quat): Quat;
/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {Quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
export declare function conjugate(out: Quat, a: Quat): Quat;
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {Mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
export declare function fromMat3(out: Quat, m: Mat3): Quat;
/**
 * Creates a quaternion from the given euler angle x, y, z using the provided intrinsic order for the conversion.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} x Angle to rotate around X axis in degrees.
 * @param {y} y Angle to rotate around Y axis in degrees.
 * @param {z} z Angle to rotate around Z axis in degrees.
 * @param {'zyx'|'xyz'|'yxz'|'yzx'|'zxy'|'zyx'} order Intrinsic order for conversion, default is zyx.
 * @returns {quat} out
 * @function
 */
export declare function fromEuler(out: Quat, x: number, y: number, z: number, order?: ConversionOrder): Quat;
/**
 * Returns a string representation of a quaternion
 *
 * @param {Quat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
export declare function str(a: Quat): string;
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {Quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
export declare const clone: typeof vec4.clone;
/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
export declare const fromValues: typeof vec4.fromValues;
/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {Quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
export declare const copy: typeof vec4.copy;
/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
export declare const set: typeof vec4.set;
/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {Quat} a the first operand
 * @param {Quat} b the second operand
 * @returns {quat} out
 * @function
 */
export declare const add: typeof vec4.add;
/**
 * Alias for {@link quat.multiply}
 * @function
 */
export declare const mul: typeof multiply;
/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {Quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
export declare const scale: typeof vec4.scale;
/**
 * Calculates the dot product of two quat's
 *
 * @param {Quat} a the first operand
 * @param {Quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
export declare const dot: typeof vec4.dot;
/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {Quat} a the first operand
 * @param {Quat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 * @function
 */
export declare const lerp: typeof vec4.lerp;
/**
 * Calculates the length of a quat
 *
 * @param {Quat} a vector to calculate length of
 * @returns {Number} length of a
 */
export declare const length: typeof vec4.length;
/**
 * Alias for {@link length}
 * @function
 */
export declare const len: typeof vec4.length;
/**
 * Calculates the squared length of a quat
 *
 * @param {Quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
export declare const squaredLength: typeof vec4.squaredLength;
/**
 * Alias for {@link squaredLength}
 * @function
 */
export declare const sqrLen: typeof vec4.squaredLength;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {Quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
export declare const normalize: typeof vec4.normalize;
/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {Quat} a The first quaternion.
 * @param {Quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export declare const exactEquals: typeof vec4.exactEquals;
/**
 * Returns whether or not the quaternions point approximately to the same direction.
 *
 * Both quaternions are assumed to be unit length.
 *
 * @param {Quat} a The first unit quaternion.
 * @param {Quat} b The second unit quaternion.
 * @returns {Boolean} True if the quaternions are equal, false otherwise.
 */
export declare function equals(a: Quat, b: Quat): boolean;
/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {Vec3} a the initial vector
 * @param {Vec3} b the destination vector
 * @returns {quat} out
 */
export declare const rotationTo: (out: Quat, a: Vec3, b: Vec3) => Float32ArrayLen4 | NumberArrayLen4;
/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {Quat} a the first operand
 * @param {Quat} b the second operand
 * @param {Quat} c the third operand
 * @param {Quat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */
export declare const sqlerp: (out: Quat, a: Quat, b: Quat, c: Quat, d: Quat, t: number) => Quat;
/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a Vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {Vec3} view  the vector representing the viewing direction
 * @param {Vec3} right the vector representing the local "right" direction
 * @param {Vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
export declare const setAxes: (out: Quat, view: Vec3, right: Vec3, up: Vec3) => vec4.Vec4;
