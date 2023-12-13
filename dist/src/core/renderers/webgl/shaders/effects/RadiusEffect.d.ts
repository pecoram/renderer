import { ShaderEffect, type DefaultEffectProps, type ShaderEffectUniforms } from './ShaderEffect.js';
/**
 * Properties of the {@link RadiusEffect} shader
 */
export interface RadiusEffectProps extends DefaultEffectProps {
    /**
     * Corner radius, in pixels, to cut out of the corners
     *
     * @remarks
     * You can input an array with a length of up to four or a number.
     *
     * array length 4:
     * [topLeft, topRight, bottomRight, bottomLeft]
     *
     * array length 2:
     * [20, 40] -> [20(topLeft), 40(topRight), 20(bottomRight), 40(bottomLeft)]
     *
     * array length 3:
     * [20, 40, 60] -> [20(topLeft), 40(topRight), 60(bottomRight), 20(bottomLeft)]
     *
     * number:
     * 30 -> [30, 30, 30, 30]
     *
     * @default 10
     */
    radius?: number | number[];
}
/**
 * Masks the current maskcolor with rounded corners similar to {@link RoundedRectangle}
 */
export declare class RadiusEffect extends ShaderEffect {
    static z$__type__Props: RadiusEffectProps;
    readonly name = "radius";
    static getEffectKey(): string;
    static uniforms: ShaderEffectUniforms;
    static methods: Record<string, string>;
    static resolveDefaults(props: RadiusEffectProps): Required<RadiusEffectProps>;
    static onShaderMask: string;
    static onEffectMask: string;
}
