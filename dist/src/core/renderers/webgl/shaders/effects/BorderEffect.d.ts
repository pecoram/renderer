import { ShaderEffect, type DefaultEffectProps, type ShaderEffectUniforms } from './ShaderEffect.js';
/**
 * Properties of the {@link BorderEffect} effect
 */
export interface BorderEffectProps extends DefaultEffectProps {
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
 * The BorderEffect renders a border along all edges of an element
 */
export declare class BorderEffect extends ShaderEffect {
    static z$__type__Props: BorderEffectProps;
    readonly name = "border";
    static getEffectKey(): string;
    static resolveDefaults(props: BorderEffectProps): Required<BorderEffectProps>;
    static uniforms: ShaderEffectUniforms;
    static onEffectMask: string;
    static onColorize: string;
}
