import type { INode, INodeWritableProps, ITextNode, ITextNodeWritableProps } from '../../main-api/INode.js';
import type { IRenderDriver } from '../../main-api/IRenderDriver.js';
import type { RendererMain, RendererMainSettings } from '../../main-api/RendererMain.js';
export interface ThreadXRendererSettings {
    coreWorkerUrl: string;
}
export declare class ThreadXRenderDriver implements IRenderDriver {
    private settings;
    private threadx;
    private rendererMain;
    private root;
    constructor(settings: ThreadXRendererSettings);
    init(rendererMain: RendererMain, rendererSettings: Required<RendererMainSettings>, canvas: HTMLCanvasElement): Promise<void>;
    getRootNode(): INode;
    createNode(props: INodeWritableProps): INode;
    createTextNode(props: ITextNodeWritableProps): ITextNode;
    destroyNode(node: INode): void;
    releaseTexture(textureDescId: number): void;
    onCreateNode(node: INode): void;
    onBeforeDestroyNode(node: INode): void;
}
