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
const trPropSetterDefaults = {
    x: (state, value) => {
        state.props.x = value;
    },
    y: (state, value) => {
        state.props.y = value;
    },
    width: (state, value) => {
        state.props.width = value;
    },
    height: (state, value) => {
        state.props.height = value;
    },
    color: (state, value) => {
        state.props.color = value;
    },
    zIndex: (state, value) => {
        state.props.zIndex = value;
    },
    fontFamily: (state, value) => {
        state.props.fontFamily = value;
    },
    fontWeight: (state, value) => {
        state.props.fontWeight = value;
    },
    fontStyle: (state, value) => {
        state.props.fontStyle = value;
    },
    fontStretch: (state, value) => {
        state.props.fontStretch = value;
    },
    fontSize: (state, value) => {
        state.props.fontSize = value;
    },
    scaleX: (state, value) => {
        state.props.scaleX = value;
    },
    scaleY: (state, value) => {
        state.props.scaleY = value;
    },
    text: (state, value) => {
        state.props.text = value;
    },
    textAlign: (state, value) => {
        state.props.textAlign = value;
    },
    contain: (state, value) => {
        state.props.contain = value;
    },
    offsetY: (state, value) => {
        state.props.offsetY = value;
    },
    scrollable: (state, value) => {
        state.props.scrollable = value;
    },
    scrollY: (state, value) => {
        state.props.scrollY = value;
    },
    letterSpacing: (state, value) => {
        state.props.letterSpacing = value;
    },
    lineHeight: (state, value) => {
        state.props.lineHeight = value;
    },
    maxLines: (state, value) => {
        state.props.maxLines = value;
    },
    maxLinesSuffix: (state, value) => {
        state.props.maxLinesSuffix = value;
    },
    textOverflow: (state, value) => {
        state.props.textOverflow = value;
    },
    verticalAlign: (state, value) => {
        state.props.verticalAlign = value;
    },
    textBaseline: (state, value) => {
        state.props.textBaseline = value;
    },
    debug: (state, value) => {
        state.props.debug = value;
    },
};
export class TextRenderer {
    stage;
    set;
    constructor(stage) {
        this.stage = stage;
        this.set = Object.freeze({
            ...trPropSetterDefaults,
            ...this.getPropertySetters(),
        });
    }
    setStatus(state, status, error) {
        // Don't emit the same status twice
        if (state.status === status) {
            return;
        }
        state.status = status;
        state.emitter.emit(status, error);
    }
}
//# sourceMappingURL=TextRenderer.js.map
