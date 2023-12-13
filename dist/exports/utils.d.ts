/**
 * Auxiliary Utilities
 *
 * @remarks
 * This module exports the a set of utilities that may be optionally used by
 * developers using the Lightning 3 Renderer.
 *
 * You can import the exports from this module like so:
 * ```ts
 * import { assertTruthy } from '@lightning/renderer';
 * ```
 *
 * @internalRemarks
 * Exports in here should be chosen wisely, as they will be exposed to
 * directly developers.
 *
 * They should be general utilities that are NOT directly coupled to the
 * Lightning Renderer, and not specific to any particular platform.
 *
 * @packageDocumentation
 */
export { assertTruthy, mergeColorAlpha, deg2Rad } from '../src/utils.js';
export { EventEmitter } from '../src/common/EventEmitter.js';
