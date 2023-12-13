import { CoreTextNode } from '../../../core/CoreTextNode.js';
import type { Stage } from '../../../core/Stage.js';
import type { TextNodeStruct, TextNodeStructWritableProps } from '../TextNodeStruct.js';
import { ThreadXRendererNode } from './ThreadXRendererNode.js';
export declare class ThreadXRendererTextNode extends ThreadXRendererNode {
    coreNode: CoreTextNode;
    z$__type__Props: TextNodeStructWritableProps & ThreadXRendererNode['z$__type__Props'];
    constructor(stage: Stage, sharedNodeStruct: TextNodeStruct);
    text: TextNodeStructWritableProps['text'];
    textRendererOverride: TextNodeStructWritableProps['textRendererOverride'];
    fontSize: TextNodeStructWritableProps['fontSize'];
    fontFamily: TextNodeStructWritableProps['fontFamily'];
    fontWeight: TextNodeStructWritableProps['fontWeight'];
    fontStretch: TextNodeStructWritableProps['fontStretch'];
    fontStyle: TextNodeStructWritableProps['fontStyle'];
    contain: TextNodeStructWritableProps['contain'];
    letterSpacing: TextNodeStructWritableProps['letterSpacing'];
    offsetY: TextNodeStructWritableProps['offsetY'];
    textAlign: TextNodeStructWritableProps['textAlign'];
    scrollable: TextNodeStructWritableProps['scrollable'];
    scrollY: TextNodeStructWritableProps['scrollY'];
}
