import type { IAnimationController } from '../../common/IAnimationController.js';
import type { INode, INodeAnimatableProps } from '../../main-api/INode.js';
import type { RendererMain, ShaderRef, TextureRef } from '../../main-api/RendererMain.js';
import type { NodeStruct } from './NodeStruct.js';
import { SharedNode } from './SharedNode.js';
import type { AnimationSettings } from '../../core/animations/CoreAnimation.js';
export declare class ThreadXMainNode extends SharedNode implements INode {
    private rendererMain;
    private nextAnimationId;
    protected _parent: ThreadXMainNode | null;
    protected _children: ThreadXMainNode[];
    protected _texture: TextureRef | null;
    protected _shader: ShaderRef | null;
    private _src;
    /**
     * FinalizationRegistry for animation controllers. When an animation
     * controller is garbage collected, we let the render worker know so that
     * it can remove it's corresponding animation controler from it's stored
     * Set. This should ultimately allow the render worker to garbage collect
     * it's animation controller. The animation itself independent from the animation
     * controller, so it will continue to run until it's finished regardless of
     * whether or not the animation controller is garbage collected.
     */
    private animationRegistry;
    constructor(rendererMain: RendererMain, sharedNodeStruct: NodeStruct, extendedCurProps?: Record<string, unknown>);
    get texture(): TextureRef | null;
    set texture(texture: TextureRef | null);
    get shader(): ShaderRef | null;
    set shader(shader: ShaderRef | null);
    get scale(): number | null;
    set scale(scale: number | null);
    animate(props: Partial<INodeAnimatableProps>, settings: Partial<AnimationSettings>): IAnimationController;
    get src(): string;
    set src(imageUrl: string);
    get parent(): ThreadXMainNode | null;
    set parent(newParent: ThreadXMainNode | null);
    get children(): ThreadXMainNode[];
    get props(): this["z$__type__Props"];
    destroy(): void;
}
