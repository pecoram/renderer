import { type DefaultEffectProps, ShaderEffect, type ShaderEffectUniforms } from './ShaderEffect.js';
/**
 * Properties of the {@link LinearGradientEffect} effect
 */
export interface LinearGradientEffectProps extends DefaultEffectProps {
    /**
     * Array of colors to be used in the LinearGradientEffect
     *
     * @default [0xff000000, 0xffffffff]
     */
    colors?: number[];
    /**
     * Angle of the LinearGradientEffect, Angle in Radians
     *
     * @default 0
     */
    angle?: number;
    /**
     * Array of color stops
     */
    stops?: number[];
}
/**
 * Linear Gradient effect over a effect mask
 */
export declare class LinearGradientEffect extends ShaderEffect {
    static z$__type__Props: LinearGradientEffectProps;
    readonly name = "linearGradient";
    static getEffectKey(props: LinearGradientEffectProps): string;
    static resolveDefaults(props: LinearGradientEffectProps): Required<LinearGradientEffectProps>;
    static uniforms: ShaderEffectUniforms;
    static methods: Record<string, string>;
    static ColorLoop: (amount: number) => string;
    static onColorize: (props: LinearGradientEffectProps) => string;
}
