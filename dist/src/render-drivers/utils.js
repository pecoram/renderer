import { CoreExtension } from '../../exports/core-api.js';
/**
 * Type guard that checks if a Class extends CoreExtension.
 *
 * @param Class
 * @returns
 */
export function classExtendsCoreExtension(Class) {
    return Class.prototype instanceof CoreExtension;
}
export async function loadCoreExtension(coreExtensionModule, stage) {
    let module;
    try {
        console.log('Loading core extension', coreExtensionModule);
        module = (await import(coreExtensionModule /* @vite-ignore */));
    }
    catch (e) {
        console.error(`The core extension module at '${coreExtensionModule}' could not be loaded.`);
        console.error(e);
        return;
    }
    if (!module.default) {
        console.error(`The core extension module at '${coreExtensionModule}' does not have a default export.`);
        return;
    }
    const ExtensionClass = module.default;
    if (classExtendsCoreExtension(ExtensionClass)) {
        const coreExtension = new ExtensionClass();
        try {
            await coreExtension.run(stage);
        }
        catch (e) {
            console.error(`The core extension at '${coreExtensionModule}' threw an error.`);
            console.error(e);
        }
    }
    else {
        console.error(`The core extension at '${coreExtensionModule}' does not extend CoreExtension.`);
    }
}
//# sourceMappingURL=utils.js.map