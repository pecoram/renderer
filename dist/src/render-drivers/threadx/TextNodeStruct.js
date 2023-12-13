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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { structProp, genTypeId } from '@lightningjs/threadx';
import { NodeStruct } from './NodeStruct.js';
export class TextNodeStruct extends NodeStruct {
    static typeId = genTypeId('TEXT');
    get text() {
        return '';
    }
    set text(value) {
        // Decorator will handle this
    }
    get textRendererOverride() {
        return null;
    }
    set textRendererOverride(value) {
        // Decorator will handle this
    }
    get fontSize() {
        return 0;
    }
    set fontSize(value) {
        // Decorator will handle this
    }
    get fontFamily() {
        return '';
    }
    set fontFamily(value) {
        // Decorator will handle this
    }
    get fontStretch() {
        return 'normal';
    }
    set fontStretch(value) {
        // Decorator will handle this
    }
    get fontStyle() {
        return 'normal';
    }
    set fontStyle(value) {
        // Decorator will handle this
    }
    get fontWeight() {
        return 'normal';
    }
    set fontWeight(value) {
        // Decorator will handle this
    }
    get textAlign() {
        return 'left';
    }
    set textAlign(value) {
        // Decorator will handle this
    }
    get contain() {
        return 'none';
    }
    set contain(value) {
        // Decorator will handle this
    }
    get scrollable() {
        return false;
    }
    set scrollable(value) {
        // Decorator will handle this
    }
    get scrollY() {
        return 0;
    }
    set scrollY(value) {
        // Decorator will handle this
    }
    get offsetY() {
        return 0;
    }
    set offsetY(value) {
        // Decorator will handle this
    }
    get letterSpacing() {
        return 0;
    }
    set letterSpacing(value) {
        // Decorator will handle this
    }
}
__decorate([
    structProp('string')
], TextNodeStruct.prototype, "text", null);
__decorate([
    structProp('string', {
        propToBuffer(value) {
            // Property accepts `null` but the buffer only accepts a string.
            // Encode `null` as a special string
            return value ?? '$$null';
        },
        bufferToProp(value) {
            return value === '$$null' ? null : value;
        },
    })
], TextNodeStruct.prototype, "textRendererOverride", null);
__decorate([
    structProp('number')
], TextNodeStruct.prototype, "fontSize", null);
__decorate([
    structProp('string')
], TextNodeStruct.prototype, "fontFamily", null);
__decorate([
    structProp('string')
], TextNodeStruct.prototype, "fontStretch", null);
__decorate([
    structProp('string')
], TextNodeStruct.prototype, "fontStyle", null);
__decorate([
    structProp('string')
], TextNodeStruct.prototype, "fontWeight", null);
__decorate([
    structProp('string')
], TextNodeStruct.prototype, "textAlign", null);
__decorate([
    structProp('string')
], TextNodeStruct.prototype, "contain", null);
__decorate([
    structProp('boolean')
], TextNodeStruct.prototype, "scrollable", null);
__decorate([
    structProp('number')
], TextNodeStruct.prototype, "scrollY", null);
__decorate([
    structProp('number')
], TextNodeStruct.prototype, "offsetY", null);
__decorate([
    structProp('number')
], TextNodeStruct.prototype, "letterSpacing", null);
//# sourceMappingURL=TextNodeStruct.js.map