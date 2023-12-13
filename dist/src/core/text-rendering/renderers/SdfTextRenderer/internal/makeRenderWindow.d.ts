import { type Bound } from '../../../../lib/utils.js';
import type { TrProps } from '../../TextRenderer.js';
/**
 * Create a render window from the given parameters.
 *
 * @remarks
 * The render window is a rectangle that defines the area of the text that
 * should be rendered. It is used to skip rendering parts of the text that
 * are outside of the render window. The render window is relative to the
 * text's top left corner of the overrall text.
 *
 * @param x The x coordinate of the text element's top left corner relative to the screen.
 * @param y The y coordinate of the text element's top left corner relative to the screen.
 * @param scrollY The amount of pixels to scroll the text vertically.
 * @param lineHeight The height of a single line of text.
 * @param numExtraLines The number of extra lines to render above and below the visible window.
 * @param visibleWindow The visible window of the text element relative to the screen
 * @returns
 */
export declare function makeRenderWindow(x: TrProps['x'], y: TrProps['y'], scrollY: TrProps['scrollY'], lineHeight: number, numExtraLines: number, visibleWindow: Bound): Bound;
