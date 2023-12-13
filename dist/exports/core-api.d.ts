/**
 * Lightning 3 Renderer Core API
 *
 * @remarks
 * ```
 * import * from '@lightning/renderer/core';
 * ```
 *
 * The Core API is used by developers to extend the capabilities of the Renderer
 * by writing custom Shaders, Dynamic Shader Effects, Textures, Text Renderers,
 * etc.
 *
 * Custom capabilities as well as fonts can be loaded via Core Extensions.
 *
 * A core extension module is structured like so:
 * ```ts
 * import {
 *   CoreExtension,
 *   WebTrFontFace,
 *   SdfTrFontFace,
 *   type Stage
 * } from '@lightning/renderer/core';
 *
 * export default class MyCoreExtension extends CoreExtension {
 *   async run(stage: Stage) {
 *     stage.fontManager.addFontFace(
 *       new WebTrFontFace('Ubuntu', {}, '/fonts/Ubuntu-Regular.ttf'),
 *     );
 *
 *     stage.fontManager.addFontFace(
 *       new SdfTrFontFace(
 *         'Ubuntu',
 *         {},
 *         'msdf',
 *         stage,
 *         '/fonts/Ubuntu-Regular.msdf.png',
 *         '/fonts/Ubuntu-Regular.msdf.json',
 *       ),
 *     );
 *   }
 * }
 * ```
 *
 * And then imported and registered in the application's entry point
 * using the `@lightningjs/vite-plugin-import-chunk-url` plugin:
 * ```ts
 * import coreExtensionModuleUrl from './MyCoreExtension.js?importChunkUrl';
 *
 * // Set up driver, etc.
 *
 * // Initialize the Renderer
 * const renderer = new RendererMain(
 *   {
 *     // Other Renderer Config...
 *     coreExtensionModule: coreExtensionModuleUrl,
 *   },
 *   'app',
 *   driver,
 * );
 * ```
 *
 * @module
 */
export * from '../src/core/renderers/webgl/WebGlCoreShader.js';
export * from '../src/core/renderers/webgl/shaders/effects/ShaderEffect.js';
export * from '../src/core/textures/Texture.js';
export * from '../src/core/text-rendering/renderers/TextRenderer.js';
export * from '../src/core/text-rendering/renderers/CanvasTextRenderer.js';
export * from '../src/core/text-rendering/renderers/SdfTextRenderer/SdfTextRenderer.js';
export * from '../src/core/text-rendering/font-face-types/TrFontFace.js';
export * from '../src/core/text-rendering/font-face-types/WebTrFontFace.js';
export * from '../src/core/text-rendering/font-face-types/SdfTrFontFace/SdfTrFontFace.js';
export * from '../src/core/CoreExtension.js';
export type * from '../src/core/Stage.js';
