import type { ExtractProps } from './CoreTextureManager.js';
import type { CoreRenderer } from './renderers/CoreRenderer.js';
import type { CoreShader } from './renderers/CoreShader.js';
import { DefaultShader } from './renderers/webgl/shaders/DefaultShader.js';
import { DefaultShaderBatched } from './renderers/webgl/shaders/DefaultShaderBatched.js';
import { DynamicShader, type DynamicShaderProps } from './renderers/webgl/shaders/DynamicShader.js';
import { RoundedRectangle } from './renderers/webgl/shaders/RoundedRectangle.js';
import { SdfShader } from './renderers/webgl/shaders/SdfShader.js';
import { RadiusEffect } from './renderers/webgl/shaders/effects/RadiusEffect.js';
import { BorderEffect } from './renderers/webgl/shaders/effects/BorderEffect.js';
import { LinearGradientEffect } from './renderers/webgl/shaders/effects/LinearGradientEffect.js';
import { GrayscaleEffect } from './renderers/webgl/shaders/effects/GrayscaleEffect.js';
import { BorderRightEffect } from './renderers/webgl/shaders/effects/BorderRightEffect.js';
import { BorderTopEffect } from './renderers/webgl/shaders/effects/BorderTopEffect.js';
import { BorderBottomEffect } from './renderers/webgl/shaders/effects/BorderBottomEffect.js';
import { BorderLeftEffect } from './renderers/webgl/shaders/effects/BorderLeftEffect.js';
import { GlitchEffect } from './renderers/webgl/shaders/effects/GlitchEffect.js';
import { FadeOutEffect } from './renderers/webgl/shaders/effects/FadeOutEffect.js';
import { RadialGradientEffect } from './renderers/webgl/shaders/effects/RadialGradientEffect.js';
export interface ShaderMap {
    DefaultShader: typeof DefaultShader;
    DefaultShaderBatched: typeof DefaultShaderBatched;
    RoundedRectangle: typeof RoundedRectangle;
    DynamicShader: typeof DynamicShader;
    SdfShader: typeof SdfShader;
}
export type ShaderNode<Type extends keyof ShaderMap> = {
    shader: InstanceType<ShaderMap[Type]>;
    props: Record<string, unknown>;
};
export interface EffectMap {
    radius: typeof RadiusEffect;
    border: typeof BorderEffect;
    borderBottom: typeof BorderBottomEffect;
    borderLeft: typeof BorderLeftEffect;
    borderRight: typeof BorderRightEffect;
    borderTop: typeof BorderTopEffect;
    fadeOut: typeof FadeOutEffect;
    linearGradient: typeof LinearGradientEffect;
    radialGradient: typeof RadialGradientEffect;
    grayscale: typeof GrayscaleEffect;
    glitch: typeof GlitchEffect;
}
export declare class CoreShaderManager {
    protected shCache: Map<string, InstanceType<ShaderMap[keyof ShaderMap]>>;
    protected shConstructors: Partial<ShaderMap>;
    protected attachedShader: CoreShader | null;
    protected effectConstructors: Partial<EffectMap>;
    renderer: CoreRenderer;
    constructor();
    registerShaderType<Type extends keyof ShaderMap>(shType: Type, shClass: ShaderMap[Type]): void;
    registerEffectType<Type extends keyof EffectMap>(effectType: Type, effectClass: EffectMap[Type]): void;
    loadShader<Type extends keyof ShaderMap>(shType: Type, props?: ExtractProps<ShaderMap[Type]>): ShaderNode<Type>;
    loadDynamicShader<Type extends keyof ShaderMap>(props: DynamicShaderProps): ShaderNode<Type>;
    useShader(shader: CoreShader): void;
}
