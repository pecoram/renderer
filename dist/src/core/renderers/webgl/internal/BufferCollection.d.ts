import type { AttributeInfo } from './ShaderUtils.js';
export interface BufferItem {
    buffer: WebGLBuffer;
    attributes: Record<string, AttributeInfo>;
}
/**
 * Represents a collection of WebGL Buffers along with their associated
 * vertex attribute formats.
 */
export declare class BufferCollection {
    readonly config: BufferItem[];
    constructor(config: BufferItem[]);
    /**
     * Get the WebGLBuffer associated with the given attribute name if it exists.
     *
     * @param attributeName
     * @returns
     */
    getBuffer(attributeName: string): WebGLBuffer | undefined;
    /**
     * Get the AttributeInfo associated with the given attribute name if it exists.
     *
     * @param attributeName
     * @returns
     */
    getAttributeInfo(attributeName: string): AttributeInfo | undefined;
}
