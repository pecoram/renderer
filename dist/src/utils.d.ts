export declare function createWebGLContext(canvas: HTMLCanvasElement | OffscreenCanvas): WebGLRenderingContext | null;
/**
 * Asserts a condition is truthy, otherwise throws an error
 *
 * @remarks
 * Useful at the top of functions to ensure certain conditions, arguments and
 * properties are set/met before continuing. When using this function,
 * TypeScript will narrow away falsy types from the condition.
 *
 * @param condition
 * @param message
 * @returns
 */
export declare function assertTruthy(condition: unknown, message?: string): asserts condition;
/**
 * Merges two colors based on a given progress value.
 *
 * This function takes two colors (c1 and c2) represented as 32-bit integers
 * in RGBA format and blends them based on the provided progress value (p).
 * The result is a new color that is a weighted combination of the input colors,
 * where the weight is determined by the progress value.
 *
 * @param {number} c1 - The first color in RGBA format (32-bit integer).
 * @param {number} c2 - The second color in RGBA format (32-bit integer).
 * @param {number} p - The progress value between 0 and 1.
 * @returns {number} The merged color as a 32-bit integer in RGBA format.
 */
export declare function mergeColorProgress(rgba1: number, rgba2: number, p: number): number;
/**
 * Given an RGBA encoded number, returns back the RGBA number with it's alpha
 * component multiplied by the passed `alpha` parameter.
 *
 * @internalRemarks
 * This method does NOT premultiply the alpha into the color channels. If that
 * is required (for internal use only) use {@link mergeColorAlphaPremultiplied}
 * instead.
 *
 * @param rgba RGBA encoded number
 * @param alpha Normalized alpha value (Range: 0.0 - 1.0)
 * @returns
 */
export declare function mergeColorAlpha(rgba: number, alpha: number): number;
/**
 * Given an RGBA encoded number, returns back the RGBA number with it's alpha
 * component multiplied by the passed `alpha` parameter. Before returning, the
 * final alpha value is multiplied into the color channels.
 *
 * @remarks
 * If `flipEndianess` is set to true, the function will returned an ABGR encoded number
 * which is useful when the color value needs to be passed into a shader attribute.
 *
 * NOTE: This method returns a PREMULTIPLIED alpha color which is generally only useful
 * in the context of the internal rendering process. Use {@link mergeColorAlpha} if you
 * need to blend an alpha value into a color in the context of the Renderer's
 * main API.
 *
 * @internalRemarks
 * Do not expose this method in the main API because Renderer users should instead use
 * {@link mergeColorAlpha} to manipulate the alpha value of a color.
 *
 * @internal
 * @param rgba RGBA encoded number
 * @param alpha Normalized alpha value (Range: 0.0 - 1.0)
 * @param flipEndianess Flip the endianess. RGBA becomes encoded as ABGR (for inserting colors into shader attributes)
 * @returns
 */
export declare function mergeColorAlphaPremultiplied(rgba: number, alpha: number, flipEndianess?: boolean): number;
/**
 * Returns true if the given object has the given "own" property.
 *
 * @param obj
 * @param prop
 * @returns
 */
export declare function hasOwn(obj: object, prop: string | number | symbol): boolean;
/**
 * Converts degrees to radians
 *
 * @param degrees
 * @returns
 */
export declare function deg2Rad(degrees: number): number;
