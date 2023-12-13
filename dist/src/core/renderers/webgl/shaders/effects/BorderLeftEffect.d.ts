import { ShaderEffect, type DefaultEffectProps, type ShaderEffectUniforms } from './ShaderEffect.js';
/**
 * Properties of the {@link BorderLeftEffect} effect
 */
export interface BorderLeftEffectProps extends DefaultEffectProps {
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
 * The BorderBottomEffect renders a border on the left of an element
 */
export declare class BorderLeftEffect extends ShaderEffect {
    static z$__type__Props: BorderLeftEffectProps;
    readonly name = "borderLeft";
    static getEffectKey(): string;
    static resolveDefaults(props: BorderLeftEffectProps): Required<BorderLeftEffectProps>;
    static uniforms: ShaderEffectUniforms;
    static methods: Record<string, string>;
    static onEffectMask: string;
    static onColorize: string;
}
