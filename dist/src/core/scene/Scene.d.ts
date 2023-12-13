import type { CoreNode } from '../CoreNode.js';
export type NodeTypes = Node;
export declare class Scene {
    /**
     * Root node of the scene
     *
     * @type {Node}
     * @memberof Scene
     */
    root: CoreNode;
    constructor(root: CoreNode);
    /**
     * Get all nodes of a specific type
     * @param type
     * @returns
     */
    getNodeByType(type: string): Node[];
    /**
     * Find a node by id
     * @param id
     * @returns
     */
    getNodeById(id: string): Node | null;
    /**
     * Create a new node
     * @param parent
     * @returns
     */
    /**
     * create a new RectangleNode
     * @param w
     * @param h
     * @param parent
     * @returns
     */
    /**
     * Create a new CircleNode
     * @param r
     * @param parent
     * @returns
     */
    /**
     * Create a new TextNode
     * @param text
     * @param parent
     * @returns
     */
    /**
     * Setup and attaching Node
     * @param node
     * @param parent
     * @returns
     */
    /**
     * Update the scene
     * @param delta
     */
    update(delta: number): void;
}
