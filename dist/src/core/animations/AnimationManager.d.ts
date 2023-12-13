import { CoreAnimation } from './CoreAnimation.js';
export declare class AnimationManager {
    activeAnimations: Set<CoreAnimation>;
    registerAnimation(animation: CoreAnimation): void;
    unregisterAnimation(animation: CoreAnimation): void;
    update(dt: number): void;
}
