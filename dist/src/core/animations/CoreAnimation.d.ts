import type { CoreNode } from '../CoreNode.js';
import type { INodeAnimatableProps } from '../../main-api/INode.js';
import { EventEmitter } from '../../common/EventEmitter.js';
export interface AnimationSettings {
    duration: number;
    delay: number;
    easing: string;
    loop: boolean;
    repeat: number;
    repeatDelay: number;
    stopMethod: 'reverse' | 'reset' | false;
}
export declare class CoreAnimation extends EventEmitter {
    private node;
    private props;
    settings: Partial<AnimationSettings>;
    propStartValues: Partial<INodeAnimatableProps>;
    restoreValues: Partial<INodeAnimatableProps>;
    private progress;
    private timingFunction;
    constructor(node: CoreNode, props: Partial<INodeAnimatableProps>, settings: Partial<AnimationSettings>);
    reset(): void;
    restore(): void;
    reverse(): void;
    applyEasing(p: number, s: number, e: number): number;
    update(dt: number): void;
}
