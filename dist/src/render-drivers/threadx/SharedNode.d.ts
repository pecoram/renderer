import type { NodeStruct, NodeStructWritableProps } from './NodeStruct.js';
import { SharedObject } from '@lightningjs/threadx';
export declare class SharedNode extends SharedObject {
    z$__type__Props: NodeStructWritableProps & SharedObject['z$__type__Props'];
    /**
     * Must have lock on sharedNode before calling constructor!
     *
     * @param sharedNodeStruct
     */
    constructor(sharedNodeStruct: NodeStruct, extendedCurProps?: Record<string, unknown>);
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
    scaleX: number;
    scaleY: number;
    mountX: number;
    mountY: number;
    mount: number;
    pivot: number;
    pivotX: number;
    pivotY: number;
    rotation: number;
    protected parentId: number;
    zIndex: number;
    zIndexLocked: number;
}
