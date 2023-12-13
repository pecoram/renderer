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
import { ThreadXMainNode } from './ThreadXMainNode.js';
export class ThreadXMainTextNode extends ThreadXMainNode {
    _debug = {};
    constructor(rendererMain, sharedNodeStruct) {
        super(rendererMain, sharedNodeStruct, {
            text: sharedNodeStruct.text,
            textRendererOverride: sharedNodeStruct.textRendererOverride,
            fontSize: sharedNodeStruct.fontSize,
            fontFamily: sharedNodeStruct.fontFamily,
            fontStretch: sharedNodeStruct.fontStretch,
            fontStyle: sharedNodeStruct.fontStyle,
            fontWeight: sharedNodeStruct.fontWeight,
            contain: sharedNodeStruct.contain,
            letterSpacing: sharedNodeStruct.letterSpacing,
            offsetY: sharedNodeStruct.offsetY,
            scrollable: sharedNodeStruct.scrollable,
            scrollY: sharedNodeStruct.scrollY,
            textAlign: sharedNodeStruct.textAlign,
            lineHeight: sharedNodeStruct.lineHeight,
            maxLines: sharedNodeStruct.maxLines,
            maxLinesSuffix: sharedNodeStruct.textAlign,
            textOverflow: sharedNodeStruct.textAlign,
            verticalAlign: sharedNodeStruct.verticalAlign,
            textBaseline: sharedNodeStruct.textBaseline,
        });
    }
    get debug() {
        return this._debug;
    }
    set debug(debug) {
        if (this._debug === debug) {
            return;
        }
        this._debug = debug;
        this.emit('debug', debug);
    }
}
//# sourceMappingURL=ThreadXMainTextNode.js.map