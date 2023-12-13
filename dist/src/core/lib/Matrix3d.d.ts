/**
 * A 3x3 matrix representing a 2D transformation.
 *
 * @remarks
 * The matrix is stored in column-major order in the `data` property which can
 * be passed directly to a WebGL shader uniform.
 *
 * The matrix is stored in a Float32Array in the following index order:
 * | 0 3 6 |
 * | 1 4 7 |
 * | 2 5 8 |
 *
 * Only the first two rows are really used for the transformation. The last row is
 * generally always `[0, 0, 1]` if you only use the 2D transformation methods
 * provided by this class.
 *
 * For convenience, entries in the first two rows can be accessed by the following
 * getter properties:
 * | ta tb tx |
 * | tc td ty |
 * | 0  0  1  |
 */
export declare class Matrix3d {
    data: Float32Array;
    /**
     * Creates a new 3x3 matrix.
     *
     * @param entries Row-major 3x3 matrix
     */
    constructor(entries?: [number, number, number, number, number, number, number, number, number] | Float32Array);
    /**
     * Returns a temporary matrix that can be used for calculations.
     *
     * @remarks
     * This is useful for avoiding allocations in tight loops.
     *
     * The matrix is not guaranteed to be the same between calls.
     *
     * @returns
     */
    static get temp(): Matrix3d;
    static multiply(a: Matrix3d, b: Matrix3d, out?: Matrix3d): Matrix3d;
    static identity(out?: Matrix3d): Matrix3d;
    static translate(x: number, y: number, out?: Matrix3d): Matrix3d;
    static scale(sx: number, sy: number, out?: Matrix3d): Matrix3d;
    static rotate(angle: number, out?: Matrix3d): Matrix3d;
    static copy(src: Matrix3d, dst?: Matrix3d, transpose?: boolean): Matrix3d;
    translate(x: number, y: number): Matrix3d;
    scale(sx: number, sy: number): Matrix3d;
    rotate(angle: number): Matrix3d;
    multiply(other: Matrix3d): Matrix3d;
    get tx(): number;
    get ty(): number;
    get ta(): number;
    get tb(): number;
    get tc(): number;
    get td(): number;
    transformPoint(x: number, y: number): [number, number];
}
