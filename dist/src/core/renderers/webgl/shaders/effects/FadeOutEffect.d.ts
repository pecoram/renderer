import { ShaderEffect, type DefaultEffectProps, type ShaderEffectUniforms } from './ShaderEffect.js';
/**
 * Properties of the {@link FadeOutEffect}
 *
 */
export interface FadeOutEffectProps extends DefaultEffectProps {
    /**
     * Fade around the edges of the node
     *
     * @remarks
     * You can input an array with a length of up to four or a number.
     *
     * array length 4:
     * [top, right, bottom, left]
     *
     * array length 2:
     * [20, 40] -> [20(top), 40(right), 20(bottom), 40(left)]
     *
     * array length 3:
     * [20, 40, 60] -> [20(top), 40(right), 60(bottom), 20(left)]
     *
     * number:
     * 30 -> [30, 30, 30, 30]
     *
     * @default 10
     */
    fade?: number | number[];
}
export declare class FadeOutEffect extends ShaderEffect {
    static z$__type__Props: FadeOutEffectProps;
    readonly name = "fadeOut";
    static getEffectKey(): string;
    static uniforms: ShaderEffectUniforms;
    static resolveDefaults(props: FadeOutEffectProps): Required<FadeOutEffectProps>;
    static onColorize: string;
}
