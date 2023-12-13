/**
 * Lightning 3 Renderer Main API
 *
 * @remarks
 * This module exports the Main API for the Lightning 3 Renderer. You
 * can import the exports from this module like so:
 * ```ts
 * import { RendererMain } from '@lightning/renderer';
 * ```
 *
 * Generally developers/frameworks using the Renderer will use the Main API to
 * render applications.
 *
 * Do not confuse the Main API with the Core API which is used to extend
 * capabilities of the Renderer. The Main API code always runs from the main
 * thread.
 *
 * @module
 */
export * from '../src/main-api/INode.js';
export * from '../src/main-api/IRenderDriver.js';
export * from '../src/main-api/RendererMain.js';
export * from '../src/render-drivers/main/MainRenderDriver.js';
export * from '../src/render-drivers/threadx/ThreadXRenderDriver.js';
export * from '../src/common/IAnimationController.js';
export * from '../src/common/CommonTypes.js';
export type { TextRendererMap } from '../src/core/text-rendering/renderers/TextRenderer.js';
export type { TrFontFaceMap } from '../src/core/text-rendering/font-face-types/TrFontFace.js';
export type { AnimationSettings } from '../src/core/animations/CoreAnimation.js';
