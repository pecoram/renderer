import type { Stage } from './Stage.js';
/**
 * Platform render loop initiator
 */
export declare const startLoop: (stage: Stage) => void;
/**
 * Return unix timestamp
 * @return {number}
 */
export declare const getTimeStamp: () => number;
