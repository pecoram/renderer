/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Matrix3d is a 3x3 matrix in column-major order because that's how WebGL likes it.
// The matrix is stored in a Float32Array in the following order:
// | 0 3 6 |
// | 1 4 7 |
// | 2 5 8 |
// The following constants are used to index into the array in a row-major way.
const m0 = 0;
const m1 = 3;
const m2 = 6;
const m3 = 1;
const m4 = 4;
const m5 = 7;
const m6 = 2;
const m7 = 5;
const m8 = 8;
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
export class Matrix3d {
    data;
    /**
     * Creates a new 3x3 matrix.
     *
     * @param entries Row-major 3x3 matrix
     */
    constructor(entries) {
        if (entries) {
            // Transpose the input matrix so that it's in column-major order.
            this.data = new Float32Array(9);
            this.data[m0] = entries[0];
            this.data[m1] = entries[3];
            this.data[m2] = entries[6];
            this.data[m3] = entries[1];
            this.data[m4] = entries[4];
            this.data[m5] = entries[7];
            this.data[m6] = entries[2];
            this.data[m7] = entries[5];
            this.data[m8] = entries[8];
        }
        else {
            this.data = new Float32Array(9);
        }
    }
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
    static get temp() {
        return tempMatrix;
    }
    static multiply(a, b, out) {
        const e0 = a.data[m0] * b.data[m0] +
            a.data[m1] * b.data[m3] +
            a.data[m2] * b.data[m6];
        const e1 = a.data[m0] * b.data[m1] +
            a.data[m1] * b.data[m4] +
            a.data[m2] * b.data[m7];
        const e2 = a.data[m0] * b.data[m2] +
            a.data[m1] * b.data[m5] +
            a.data[m2] * b.data[m8];
        const e3 = a.data[m3] * b.data[m0] +
            a.data[m4] * b.data[m3] +
            a.data[m5] * b.data[m6];
        const e4 = a.data[m3] * b.data[m1] +
            a.data[m4] * b.data[m4] +
            a.data[m5] * b.data[m7];
        const e5 = a.data[m3] * b.data[m2] +
            a.data[m4] * b.data[m5] +
            a.data[m5] * b.data[m8];
        const e6 = a.data[m6] * b.data[m0] +
            a.data[m7] * b.data[m3] +
            a.data[m8] * b.data[m6];
        const e7 = a.data[m6] * b.data[m1] +
            a.data[m7] * b.data[m4] +
            a.data[m8] * b.data[m7];
        const e8 = a.data[m6] * b.data[m2] +
            a.data[m7] * b.data[m5] +
            a.data[m8] * b.data[m8];
        if (!out) {
            out = new Matrix3d();
        }
        out.data[m0] = e0;
        out.data[m1] = e1;
        out.data[m2] = e2;
        out.data[m3] = e3;
        out.data[m4] = e4;
        out.data[m5] = e5;
        out.data[m6] = e6;
        out.data[m7] = e7;
        out.data[m8] = e8;
        return out;
    }
    static identity(out) {
        if (!out) {
            out = new Matrix3d();
        }
        out.data[m0] = 1;
        out.data[m1] = 0;
        out.data[m2] = 0;
        out.data[m3] = 0;
        out.data[m4] = 1;
        out.data[m5] = 0;
        out.data[m6] = 0;
        out.data[m7] = 0;
        out.data[m8] = 1;
        return out;
    }
    static translate(x, y, out) {
        if (!out) {
            out = new Matrix3d();
        }
        out.data[m0] = 1;
        out.data[m1] = 0;
        out.data[m2] = x;
        out.data[m3] = 0;
        out.data[m4] = 1;
        out.data[m5] = y;
        out.data[m6] = 0;
        out.data[m7] = 0;
        out.data[m8] = 1;
        return out;
    }
    static scale(sx, sy, out) {
        if (!out) {
            out = new Matrix3d();
        }
        out.data[m0] = sx;
        out.data[m1] = 0;
        out.data[m2] = 0;
        out.data[m3] = 0;
        out.data[m4] = sy;
        out.data[m5] = 0;
        out.data[m6] = 0;
        out.data[m7] = 0;
        out.data[m8] = 1;
        return out;
    }
    static rotate(angle, out) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        if (!out) {
            out = new Matrix3d();
        }
        out.data[m0] = cos;
        out.data[m1] = -sin;
        out.data[m2] = 0;
        out.data[m3] = sin;
        out.data[m4] = cos;
        out.data[m5] = 0;
        out.data[m6] = 0;
        out.data[m7] = 0;
        out.data[m8] = 1;
        return out;
    }
    static copy(src, dst, transpose) {
        if (!dst) {
            dst = new Matrix3d();
        }
        dst.data[0] = src.data[0];
        dst.data[1] = src.data[1];
        dst.data[2] = src.data[2];
        dst.data[3] = src.data[3];
        dst.data[4] = src.data[4];
        dst.data[5] = src.data[5];
        dst.data[6] = src.data[6];
        dst.data[7] = src.data[7];
        dst.data[8] = src.data[8];
        return dst;
    }
    translate(x, y) {
        this.data[m2] = this.data[m0] * x + this.data[m1] * y + this.data[m2];
        this.data[m5] = this.data[m3] * x + this.data[m4] * y + this.data[m5];
        return this;
    }
    scale(sx, sy) {
        this.data[m0] = this.data[m0] * sx;
        this.data[m1] = this.data[m1] * sy;
        this.data[m3] = this.data[m3] * sx;
        this.data[m4] = this.data[m4] * sy;
        return this;
    }
    rotate(angle) {
        if (angle === 0 || !((angle % Math.PI) * 2)) {
            return this;
        }
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const e0 = this.data[m0] * cos + this.data[m1] * sin;
        const e1 = this.data[m1] * cos - this.data[m0] * sin;
        const e3 = this.data[m3] * cos + this.data[m4] * sin;
        const e4 = this.data[m4] * cos - this.data[m3] * sin;
        this.data[m0] = e0;
        this.data[m1] = e1;
        this.data[m3] = e3;
        this.data[m4] = e4;
        return this;
    }
    multiply(other) {
        return Matrix3d.multiply(this, other, this);
    }
    get tx() {
        return this.data[m2];
    }
    get ty() {
        return this.data[m5];
    }
    get ta() {
        return this.data[m0];
    }
    get tb() {
        return this.data[m1];
    }
    get tc() {
        return this.data[m3];
    }
    get td() {
        return this.data[m4];
    }
    transformPoint(x, y) {
        return [
            this.data[m0] * x + this.data[m1] * y + this.data[m2],
            this.data[m3] * x + this.data[m4] * y + this.data[m3],
        ];
    }
}
const tempMatrix = new Matrix3d();
//# sourceMappingURL=Matrix3d.js.map