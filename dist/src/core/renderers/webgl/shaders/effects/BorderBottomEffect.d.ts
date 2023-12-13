import { ShaderEffect, type DefaultEffectProps, type ShaderEffectUniforms } from './ShaderEffect.js';
/**
 * Properties of the {@link BorderBottomEffect} effect
 */
export interface BorderBottomEffectProps extends DefaultEffectProps {
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
 * The BorderBottomEffect renders a border on the bottom side of an element
 */
export declare class BorderBottomEffect extends ShaderEffect {
    static z$__type__Props: BorderBottomEffectProps;
    readonly name = "borderBottom";
    static getEffectKey(): string;
    static resolveDefaults(props: BorderBottomEffectProps): Required<BorderBottomEffectProps>;
    static uniforms: ShaderEffectUniforms;
    static methods: Record<string, string>;
    static onEffectMask: string;
    static onColorize: string;
}
