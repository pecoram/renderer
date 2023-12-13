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
import { assertTruthy } from '../../utils.js';
export class ThreadXMainAnimationController {
    node;
    id;
    stoppedPromise = null;
    /**
     * If this is null, then the animation is in a finished / stopped state.
     */
    stoppedResolve = null;
    constructor(node, id) {
        this.node = node;
        this.id = id;
        this.onAnimationFinished = this.onAnimationFinished.bind(this);
        this.state = 'stopped';
    }
    state;
    start() {
        if (this.stoppedResolve === null) {
            this.makeStoppedPromise();
            this.node.on('animationFinished', this.onAnimationFinished);
        }
        this.state = 'running';
        this.node.emit('startAnimation', { id: this.id });
        return this;
    }
    stop() {
        this.node.emit('stopAnimation', { id: this.id });
        this.node.off('animationFinished', this.onAnimationFinished);
        if (this.stoppedResolve !== null) {
            this.stoppedResolve();
            this.stoppedResolve = null;
        }
        this.state = 'stopped';
        return this;
    }
    pause() {
        this.node.emit('pauseAnimation', { id: this.id });
        this.state = 'paused';
        return this;
    }
    restore() {
        return this;
    }
    waitUntilStopped() {
        this.makeStoppedPromise();
        const promise = this.stoppedPromise;
        assertTruthy(promise);
        return promise;
    }
    onAnimationFinished(target, { id, loop }) {
        if (id === this.id) {
            this.node.off('animationFinished', this.onAnimationFinished);
            this.stoppedResolve?.();
            this.stoppedResolve = null;
            this.state = 'stopped';
        }
    }
    makeStoppedPromise() {
        if (this.stoppedResolve === null) {
            this.stoppedPromise = new Promise((resolve) => {
                this.stoppedResolve = resolve;
            });
        }
    }
}
//# sourceMappingURL=ThreadXMainAnimationController.js.map