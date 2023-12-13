import type { IEventEmitter } from '@lightningjs/threadx';
/**
 * EventEmitter base class
 */
export declare class EventEmitter implements IEventEmitter {
    private eventListeners;
    on(event: string, listener: (target: any, data: any) => void): void;
    off(event: string, listener?: (target: any, data: any) => void): void;
    once(event: string, listener: (target: any, data: any) => void): void;
    emit(event: string, data?: any): void;
    removeAllListeners(): void;
}
