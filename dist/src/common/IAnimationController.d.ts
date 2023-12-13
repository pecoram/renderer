export type AnimationControllerState = 'running' | 'paused' | 'stopped';
export interface IAnimationController {
    start(): IAnimationController;
    stop(): IAnimationController;
    pause(): IAnimationController;
    restore(): IAnimationController;
    waitUntilStopped(): Promise<void>;
    readonly state: AnimationControllerState;
}
