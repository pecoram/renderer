import type { Stage } from './Stage.js';
/**
 * Base class for Core extensions.
 *
 * @remarks
 * Core extensions are used to extend the Core Renderer with custom code such as
 * custom fonts, custom shaders, custom textures, custom animation functions,
 * and more.
 */
export declare abstract class CoreExtension {
    abstract run(stage: Stage): Promise<void>;
}
