/**
 * Number of floating point numbers that represent a single glyph in the SDF vertex buffer.
 *
 * @remarks
 * The vertex buffer contains:
 *  - 6 vertex positions
 *  - 6 texture coordinates
 *  - = 12 positions/coordinates per glyph
 *
 * Each vertex position and texture coordinate consist of 2 floating point numbers (x/y).
 * So there are 12 * 2 = 24 floating point numbers that make up a single glyph.
 */
export declare const FLOATS_PER_GLYPH = 24;
