import type { AnimationControllerState, IAnimationController } from '../../common/IAnimationController.js';
import type { ThreadXMainNode } from './ThreadXMainNode.js';
export declare class ThreadXMainAnimationController implements IAnimationController {
    private node;
    private id;
    stoppedPromise: Promise<void> | null;
    /**
     * If this is null, then the animation is in a finished / stopped state.
     */
    stoppedResolve: (() => void) | null;
    constructor(node: ThreadXMainNode, id: number);
    state: AnimationControllerState;
    start(): IAnimationController;
    stop(): IAnimationController;
    pause(): IAnimationController;
    restore(): IAnimationController;
    waitUntilStopped(): Promise<void>;
    private onAnimationFinished;
    private makeStoppedPromise;
}
