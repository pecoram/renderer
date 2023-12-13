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
import { BufferStruct, structProp, genTypeId } from '@lightningjs/threadx';
export class NodeStruct extends BufferStruct {
    static typeId = genTypeId('NODE');
    get x() {
        return 0;
    }
    set x(value) {
        // Decorator will handle this
    }
    get y() {
        return 0;
    }
    set y(value) {
        // Decorator will handle this
    }
    get width() {
        return 0;
    }
    set width(value) {
        // Decorator will handle this
    }
    get height() {
        return 0;
    }
    set height(value) {
        // Decorator will handle this
    }
    get alpha() {
        return 1;
    }
    set alpha(value) {
        // Decorator will handle this
    }
    get clipping() {
        return false;
    }
    set clipping(value) {
        // Decorator will handle this
    }
    get color() {
        return 0;
    }
    set color(value) {
        // Decorator will handle this
    }
    get colorTop() {
        return 0;
    }
    set colorTop(value) {
        // Decorator will handle this
    }
    get colorBottom() {
        return 0;
    }
    set colorBottom(value) {
        // Decorator will handle this
    }
    get colorLeft() {
        return 0;
    }
    set colorLeft(value) {
        // Decorator will handle this
    }
    get colorRight() {
        return 0;
    }
    set colorRight(value) {
        // Decorator will handle this
    }
    get colorTl() {
        return 0;
    }
    set colorTl(value) {
        // Decorator will handle this
    }
    get colorTr() {
        return 0;
    }
    set colorTr(value) {
        // Decorator will handle this
    }
    get colorBl() {
        return 0;
    }
    set colorBl(value) {
        // Decorator will handle this
    }
    get colorBr() {
        return 0;
    }
    set colorBr(value) {
        // Decorator will handle this
    }
    get scaleX() {
        return 1;
    }
    set scaleX(value) {
        // Decorator will handle this
    }
    get scaleY() {
        return 1;
    }
    set scaleY(value) {
        // Decorator will handle this
    }
    get mount() {
        return 0;
    }
    set mount(value) {
        // Decorator will handle this
    }
    get mountX() {
        return 0;
    }
    set mountX(value) {
        // Decorator will handle this
    }
    get mountY() {
        return 0;
    }
    set mountY(value) {
        // Decorator will handle this
    }
    get pivot() {
        return 0.5;
    }
    set pivot(value) {
        // Decorator will handle this
    }
    get pivotX() {
        return 0.5;
    }
    set pivotX(value) {
        // Decorator will handle this
    }
    get pivotY() {
        return 0.5;
    }
    set pivotY(value) {
        // Decorator will handle this
    }
    get rotation() {
        return 0;
    }
    set rotation(value) {
        // Decorator will handle this
    }
    get parentId() {
        return 0;
    }
    set parentId(value) {
        // Decorator will handle this
    }
    get zIndex() {
        return 0;
    }
    set zIndex(value) {
        // Decorator will handle this
    }
    get zIndexLocked() {
        return 0;
    }
    set zIndexLocked(value) {
        // Decorator will handle this
    }
}
__decorate([
    structProp('number')
], NodeStruct.prototype, "x", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "y", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "width", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "height", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "alpha", null);
__decorate([
    structProp('boolean')
], NodeStruct.prototype, "clipping", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "color", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "colorTop", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "colorBottom", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "colorLeft", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "colorRight", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "colorTl", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "colorTr", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "colorBl", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "colorBr", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "scaleX", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "scaleY", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "mount", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "mountX", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "mountY", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "pivot", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "pivotX", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "pivotY", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "rotation", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "parentId", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "zIndex", null);
__decorate([
    structProp('number')
], NodeStruct.prototype, "zIndexLocked", null);
//# sourceMappingURL=NodeStruct.js.map