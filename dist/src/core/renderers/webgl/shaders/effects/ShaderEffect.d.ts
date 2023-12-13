import type { UniformInfo, UniformMethodMap } from '../../internal/ShaderUtils.js';
export interface ShaderEffectUniform {
    value: number | number[] | boolean | string;
    type: string;
    method: keyof UniformMethodMap;
    name?: string;
    size?: (value: Record<string, unknown>) => number;
    validator?: (value: any, props: Record<string, unknown>) => number | number[] | number[][];
}
export interface ShaderEffectUniforms {
    [key: string]: ShaderEffectUniform;
}
export interface DefaultEffectProps {
    [key: string]: unknown;
}
export interface ShaderEffectOptions {
    ref: string;
    target: string;
    props?: Record<string, unknown>;
    uniforms?: ShaderEffectUniforms;
    methods?: Record<string, string>;
    onShaderMask?: ((value: Record<string, unknown>) => string) | string;
    onColorize?: ((value: Record<string, unknown>) => string) | string;
    onEffectMask?: ((value: Record<string, unknown>) => string) | string;
}
export declare abstract class ShaderEffect {
    readonly priority = 1;
    readonly name: string;
    ref: string;
    target: string;
    passParameters: string;
    declaredUniforms: string;
    uniformInfo: Record<string, UniformInfo>;
    static uniforms: ShaderEffectUniforms;
    static methods?: Record<string, string>;
    static onShaderMask?: ((value: Record<string, unknown>) => string) | string;
    static onColorize?: ((value: Record<string, unknown>) => string) | string;
    static onEffectMask?: ((value: Record<string, unknown>) => string) | string;
    static getEffectKey(props: Record<string, unknown>): string;
    static getMethodParameters(uniforms: ShaderEffectUniforms, props: Record<string, unknown>): string;
    constructor(options: ShaderEffectOptions);
    static resolveDefaults(props: Record<string, unknown>): Record<string, unknown>;
    static makeEffectKey(props: Record<string, unknown>): string | false;
}
