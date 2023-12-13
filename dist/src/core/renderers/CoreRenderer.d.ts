import type { CoreShaderManager } from '../CoreShaderManager.js';
import type { TextureOptions } from '../CoreTextureManager.js';
import type { Stage } from '../Stage.js';
import type { Rect } from '../lib/utils.js';
import type { Texture } from '../textures/Texture.js';
import { CoreContextTexture } from './CoreContextTexture.js';
import type { CoreRenderOp } from './CoreRenderOp.js';
import type { CoreShader } from './CoreShader.js';
export interface QuadOptions {
    width: number;
    height: number;
    colorTl: number;
    colorTr: number;
    colorBl: number;
    colorBr: number;
    texture: Texture | null;
    textureOptions: TextureOptions | null;
    zIndex: number;
    shader: CoreShader | null;
    shaderProps: Record<string, unknown> | null;
    alpha: number;
    clippingRect: Rect | null;
    tx: number;
    ty: number;
    ta: number;
    tb: number;
    tc: number;
    td: number;
}
export declare abstract class CoreRenderer {
    protected stage: Stage;
    constructor(stage: Stage);
    abstract reset(): void;
    abstract sortRenderables(): void;
    abstract render(surface: 'screen' | CoreContextTexture): void;
    abstract addRenderable(params: QuadOptions | CoreRenderOp): void;
    abstract createCtxTexture(textureSource: Texture): CoreContextTexture;
    abstract getShaderManager(): CoreShaderManager;
}
