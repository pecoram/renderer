import { CoreExtension } from '../../exports/core-api.js';
import type { Stage } from '../core/Stage.js';
/**
 * Type guard that checks if a Class extends CoreExtension.
 *
 * @param Class
 * @returns
 */
export declare function classExtendsCoreExtension(Class: unknown): Class is new () => CoreExtension;
export declare function loadCoreExtension(coreExtensionModule: string, stage: Stage): Promise<void>;
