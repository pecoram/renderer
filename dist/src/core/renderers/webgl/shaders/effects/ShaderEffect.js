export class ShaderEffect {
    priority = 1;
    name = '';
    ref;
    target;
    passParameters = '';
    declaredUniforms = '';
    uniformInfo = {};
    static uniforms = {};
    static methods;
    static onShaderMask;
    static onColorize;
    static onEffectMask;
    static getEffectKey(props) {
        return '';
    }
    static getMethodParameters(uniforms, props) {
        const res = [];
        for (const u in uniforms) {
            const uni = uniforms[u];
            let define = '';
            if (uni.size) {
                define = `[${uni.size(props)}]`;
            }
            res.push(`${uni.type} ${u}${define}`);
        }
        return res.join(',');
    }
    constructor(options) {
        const { ref, target, props = {} } = options;
        this.ref = ref;
        this.target = target;
        const uniformInfo = {};
        const passParameters = [];
        let declaredUniforms = '';
        const uniforms = this.constructor.uniforms || {};
        for (const u in uniforms) {
            const unif = uniforms[u];
            const uniType = unif.type;
            //make unique uniform name
            const uniformName = `${ref}_${u}`;
            let define = '';
            if (unif.size) {
                define = `[${unif.size(props)}]`;
            }
            passParameters.push(uniformName);
            declaredUniforms += `uniform ${uniType} ${uniformName}${define};`;
            uniformInfo[u] = { name: uniformName, uniform: uniforms[u].method };
        }
        this.passParameters = passParameters.join(',');
        this.declaredUniforms = declaredUniforms;
        this.uniformInfo = uniformInfo;
    }
    static resolveDefaults(props) {
        return {};
    }
    static makeEffectKey(props) {
        return false;
    }
}
//# sourceMappingURL=ShaderEffect.js.map