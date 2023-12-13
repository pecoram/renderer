/**
 *  Represents a 2D transformation context, providing a 2x2 matrix for transformations.
 */
export declare class Matrix2DContext {
    alpha: number;
    px: number;
    py: number;
    ta: number;
    tb: number;
    tc: number;
    td: number;
    isIdentity(): boolean;
    isIdentityMatrix(): boolean;
    isSquare(): boolean;
}
