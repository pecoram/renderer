import type { ITextNode } from '../../main-api/INode.js';
import type { RendererMain } from '../../main-api/RendererMain.js';
import type { TextNodeStruct } from './TextNodeStruct.js';
import { ThreadXMainNode } from './ThreadXMainNode.js';
export declare class ThreadXMainTextNode extends ThreadXMainNode implements ITextNode {
    protected _debug: ITextNode['debug'];
    constructor(rendererMain: RendererMain, sharedNodeStruct: TextNodeStruct);
    text: ITextNode['text'];
    textRendererOverride: ITextNode['textRendererOverride'];
    fontSize: ITextNode['fontSize'];
    fontFamily: ITextNode['fontFamily'];
    fontStretch: ITextNode['fontStretch'];
    fontStyle: ITextNode['fontStyle'];
    fontWeight: ITextNode['fontWeight'];
    textAlign: ITextNode['textAlign'];
    contain: ITextNode['contain'];
    scrollable: ITextNode['scrollable'];
    scrollY: ITextNode['scrollY'];
    offsetY: ITextNode['offsetY'];
    letterSpacing: ITextNode['letterSpacing'];
    get debug(): ITextNode['debug'];
    set debug(debug: ITextNode['debug']);
}
