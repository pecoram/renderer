import { DefaultShader } from './renderers/webgl/shaders/DefaultShader.js';
import { DefaultShaderBatched } from './renderers/webgl/shaders/DefaultShaderBatched.js';
import { DynamicShader, } from './renderers/webgl/shaders/DynamicShader.js';
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
export class CoreShaderManager {
    shCache = new Map();
    shConstructors = {};
    attachedShader = null;
    effectConstructors = {};
    renderer;
    constructor() {
        this.registerShaderType('DefaultShader', DefaultShader);
        this.registerShaderType('DefaultShaderBatched', DefaultShaderBatched);
        this.registerShaderType('RoundedRectangle', RoundedRectangle);
        this.registerShaderType('DynamicShader', DynamicShader);
        this.registerShaderType('SdfShader', SdfShader);
        this.registerEffectType('border', BorderEffect);
        this.registerEffectType('borderBottom', BorderBottomEffect);
        this.registerEffectType('borderLeft', BorderLeftEffect);
        this.registerEffectType('borderRight', BorderRightEffect);
        this.registerEffectType('borderTop', BorderTopEffect);
        this.registerEffectType('fadeOut', FadeOutEffect);
        this.registerEffectType('linearGradient', LinearGradientEffect);
        this.registerEffectType('radialGradient', RadialGradientEffect);
        this.registerEffectType('grayscale', GrayscaleEffect);
        this.registerEffectType('glitch', GlitchEffect);
        this.registerEffectType('radius', RadiusEffect);
    }
    registerShaderType(shType, shClass) {
        this.shConstructors[shType] = shClass;
    }
    registerEffectType(effectType, effectClass) {
        this.effectConstructors[effectType] = effectClass;
    }
    loadShader(shType, props) {
        if (!this.renderer) {
            throw new Error(`Renderer is not been defined`);
        }
        const ShaderClass = this.shConstructors[shType];
        if (!ShaderClass) {
            throw new Error(`Shader type "${shType}" is not registered`);
        }
        if (shType === 'DynamicShader') {
            return this.loadDynamicShader(props);
        }
        const resolvedProps = ShaderClass.resolveDefaults(props);
        const cacheKey = ShaderClass.makeCacheKey(resolvedProps) || ShaderClass.name;
        if (cacheKey && this.shCache.has(cacheKey)) {
            return {
                shader: this.shCache.get(cacheKey),
                props: resolvedProps,
            };
        }
        // @ts-expect-error ShaderClass WILL accept a Renderer
        const shader = new ShaderClass(this.renderer, props);
        if (cacheKey) {
            this.shCache.set(cacheKey, shader);
        }
        return {
            shader,
            props: resolvedProps,
        };
    }
    loadDynamicShader(props) {
        if (!this.renderer) {
            throw new Error(`Renderer is not been defined`);
        }
        const resolvedProps = DynamicShader.resolveDefaults(props, this.effectConstructors);
        const cacheKey = DynamicShader.makeCacheKey(resolvedProps, this.effectConstructors);
        if (cacheKey && this.shCache.has(cacheKey)) {
            return {
                shader: this.shCache.get(cacheKey),
                props: resolvedProps,
            };
        }
        const shader = new DynamicShader(this.renderer, props, this.effectConstructors);
        if (cacheKey) {
            this.shCache.set(cacheKey, shader);
        }
        return {
            shader: shader,
            props: resolvedProps,
        };
    }
    useShader(shader) {
        if (this.attachedShader === shader) {
            return;
        }
        if (this.attachedShader) {
            this.attachedShader.detach();
        }
        shader.attach();
        this.attachedShader = shader;
    }
}
//# sourceMappingURL=CoreShaderManager.js.map