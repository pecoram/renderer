import { type FOV, type Float32ArrayLen16, type NumberArrayLen16 } from './common.js';
import type { Vec3 } from './vec3.js';
import type { Quat } from './quat.js';
import type { Quat2 } from './quat2.js';
export type Mat4 = Float32ArrayLen16 | NumberArrayLen16;
/**
 * Creates a new identity Mat4
 *
 * @returns {Mat4} a new 4x4 matrix
 */
export declare function create(): Mat4;
/**
 * Creates a new Mat4 initialized with values from an existing matrix
 *
 * @param {Mat4} a matrix to clone
 * @returns {Mat4} a new 4x4 matrix
 */
export declare function clone(a: Mat4): Mat4;
/**
 * Copy the values from one Mat4 to another
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the source matrix
 * @returns {Mat4} out
 */
export declare function copy(out: Mat4, a: Mat4): Mat4;
/**
 * Create a new Mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {Mat4} A new Mat4
 */
export declare function fromValues(m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): Mat4;
/**
 * Set the components of a Mat4 to the given values
 *
 * @param {Mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {Mat4} out
 */
export declare function set(out: Mat4, m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): Mat4;
/**
 * Set a Mat4 to the identity matrix
 *
 * @param {Mat4} out the receiving matrix
 * @returns {Mat4} out
 */
export declare function identity(out: Mat4): Mat4;
/**
 * Transpose the values of a Mat4
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the source matrix
 * @returns {Mat4} out
 */
export declare function transpose(out: Mat4, a: Mat4): Mat4;
/**
 * Inverts a Mat4
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the source matrix
 * @returns {Mat4} out
 */
export declare function invert(out: Mat4, a: Mat4): Mat4 | null;
/**
 * Calculates the adjugate of a Mat4
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the source matrix
 * @returns {Mat4} out
 */
export declare function adjoint(out: Mat4, a: Mat4): Mat4;
/**
 * Calculates the determinant of a Mat4
 *
 * @param {Mat4} a the source matrix
 * @returns {Number} determinant of a
 */
export declare function determinant(a: Mat4): number;
/**
 * Multiplies two Mat4s
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the first operand
 * @param {Mat4} b the second operand
 * @returns {Mat4} out
 */
export declare function multiply(out: Mat4, a: Mat4, b: Mat4): Mat4;
/**
 * Translate a Mat4 by the given vector
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the matrix to translate
 * @param {Vec3} v vector to translate by
 * @returns {Mat4} out
 */
export declare function translate(out: Mat4, a: Mat4, v: Vec3): Mat4;
/**
 * Scales the Mat4 by the dimensions in the given Vec3 not using vectorization
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the matrix to scale
 * @param {Vec3} v the Vec3 to scale the matrix by
 * @returns {Mat4} out
 **/
export declare function scale(out: Mat4, a: Mat4, v: Mat4): Mat4;
/**
 * Rotates a Mat4 by the given angle around the given axis
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {Vec3} axis the axis to rotate around
 * @returns {Mat4} out
 */
export declare function rotate(out: Mat4, a: Mat4, rad: number, axis: Vec3): Mat4 | null;
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat4} out
 */
export declare function rotateX(out: Mat4, a: Mat4, rad: number): Mat4;
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat4} out
 */
export declare function rotateY(out: Mat4, a: Mat4, rad: number): Mat4;
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat4} out
 */
export declare function rotateZ(out: Mat4, a: Mat4, rad: number): Mat4;
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.translate(dest, dest, vec);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {Vec3} v Translation vector
 * @returns {Mat4} out
 */
export declare function fromTranslation(out: Mat4, v: Vec3): Mat4;
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.scale(dest, dest, vec);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {Vec3} v Scaling vector
 * @returns {Mat4} out
 */
export declare function fromScaling(out: Mat4, v: Vec3): Mat4;
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.rotate(dest, dest, rad, axis);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {Vec3} axis the axis to rotate around
 * @returns {Mat4} out
 */
export declare function fromRotation(out: Mat4, rad: number, axis: Vec3): Mat4 | null;
/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.rotateX(dest, dest, rad);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat4} out
 */
export declare function fromXRotation(out: Mat4, rad: number): Mat4;
/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.rotateY(dest, dest, rad);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat4} out
 */
export declare function fromYRotation(out: Mat4, rad: number): Mat4;
/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.rotateZ(dest, dest, rad);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat4} out
 */
export declare function fromZRotation(out: Mat4, rad: number): Mat4;
/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.translate(dest, vec);
 *     let quatMat = Mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     Mat4.multiply(dest, quatMat);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {Vec3} v Translation vector
 * @returns {Mat4} out
 */
export declare function fromRotationTranslation(out: Mat4, q: Quat | Quat2, v: Vec3): Mat4;
/**
 * Creates a new Mat4 from a dual quat.
 *
 * @param {Mat4} out Matrix
 * @param {Quat2} a Dual Quaternion
 * @returns {Mat4} Mat4 receiving operation result
 */
export declare function fromQuat2(out: Mat4, a: Quat2): Mat4;
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {Vec3} out Vector to receive translation component
 * @param  {Mat4} mat Matrix to be decomposed (input)
 * @return {Vec3} out
 */
export declare function getTranslation(out: Vec3, mat: Mat4): Vec3;
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {Vec3} out Vector to receive scaling factor component
 * @param  {Mat4} mat Matrix to be decomposed (input)
 * @return {Vec3} out
 */
export declare function getScaling(out: Vec3, mat: Mat4): Vec3;
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {Mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
export declare function getRotation(out: Quat, mat: Mat4): Quat;
/**
 * Decomposes a transformation matrix into its rotation, translation
 * and scale components. Returns only the rotation component
 * @param  {quat} out_r Quaternion to receive the rotation component
 * @param  {Vec3} out_t Vector to receive the translation vector
 * @param  {Vec3} out_s Vector to receive the scaling factor
 * @param  {Mat4} mat Matrix to be decomposed (input)
 * @returns {quat} out_r
 */
export declare function decompose(out_r: Quat, out_t: Vec3, out_s: Vec3, mat: Mat4): Quat;
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.translate(dest, vec);
 *     let quatMat = Mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     Mat4.multiply(dest, quatMat);
 *     Mat4.scale(dest, scale)
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {Vec3} v Translation vector
 * @param {Vec3} s Scaling vector
 * @returns {Mat4} out
 */
export declare function fromRotationTranslationScale(out: Mat4, q: Quat, v: Vec3, s: Vec3): Mat4;
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.translate(dest, vec);
 *     Mat4.translate(dest, origin);
 *     let quatMat = Mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     Mat4.multiply(dest, quatMat);
 *     Mat4.scale(dest, scale)
 *     Mat4.translate(dest, negativeOrigin);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {Vec3} v Translation vector
 * @param {Vec3} s Scaling vector
 * @param {Vec3} o The origin vector around which to scale and rotate
 * @returns {Mat4} out
 */
export declare function fromRotationTranslationScaleOrigin(out: Mat4, q: Quat, v: Vec3, s: Vec3, o: Vec3): Mat4;
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {Quat} q Quaternion to create matrix from
 *
 * @returns {Mat4} out
 */
export declare function fromQuat(out: Mat4, q: Quat): Mat4;
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {Mat4} out
 */
export declare function frustum(out: Mat4, left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4;
/**
 * Generates a perspective projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {Mat4} out
 */
export declare function perspectiveNO(out: Mat4, fovy: number, aspect: number, near: number, far: number): Mat4;
/**
 * Alias for {@link perspectiveNO}
 * @function
 */
export declare const perspective: typeof perspectiveNO;
/**
 * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {Mat4} out
 */
export declare function perspectiveZO(out: Mat4, fovy: number, aspect: number, near: number, far: number): Mat4;
/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {Mat4} out
 */
export declare function perspectiveFromFieldOfView(out: Mat4, fov: FOV, near: number, far: number): Mat4;
/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {Mat4} out
 */
export declare function orthoNO(out: Mat4, left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4;
/**
 * Alias for {@link orthoNO}
 * @function
 */
export declare const ortho: typeof orthoNO;
/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {Mat4} out
 */
export declare function orthoZO(out: Mat4, left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4;
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {Vec3} eye Position of the viewer
 * @param {Vec3} center Point the viewer is looking at
 * @param {Vec3} up Vec3 pointing up
 * @returns {Mat4} out
 */
export declare function lookAt(out: Mat4, eye: Vec3, center: Vec3, up: Vec3): Mat4;
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {Vec3} eye Position of the viewer
 * @param {Vec3} center Point the viewer is looking at
 * @param {Vec3} up Vec3 pointing up
 * @returns {Mat4} out
 */
export declare function targetTo(out: Mat4, eye: Vec3, target: Vec3, up: Vec3): Mat4;
/**
 * Returns a string representation of a Mat4
 *
 * @param {Mat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
export declare function str(a: Mat4): string;
/**
 * Returns Frobenius norm of a Mat4
 *
 * @param {Mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
export declare function frob(a: Mat4): number;
/**
 * Adds two Mat4's
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the first operand
 * @param {Mat4} b the second operand
 * @returns {Mat4} out
 */
export declare function add(out: Mat4, a: Mat4, b: Mat4): Mat4;
/**
 * Subtracts matrix b from matrix a
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the first operand
 * @param {Mat4} b the second operand
 * @returns {Mat4} out
 */
export declare function subtract(out: Mat4, a: Mat4, b: Mat4): Mat4;
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {Mat4} out the receiving matrix
 * @param {Mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {Mat4} out
 */
export declare function multiplyScalar(out: Mat4, a: Mat4, b: number): Mat4;
/**
 * Adds two Mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {Mat4} out the receiving vector
 * @param {Mat4} a the first operand
 * @param {Mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {Mat4} out
 */
export declare function multiplyScalarAndAdd(out: Mat4, a: Mat4, b: Mat4, scale: number): Mat4;
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {Mat4} a The first matrix.
 * @param {Mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
export declare function exactEquals(a: Mat4, b: Mat4): boolean;
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {Mat4} a The first matrix.
 * @param {Mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
export declare function equals(a: Mat4, b: Mat4): boolean;
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
