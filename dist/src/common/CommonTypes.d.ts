/**
 * Types shared between Main Space and Core Space
 *
 * @remarks
 *
 * @module
 */
/**
 * Represents a width and height.
 */
export interface Dimensions {
    width: number;
    height: number;
}
/**
 * Payload for when text is loaded
 */
export type NodeTextLoadedPayload = {
    type: 'text';
    dimensions: Dimensions;
};
/**
 * Payload for when texture is loaded
 */
export type NodeTextureLoadedPayload = {
    type: 'texture';
    dimensions: Dimensions;
};
/**
 * Combined type for all loaded payloads
 */
export type NodeLoadedPayload = NodeTextLoadedPayload | NodeTextureLoadedPayload;
/**
 * Payload for when text failed to load
 */
export type NodeTextFailedPayload = {
    type: 'text';
    error: Error;
};
/**
 * Payload for when texture failed to load
 */
export type NodeTextureFailedPayload = {
    type: 'texture';
    error: Error;
};
/**
 * Combined type for all failed payloads
 */
export type NodeFailedPayload = NodeTextFailedPayload | NodeTextureFailedPayload;
/**
 * Event handler for when the texture/text of a node has loaded
 */
export type NodeLoadedEventHandler = (target: any, payload: NodeLoadedPayload) => void;
/**
 * Event handler for when the texture/text of a node has failed to load
 */
export type NodeFailedEventHandler = (target: any, payload: NodeFailedPayload) => void;
