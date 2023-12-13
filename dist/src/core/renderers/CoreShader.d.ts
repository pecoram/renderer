import type { CoreRenderOp } from './CoreRenderOp.js';
export declare abstract class CoreShader {
    static makeCacheKey(props: Record<string, unknown>): string | false;
    static resolveDefaults(props: Record<string, unknown>): Record<string, unknown>;
    abstract bindRenderOp(renderOp: CoreRenderOp, props: Record<string, unknown> | null): void;
    protected abstract bindProps(props: Record<string, unknown>): void;
    abstract attach(): void;
    abstract detach(): void;
}
