import { ShaderEffect, type DefaultEffectProps, type ShaderEffectUniforms } from './ShaderEffect.js';
/**
 * Properties of the {@link BorderRightEffect} effect
 */
export interface BorderRightEffectProps extends DefaultEffectProps {
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
 * The BorderBottomEffect renders a border on the right side of an element
 */
export declare class BorderRightEffect extends ShaderEffect {
    static z$__type__Props: BorderRightEffectProps;
    readonly name = "borderRight";
    static getEffectKey(): string;
    static resolveDefaults(props: BorderRightEffectProps): Required<BorderRightEffectProps>;
    static uniforms: ShaderEffectUniforms;
    static methods: Record<string, string>;
    static onEffectMask: string;
    static onColorize: string;
}
