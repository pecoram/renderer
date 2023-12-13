import { type Float32ArrayLen8, type NumberArrayLen8 } from './common.js';
import type { Mat4 } from './mat4.js';
import type { Vec3 } from './vec3.js';
import type { Quat } from './quat.js';
export type Quat2 = Float32ArrayLen8 | NumberArrayLen8;
/**
 * Dual Quaternion<br>
 * Format: [real, dual]<br>
 * Quaternion format: XYZW<br>
 * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
 * @module quat2
 */
/**
 * Creates a new identity dual quat
 *
 * @returns {quat2} a new dual quaternion [real -> rotation, dual -> translation]
 */
export declare function create(): Quat2;
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {Quat2} a dual quaternion to clone
 * @returns {quat2} new dual quaternion
 * @function
 */
export declare function clone(a: Quat2): Quat2;
/**
 * Creates a new dual quat initialized with the given values
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} new dual quaternion
 * @function
 */
export declare function fromValues(x1: number, y1: number, z1: number, w1: number, x2: number, y2: number, z2: number, w2: number): Quat2;
/**
 * Creates a new dual quat from the given values (quat and translation)
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component (translation)
 * @param {Number} y2 Y component (translation)
 * @param {Number} z2 Z component (translation)
 * @returns {quat2} new dual quaternion
 * @function
 */
export declare function fromRotationTranslationValues(x1: number, y1: number, z1: number, w1: number, x2: number, y2: number, z2: number): Quat2;
/**
 * Creates a dual quat from a quaternion and a translation
 *
 * @param {Quat2} out quaternion receiving operation result
 * @param {Quat} q a normalized quaternion
 * @param {Vec3} t translation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */
export declare function fromRotationTranslation(out: Quat2, q: Quat | Quat2, t: Vec3): Quat2;
/**
 * Creates a dual quat from a translation
 *
 * @param {Quat2} dual quaternion receiving operation result
 * @param {Vec3} t translation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */
export declare function fromTranslation(out: Quat2, t: Vec3): Quat2;
/**
 * Creates a dual quat from a quaternion
 *
 * @param {Quat2} dual quaternion receiving operation result
 * @param {Quat} q the quaternion
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */
export declare function fromRotation(out: Quat2, q: Quat): Quat2;
/**
 * Creates a new dual quat from a matrix (4x4)
 *
 * @param {quat2} out the dual quaternion
 * @param {Mat4} a the matrix
 * @returns {quat2} dual quat receiving operation result
 * @function
 */
export declare function fromMat4(out: Quat2, a: Mat4): Quat2;
/**
 * Copy the values from one dual quat to another
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {Quat2} a the source dual quaternion
 * @returns {quat2} out
 * @function
 */
export declare function copy(out: Quat2, a: Quat2): Quat2;
/**
 * Set a dual quat to the identity dual quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @returns {quat2} out
 */
export declare function identity(out: Quat2): Quat2;
/**
 * Set the components of a dual quat to the given values
 *
 * @param {quat2} out the receiving quaternion
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} out
 * @function
 */
export declare function set(out: Quat2, x1: number, y1: number, z1: number, w1: number, x2: number, y2: number, z2: number, w2: number): Quat2;
/**
 * Gets the real part of a dual quat
 * @param  {quat} out real part
 * @param  {Quat2} a Dual Quaternion
 * @return {quat} real part
 */
export declare const getReal: typeof import("./vec4.js").copy;
/**
 * Gets the dual part of a dual quat
 * @param  {quat} out dual part
 * @param  {Quat2} a Dual Quaternion
 * @return {quat} dual part
 */
export declare function getDual(out: Quat, a: Quat2): Quat;
/**
 * Set the real component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {Quat} q a quaternion representing the real part
 * @returns {quat2} out
 * @function
 */
export declare const setReal: typeof import("./vec4.js").copy;
/**
 * Set the dual component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {Quat} q a quaternion representing the dual part
 * @returns {quat2} out
 * @function
 */
export declare function setDual(out: Quat2, q: Quat): Quat2;
/**
 * Gets the translation of a normalized dual quat
 * @param  {Vec3} out translation
 * @param  {Quat2} a Dual Quaternion to be decomposed
 * @return {Vec3} translation
 */
export declare function getTranslation(out: Vec3, a: Quat2): Vec3;
/**
 * Translates a dual quat by the given vector
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {Quat2} a the dual quaternion to translate
 * @param {Vec3} v vector to translate by
 * @returns {quat2} out
 */
export declare function translate(out: Quat2, a: Quat2, v: Vec3): Quat2;
/**
 * Rotates a dual quat around the X axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {Quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */
export declare function rotateX(out: Quat2, a: Quat2, rad: number): Quat2;
/**
 * Rotates a dual quat around the Y axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {Quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */
export declare function rotateY(out: Quat2, a: Quat2, rad: number): Quat2;
/**
 * Rotates a dual quat around the Z axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {Quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */
export declare function rotateZ(out: Quat2, a: Quat2, rad: number): Quat2;
/**
 * Rotates a dual quat by a given quaternion (a * q)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {Quat2} a the dual quaternion to rotate
 * @param {Quat} q quaternion to rotate by
 * @returns {quat2} out
 */
export declare function rotateByQuatAppend(out: Quat2, a: Quat2, q: Quat): Quat2;
/**
 * Rotates a dual quat by a given quaternion (q * a)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {Quat} q quaternion to rotate by
 * @param {Quat2} a the dual quaternion to rotate
 * @returns {quat2} out
 */
export declare function rotateByQuatPrepend(out: Quat2, q: Quat, a: Quat2): Quat2;
/**
 * Rotates a dual quat around a given axis. Does the normalisation automatically
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {Quat2} a the dual quaternion to rotate
 * @param {Vec3} axis the axis to rotate around
 * @param {Number} rad how far the rotation should be
 * @returns {quat2} out
 */
export declare function rotateAroundAxis(out: Quat2, a: Quat2, axis: Vec3, rad: number): Quat2;
/**
 * Adds two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {Quat2} a the first operand
 * @param {Quat2} b the second operand
 * @returns {quat2} out
 * @function
 */
export declare function add(out: Quat2, a: Quat2, b: Quat2): Quat2;
/**
 * Multiplies two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {Quat2} a the first operand
 * @param {Quat2} b the second operand
 * @returns {quat2} out
 */
export declare function multiply(out: Quat2, a: Quat2, b: Quat2): Quat2;
/**
 * Alias for {@link multiply}
 * @function
 */
export declare const mul: typeof multiply;
/**
 * Scales a dual quat by a scalar number
 *
 * @param {quat2} out the receiving dual quat
 * @param {Quat2} a the dual quat to scale
 * @param {Number} b amount to scale the dual quat by
 * @returns {quat2} out
 * @function
 */
export declare function scale(out: Quat2, a: Quat2, b: number): Quat2;
/**
 * Calculates the dot product of two dual quat's (The dot product of the real parts)
 *
 * @param {Quat2} a the first operand
 * @param {Quat2} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
export declare const dot: typeof import("./vec4.js").dot;
/**
 * Performs a linear interpolation between two dual quats's
 * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
 *
 * @param {quat2} out the receiving dual quat
 * @param {Quat2} a the first operand
 * @param {Quat2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat2} out
 */
export declare function lerp(out: Quat2, a: Quat2, b: Quat2, t: number): Quat2;
/**
 * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {Quat2} a dual quat to calculate inverse of
 * @returns {quat2} out
 */
export declare function invert(out: Quat2, a: Quat2): Quat2;
/**
 * Calculates the conjugate of a dual quat
 * If the dual quaternion is normalized, this function is faster than quat2.inverse and produces the same result.
 *
 * @param {quat2} out the receiving quaternion
 * @param {Quat2} a quat to calculate conjugate of
 * @returns {quat2} out
 */
export declare function conjugate(out: Quat2, a: Quat2): Quat2;
/**
 * Calculates the length of a dual quat
 *
 * @param {Quat2} a dual quat to calculate length of
 * @returns {Number} length of a
 * @function
 */
export declare const length: typeof import("./vec4.js").length;
/**
 * Alias for {@link length}
 * @function
 */
export declare const len: typeof import("./vec4.js").length;
/**
 * Calculates the squared length of a dual quat
 *
 * @param {Quat2} a dual quat to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
export declare const squaredLength: typeof import("./vec4.js").squaredLength;
/**
 * Alias for {@link quat2.squaredLength}
 * @function
 */
export declare const sqrLen: typeof import("./vec4.js").squaredLength;
/**
 * Normalize a dual quat
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {Quat2} a dual quaternion to normalize
 * @returns {quat2} out
 * @function
 */
export declare function normalize(out: Quat2, a: Quat2): Quat2;
/**
 * Returns a string representation of a dual quaternion
 *
 * @param {Quat2} a dual quaternion to represent as a string
 * @returns {String} string representation of the dual quat
 */
export declare function str(a: Quat2): string;
/**
 * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {Quat2} a the first dual quaternion.
 * @param {Quat2} b the second dual quaternion.
 * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
 */
export declare function exactEquals(a: Quat2, b: Quat2): boolean;
/**
 * Returns whether or not the dual quaternions have approximately the same elements in the same position.
 *
 * @param {Quat2} a the first dual quat.
 * @param {Quat2} b the second dual quat.
 * @returns {Boolean} true if the dual quats are equal, false otherwise.
 */
export declare function equals(a: Quat2, b: Quat2): boolean;
