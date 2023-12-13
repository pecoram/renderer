import type { Texture } from '../textures/Texture.js';
export declare abstract class CoreContextTexture {
    readonly textureSource: Texture;
    constructor(textureSource: Texture);
    abstract load(): void;
}
