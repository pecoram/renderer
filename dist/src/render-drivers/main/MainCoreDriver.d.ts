import type { ICoreDriver } from '../../main-api/ICoreDriver.js';
import type { INode, INodeWritableProps, ITextNodeWritableProps } from '../../main-api/INode.js';
import type { RendererMain, RendererMainSettings } from '../../main-api/RendererMain.js';
import { MainOnlyTextNode } from './MainOnlyTextNode.js';
export declare class MainCoreDriver implements ICoreDriver {
    private root;
    private stage;
    private rendererMain;
    init(rendererMain: RendererMain, rendererSettings: Required<RendererMainSettings>, canvas: HTMLCanvasElement): Promise<void>;
    createNode(props: INodeWritableProps): INode;
    createTextNode(props: ITextNodeWritableProps): MainOnlyTextNode;
    destroyNode(node: INode): void;
    releaseTexture(id: number): void;
    getRootNode(): INode;
    onCreateNode(node: INode): void;
    onBeforeDestroyNode(node: INode): void;
    onFpsUpdate(fps: number): void;
}
