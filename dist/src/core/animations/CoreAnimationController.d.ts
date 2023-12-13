import type { AnimationControllerState, IAnimationController } from '../../common/IAnimationController.js';
import type { AnimationManager } from './AnimationManager.js';
import type { CoreAnimation } from './CoreAnimation.js';
export declare class CoreAnimationController implements IAnimationController {
    private manager;
    private animation;
    stoppedPromise: Promise<void> | null;
    /**
     * If this is null, then the animation is in a finished / stopped state.
     */
    stoppedResolve: (() => void) | null;
    constructor(manager: AnimationManager, animation: CoreAnimation);
    state: AnimationControllerState;
    start(): IAnimationController;
    stop(): IAnimationController;
    pause(): IAnimationController;
    restore(): IAnimationController;
    waitUntilStopped(): Promise<void>;
    private makeStoppedPromise;
    private finished;
}
