import type { WebGlCoreRenderer } from '../WebGlCoreRenderer.js';
export interface AttributeInfo {
    name: string;
    size: number;
    type: number;
    normalized: boolean;
    stride: number;
    offset: number;
}
export interface UniformInfo {
    name: string;
    uniform: keyof UniformMethodMap;
}
export interface ShaderOptions {
    renderer: WebGlCoreRenderer;
    attributes: string[];
    uniforms: UniformInfo[];
    shaderSources?: ShaderProgramSources;
    supportsIndexedTextures?: boolean;
    webgl1Extensions?: string[];
    webgl2Extensions?: string[];
}
type IsUniformMethod<MethodName, MethodType> = MethodName extends `uniform${string}` ? MethodType extends (location: WebGLUniformLocation | null, ...args: any[]) => void ? true : false : false;
export type UniformMethodMap = {
    [Key in keyof WebGLRenderingContext as IsUniformMethod<Key, WebGLRenderingContext[Key]> extends true ? Key : never]: WebGLRenderingContext[Key] extends (location: WebGLUniformLocation | null, ...args: infer T) => void ? T : never;
};
type TupleToObject<T extends any[]> = Omit<T, keyof any[]>;
export type UniformTupleToMap<Uniforms extends [...UniformInfo[]]> = {
    [Key in keyof TupleToObject<Uniforms> as TupleToObject<Uniforms>[Key] extends {
        name: infer K extends string;
    } ? K : never]: TupleToObject<Uniforms>[Key] extends {
        uniform: infer T extends keyof UniformMethodMap;
    } ? UniformMethodMap[T] : never;
};
type ShaderSource = string | ((textureUnits: number) => string);
export interface ShaderProgramSources {
    vertex: ShaderSource;
    fragment: ShaderSource;
    webGl2?: {
        vertex: ShaderSource;
        fragment: ShaderSource;
    };
}
export declare function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | undefined;
export declare function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | undefined;
export {};
