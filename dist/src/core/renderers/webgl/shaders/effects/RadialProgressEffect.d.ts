import { ShaderEffect, type DefaultEffectProps, type ShaderEffectUniforms } from './ShaderEffect.js';
/**
 * Properties of the {@link RadialProgressEffect} effect
 */
export interface RadialProgressEffectProps extends DefaultEffectProps {
    /**
     * Width of the border in pixels
     *
     * @default 10
     */
    width?: number;
    /**
     * progress from 0 to 1 in floats
     *
     * @default 0.5;
     */
    progress?: number;
    /**
     * offset where the radial progress starts drawing.
     *
     * @default 0;
     */
    offset?: number;
    /**
     * maximum range of the radial progress in radians
     *
     * @default Math.PI * 2
     */
    range?: number;
    /**
     * rounded ends of the progress bar;
     *
     * @default false
     */
    rounded?: boolean;
    /**
     * radius from center to outer edge from 0 to 1 in floats;
     *
     * @default 1
     */
    radius?: number;
    /**
     * Color of the border in 0xRRGGBBAA
     *
     * @default 0xffffffff
     */
    color?: number;
}
/**
 * The RadialProgressEffect renders a border along all edges of an element
 */
export declare class RadialProgressEffect extends ShaderEffect {
    static z$__type__Props: RadialProgressEffectProps;
    readonly name = "radialProgress";
    static getEffectKey(): string;
    static resolveDefaults(props: RadialProgressEffectProps): Required<RadialProgressEffectProps>;
    static uniforms: ShaderEffectUniforms;
    static methods: Record<string, string>;
    static onEffectMask: string;
    static onColorize: string;
}
