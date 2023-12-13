import type { NodeStruct } from '../NodeStruct.js';
import { SharedNode } from '../SharedNode.js';
import type { Stage } from '../../../core/Stage.js';
import type { Texture } from '../../../core/textures/Texture.js';
import { CoreNode } from '../../../core/CoreNode.js';
export declare class ThreadXRendererNode extends SharedNode {
    private stage;
    protected coreNode: CoreNode;
    protected _parent: ThreadXRendererNode | null;
    protected _children: ThreadXRendererNode[];
    texture: Texture | null;
    private animationControllers;
    constructor(stage: Stage, sharedNodeStruct: NodeStruct, coreNode?: CoreNode, extendedCurProps?: Record<string, unknown>);
    onPropertyChange<Key extends keyof this['z$__type__Props']>(propName: Key, newValue: this['z$__type__Props'][Key], oldValue: this['z$__type__Props'][Key] | undefined): void;
    get parent(): ThreadXRendererNode | null;
    set parent(newParent: ThreadXRendererNode | null);
    get children(): ThreadXRendererNode[];
    private createCoreNode;
}
