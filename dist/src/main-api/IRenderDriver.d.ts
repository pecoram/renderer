import type { INode, INodeWritableProps, ITextNode, ITextNodeWritableProps } from './INode.js';
import type { RendererMain, RendererMainSettings } from './RendererMain.js';
/**
 * This interface is to be implemented by Core Drivers
 *
 * @remarks
 * Both the {@link MainRenderDriver} and the {@link ThreadXRenderDriver} exist
 * that implement this interface to support both the single-threaded and
 * multi-threaded Core modes.
 */
export interface IRenderDriver {
    init(rendererMain: RendererMain, rendererSettings: Required<RendererMainSettings>, canvas: HTMLCanvasElement): Promise<void>;
    createNode(props: INodeWritableProps): INode;
    createTextNode(props: ITextNodeWritableProps): ITextNode;
    destroyNode(node: INode): void;
    getRootNode(): INode;
    releaseTexture(textureDescId: number): void;
    onCreateNode(node: INode): void;
    onBeforeDestroyNode(node: INode): void;
}
