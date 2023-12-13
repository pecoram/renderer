import type { INode, INodeWritableProps, ITextNode, ITextNodeWritableProps } from '../../main-api/INode.js';
import type { ICoreDriver } from '../../main-api/ICoreDriver.js';
import type { RendererMain, RendererMainSettings } from '../../main-api/RendererMain.js';
export interface ThreadXRendererSettings {
    coreWorkerUrl: string;
}
export declare class ThreadXCoreDriver implements ICoreDriver {
    private settings;
    private threadx;
    private rendererMain;
    private root;
    private fps;
    constructor(settings: ThreadXRendererSettings);
    init(rendererMain: RendererMain, rendererSettings: Required<RendererMainSettings>, canvas: HTMLCanvasElement): Promise<void>;
    getRootNode(): INode;
    createNode(props: INodeWritableProps): INode;
    createTextNode(props: ITextNodeWritableProps): ITextNode;
    destroyNode(node: INode): void;
    releaseTexture(textureDescId: number): void;
    onCreateNode(node: INode): void;
    onBeforeDestroyNode(node: INode): void;
    onFpsUpdate(fps: number): void;
}
