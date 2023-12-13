import { ShaderEffect, type DefaultEffectProps, type ShaderEffectUniforms } from './ShaderEffect.js';
/**
 * Properties of the {@link BorderTopEffect} effect
 */
export interface BorderTopEffectProps extends DefaultEffectProps {
    /**
     * Width of the border in pixels
     *
     * @default 10
     */
    width?: number;
    /**
     * Color of the border in 0xRRGGBBAA
     *
     * @default 0xffffffff
     */
    color?: number;
}
/**
 * The BorderBottomEffect renders a border on the top side of an element
 */
export declare class BorderTopEffect extends ShaderEffect {
    static z$__type__Props: BorderTopEffectProps;
    readonly name = "borderTop";
    static getEffectKey(): string;
    static resolveDefaults(props: BorderTopEffectProps): Required<BorderTopEffectProps>;
    static uniforms: ShaderEffectUniforms;
    static methods: Record<string, string>;
    static onEffectMask: string;
    static onColorize: string;
}
