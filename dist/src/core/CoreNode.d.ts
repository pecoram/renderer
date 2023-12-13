import type { ShaderMap } from './CoreShaderManager.js';
import type { ExtractProps, TextureMap, TextureOptions } from './CoreTextureManager.js';
import type { CoreRenderer } from './renderers/CoreRenderer.js';
import type { CoreShader } from './renderers/CoreShader.js';
import type { Stage } from './Stage.js';
import type { Texture } from './textures/Texture.js';
import { EventEmitter } from '../common/EventEmitter.js';
import type { Rect } from './lib/utils.js';
import { Matrix3d } from './lib/Matrix3d.js';
export interface CoreNodeProps {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    alpha: number;
    clipping: boolean;
    color: number;
    colorTop: number;
    colorBottom: number;
    colorLeft: number;
    colorRight: number;
    colorTl: number;
    colorTr: number;
    colorBl: number;
    colorBr: number;
    parent: CoreNode | null;
    zIndex: number;
    texture: Texture | null;
    textureOptions: TextureOptions | null;
    shader: CoreShader | null;
    shaderProps: Record<string, unknown> | null;
    zIndexLocked: number;
    scaleX: number;
    scaleY: number;
    mount: number;
    mountX: number;
    mountY: number;
    pivot: number;
    pivotX: number;
    pivotY: number;
    rotation: number;
}
type ICoreNode = Omit<CoreNodeProps, 'texture' | 'textureOptions' | 'shader' | 'shaderProps'>;
export declare class CoreNode extends EventEmitter implements ICoreNode {
    protected stage: Stage;
    readonly children: CoreNode[];
    protected props: Required<CoreNodeProps>;
    /**
     * Recalculation type
     * 0 - no recalculation
     * 1 - alpha recalculation
     * 2 - translate recalculation
     * 4 - transform recalculation
     */
    recalculationType: number;
    hasUpdates: boolean;
    globalTransform?: Matrix3d;
    scaleRotateTransform?: Matrix3d;
    localTransform?: Matrix3d;
    private isComplex;
    constructor(stage: Stage, props: CoreNodeProps);
    loadTexture<Type extends keyof TextureMap>(textureType: Type, props: ExtractProps<TextureMap[Type]>, options?: TextureOptions | null): void;
    unloadTexture(): void;
    private onTextureLoaded;
    private onTextureFailed;
    loadShader<Type extends keyof ShaderMap>(shaderType: Type, props: ExtractProps<ShaderMap[Type]>): void;
    setHasUpdates(): void;
    /**
     * 1 - alpha recalculation
     * 2 - translate recalculation
     * 4 - transform recalculation
     * @param type
     */
    setRecalculationType(type: number): void;
    updateScaleRotateTransform(): void;
    updateLocalTransform(): void;
    /**
     * @todo: test for correct calculation flag
     * @param delta
     */
    update(delta: number): void;
    renderQuads(renderer: CoreRenderer, clippingRect: Rect | null): void;
    get id(): number;
    get x(): number;
    set x(value: number);
    get absX(): number;
    get absY(): number;
    get y(): number;
    set y(value: number);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get scale(): number;
    set scale(value: number);
    get scaleX(): number;
    set scaleX(value: number);
    get scaleY(): number;
    set scaleY(value: number);
    get worldScaleX(): number;
    get worldScaleY(): number;
    get mount(): number;
    set mount(value: number);
    get mountX(): number;
    set mountX(value: number);
    get mountY(): number;
    set mountY(value: number);
    get pivot(): number;
    set pivot(value: number);
    get pivotX(): number;
    set pivotX(value: number);
    get pivotY(): number;
    set pivotY(value: number);
    get rotation(): number;
    set rotation(value: number);
    get alpha(): number;
    set alpha(value: number);
    get worldAlpha(): number;
    get clipping(): boolean;
    set clipping(value: boolean);
    get color(): number;
    set color(value: number);
    get colorTop(): number;
    set colorTop(value: number);
    get colorBottom(): number;
    set colorBottom(value: number);
    get colorLeft(): number;
    set colorLeft(value: number);
    get colorRight(): number;
    set colorRight(value: number);
    get colorTl(): number;
    set colorTl(value: number);
    get colorTr(): number;
    set colorTr(value: number);
    get colorBl(): number;
    set colorBl(value: number);
    get colorBr(): number;
    set colorBr(value: number);
    get zIndexLocked(): number;
    set zIndexLocked(value: number);
    get zIndex(): number;
    set zIndex(value: number);
    get parent(): CoreNode | null;
    set parent(newParent: CoreNode | null);
}
export {};
