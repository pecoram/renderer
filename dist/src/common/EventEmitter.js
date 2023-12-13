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
/**
 * EventEmitter base class
 */
export class EventEmitter {
    eventListeners = {};
    on(event, listener) {
        let listeners = this.eventListeners[event];
        if (!listeners) {
            listeners = [];
        }
        listeners.push(listener);
        this.eventListeners[event] = listeners;
    }
    off(event, listener) {
        const listeners = this.eventListeners[event];
        if (!listeners) {
            return;
        }
        if (!listener) {
            delete this.eventListeners[event];
            return;
        }
        const index = listeners.indexOf(listener);
        if (index >= 0) {
            listeners.splice(index, 1);
        }
    }
    once(event, listener) {
        const onceListener = (target, data) => {
            this.off(event, onceListener);
            listener(target, data);
        };
        this.on(event, onceListener);
    }
    emit(event, data) {
        const listeners = this.eventListeners[event];
        if (!listeners) {
            return;
        }
        [...listeners].forEach((listener) => {
            listener(this, data);
        });
    }
    removeAllListeners() {
        this.eventListeners = {};
    }
}
//# sourceMappingURL=EventEmitter.js.map