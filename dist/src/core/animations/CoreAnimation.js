/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2023 Comcast Cable Communications Management, LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { getTimingFunction } from '../utils.js';
import { mergeColorProgress } from '../../utils.js';
import { EventEmitter } from '../../common/EventEmitter.js';
export class CoreAnimation extends EventEmitter {
    node;
    props;
    settings;
    propStartValues = {};
    restoreValues = {};
    progress = 0;
    timingFunction;
    constructor(node, props, settings) {
        super();
        this.node = node;
        this.props = props;
        this.settings = settings;
        this.propStartValues = {};
        Object.keys(props).forEach((propName) => {
            this.propStartValues[propName] = node[propName];
        });
        this.timingFunction = (t) => t;
        if (settings.easing && typeof settings.easing === 'string') {
            this.timingFunction = getTimingFunction(settings.easing);
        }
    }
    reset() {
        this.progress = 0;
        this.update(0);
    }
    restore() {
        this.reset();
        Object.keys(this.props).forEach((propName) => {
            this.node[propName] = this.propStartValues[propName];
        });
    }
    reverse() {
        this.progress = 0;
        Object.keys(this.props).forEach((propName) => {
            // set the start value to the current value
            const startValue = this.props[propName];
            const endValue = this.propStartValues[propName];
            // swap the start and end values
            this.props[propName] = endValue;
            this.propStartValues[propName] = startValue;
        });
        // restore stop method if we are not looping
        if (!this.settings.loop) {
            this.settings.stopMethod = false;
        }
    }
    applyEasing(p, s, e) {
        return (this.timingFunction(p) || p) * (e - s) + s;
    }
    update(dt) {
        const { duration, loop, easing } = this.settings;
        if (!duration) {
            this.emit('finished', {});
            return;
        }
        this.progress += dt / duration;
        if (this.progress > 1) {
            this.progress = loop ? 0 : 1;
            this.emit('finished', {});
        }
        Object.keys(this.props).forEach((propName) => {
            const propValue = this.props[propName];
            const startValue = this.propStartValues[propName];
            const endValue = propValue;
            if (propName.indexOf('color') !== -1) {
                const progressValue = easing
                    ? this.timingFunction(this.progress) || this.progress
                    : this.progress;
                const colorValue = mergeColorProgress(startValue, endValue, progressValue);
                this.node[propName] = easing
                    ? colorValue
                    : mergeColorProgress(startValue, endValue, this.progress);
            }
            else {
                this.node[propName] = easing
                    ? this.applyEasing(this.progress, startValue, endValue)
                    : startValue + (endValue - startValue) * this.progress;
            }
        });
    }
}
//# sourceMappingURL=CoreAnimation.js.map