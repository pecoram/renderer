import type { ExtractProps } from '../../../CoreTextureManager.js';
import type { WebGlCoreRenderer } from '../WebGlCoreRenderer.js';
import { WebGlCoreShader, type DimensionsShaderProp, type AlphaShaderProp } from '../WebGlCoreShader.js';
import type { UniformInfo } from '../internal/ShaderUtils.js';
import type { WebGlCoreCtxTexture } from '../WebGlCoreCtxTexture.js';
import { ShaderEffect } from './effects/ShaderEffect.js';
import type { EffectMap } from '../../../CoreShaderManager.js';
/**
 * Allows the `keyof EffectMap` to be mapped over and form an discriminated
 * union of all the EffectDescs structures individually.
 *
 * @remarks
 * When used like the following:
 * ```
 * MapEffectDescs<keyof EffectMap>[]
 * ```
 * The resultant type will be a discriminated union like so:
 * ```
 * (
 *   {
 *     type: 'radius',
 *     props?: {
 *       radius?: number | number[];
 *     }
 *   } |
 *   {
 *     type: 'border',
 *     props?: {
 *       width?: number;
 *       color?: number;
 *     }
 *   } |
 *   // ...
 * )[]
 * ```
 * Which means TypeScript will now base its type checking on the `type` field
 * and will know exactly what the `props` field should be based on the `type`
 * field.
 */
type MapEffectDescs<T extends keyof EffectMap> = T extends keyof EffectMap ? SpecificEffectDesc<T> : never;
type EffectDesc = MapEffectDescs<keyof EffectMap>;
export interface DynamicShaderProps extends DimensionsShaderProp, AlphaShaderProp {
    effects?: EffectDesc[];
}
export interface SpecificEffectDesc<FxType extends keyof EffectMap = keyof EffectMap> {
    type: FxType;
    props?: ExtractProps<EffectMap[FxType]>;
}
export declare class DynamicShader extends WebGlCoreShader {
    effects: Array<InstanceType<EffectMap[keyof EffectMap]>>;
    constructor(renderer: WebGlCoreRenderer, props: DynamicShaderProps, effectContructors: Partial<EffectMap>);
    bindTextures(textures: WebGlCoreCtxTexture[]): void;
    protected bindProps(props: Required<DynamicShaderProps>): void;
    static createShader(props: DynamicShaderProps, effectContructors: Partial<EffectMap>): {
        effects: ShaderEffect[];
        uniforms: UniformInfo[];
        fragment: string;
        vertex: string;
    };
    static resolveMethodDuplicate(key: string, effectMethod: string, methodCollection: Record<string, string>, increment?: number): string;
    static resolveDefaults(props: DynamicShaderProps, effectContructors?: Partial<EffectMap>): Required<DynamicShaderProps>;
    static makeCacheKey(props: DynamicShaderProps, effectContructors?: Partial<EffectMap>): string;
    static z$__type__Props: DynamicShaderProps;
    static vertex: () => string;
    static fragment: (uniforms: string, methods: string, effectMethods: string, drawEffects: string) => string;
}
export {};
