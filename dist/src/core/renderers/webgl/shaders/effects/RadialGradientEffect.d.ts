import { type DefaultEffectProps, ShaderEffect, type ShaderEffectUniforms } from './ShaderEffect.js';
/**
 * Properties of the {@link RadialGradientEffect} effect
 */
export interface RadialGradientEffectProps extends DefaultEffectProps {
    /**
     * Array of colors to be used in the RadialGradientEffect
     *
     * @default [0xff000000, 0xffffffff]
     */
    colors?: number[];
    /**
     * Array of color stops
     */
    stops?: number[];
    /**
     * Width of the RadialGradientEffect
     */
    width?: number;
    /**
     * height of the RadialGradientEffect
     *
     * @remarks if not defined uses the width value
     */
    height?: number;
    /**
     * center point of where the RadialGradientEffect is drawn
     */
    pivot?: number[];
}
export declare class RadialGradientEffect extends ShaderEffect {
    static z$__type__Props: RadialGradientEffectProps;
    readonly name = "radialGradient";
    static getEffectKey(props: RadialGradientEffectProps): string;
    static resolveDefaults(props: RadialGradientEffectProps): Required<RadialGradientEffectProps>;
    static uniforms: ShaderEffectUniforms;
    static onColorize: (props: RadialGradientEffectProps) => string;
}
