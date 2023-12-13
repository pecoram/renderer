import { ShaderEffect, type DefaultEffectProps, type ShaderEffectUniforms } from './ShaderEffect.js';
export interface GlitchEffectProps extends DefaultEffectProps {
    /**
     * Amplitude determines the intensity of the horizontal shift that happens in the glitch effect.
     *
     * @default 0.2
     */
    amplitude?: number;
    /**
     * Narrowness of the horizontal shift
     *
     * @default 4.0
     */
    narrowness?: number;
    /**
     * Blockiness of the horizontal shift
     *
     * @default 2.0
     */
    blockiness?: number;
    /**
     * Minimzer of the horizontal shift
     *
     * @default 8.0
     */
    minimizer?: number;
    /**
     * Used for the time loop of the horizontal shift
     *
     * @default Date.now()
     */
    time?: number;
}
/**
 * Renders a Glitch effect using the incoming texture
 */
export declare class GlitchEffect extends ShaderEffect {
    static z$__type__Props: GlitchEffectProps;
    readonly name = "glitch";
    static getEffectKey(props: GlitchEffectProps): string;
    static resolveDefaults(props: GlitchEffectProps): Required<GlitchEffectProps>;
    static uniforms: ShaderEffectUniforms;
    static methods: Record<string, string>;
    static onColorize: string;
}
