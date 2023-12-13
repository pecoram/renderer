import { ShaderEffect } from './ShaderEffect.js';
/**
 * Grayscale effect grayscales the color values of the current mask color
 */
export declare class GrayscaleEffect extends ShaderEffect {
    readonly name = "grayscale";
    static getEffectKey(): string;
    static onColorize: string;
}
