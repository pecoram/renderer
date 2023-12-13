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
 * Type guard util for a message sent from the main worker to the renderer worker
 *
 * @param type
 * @param message
 * @returns
 */
export function isThreadXRendererMessage(type, message) {
    return (typeof message === 'object' &&
        message !== null &&
        'type' in message &&
        message.type === type);
}
//# sourceMappingURL=ThreadXRendererMessage.js.map