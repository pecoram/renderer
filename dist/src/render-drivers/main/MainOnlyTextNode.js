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
import { MainOnlyNode, getNewId } from './MainOnlyNode.js';
import { CoreTextNode } from '../../core/CoreTextNode.js';
export class MainOnlyTextNode extends MainOnlyNode {
    constructor(props, rendererMain, stage) {
        super(props, rendererMain, stage, new CoreTextNode(stage, {
            id: getNewId(),
            x: props.x,
            y: props.y,
            width: props.width,
            height: props.height,
            alpha: props.alpha,
            clipping: props.clipping,
            color: props.color,
            colorTop: props.colorTop,
            colorBottom: props.colorBottom,
            colorLeft: props.colorLeft,
            colorRight: props.colorRight,
            colorTl: props.colorTl,
            colorTr: props.colorTr,
            colorBl: props.colorBl,
            colorBr: props.colorBr,
            zIndex: props.zIndex,
            zIndexLocked: props.zIndexLocked,
            scaleX: props.scaleX,
            scaleY: props.scaleY,
            mountX: props.mountX,
            mountY: props.mountY,
            mount: props.mount,
            pivot: props.pivot,
            pivotX: props.pivotX,
            pivotY: props.pivotY,
            rotation: props.rotation,
            // Text properties
            text: props.text,
            fontSize: props.fontSize,
            fontFamily: props.fontFamily,
            fontWeight: props.fontWeight,
            fontStretch: props.fontStretch,
            fontStyle: props.fontStyle,
            contain: props.contain,
            scrollable: props.scrollable,
            letterSpacing: props.letterSpacing,
            textAlign: props.textAlign,
            scrollY: props.scrollY,
            offsetY: props.offsetY,
            textRendererOverride: props.textRendererOverride,
            debug: props.debug,
            lineHeight: props.lineHeight,
            maxLines: props.maxLines,
            maxLinesSuffix: props.maxLinesSuffix,
            textOverflow: props.textOverflow,
            // These properties will get set appropriately in the base MainOnlyNode class
            parent: null,
            texture: null,
            textureOptions: null,
            shader: null,
            shaderProps: null,
        }));
    }
    get text() {
        return this.coreNode.text;
    }
    set text(value) {
        this.coreNode.text = value;
    }
    get textRendererOverride() {
        return this.coreNode.textRendererOverride;
    }
    set textRendererOverride(value) {
        this.coreNode.textRendererOverride = value;
    }
    get fontSize() {
        return this.coreNode.fontSize;
    }
    set fontSize(value) {
        this.coreNode.fontSize = value;
    }
    get fontFamily() {
        return this.coreNode.fontFamily;
    }
    set fontFamily(value) {
        this.coreNode.fontFamily = value;
    }
    get fontWeight() {
        return this.coreNode.fontWeight;
    }
    set fontWeight(value) {
        this.coreNode.fontWeight = value;
    }
    get fontStretch() {
        return this.coreNode.fontStretch;
    }
    set fontStretch(value) {
        this.coreNode.fontStretch = value;
    }
    get fontStyle() {
        return this.coreNode.fontStyle;
    }
    set fontStyle(value) {
        this.coreNode.fontStyle = value;
    }
    get textAlign() {
        return this.coreNode.textAlign;
    }
    set textAlign(value) {
        this.coreNode.textAlign = value;
    }
    get contain() {
        return this.coreNode.contain;
    }
    set contain(value) {
        this.coreNode.contain = value;
    }
    get scrollable() {
        return this.coreNode.scrollable;
    }
    set scrollable(value) {
        this.coreNode.scrollable = value;
    }
    get scrollY() {
        return this.coreNode.scrollY;
    }
    set scrollY(value) {
        this.coreNode.scrollY = value;
    }
    get offsetY() {
        return this.coreNode.offsetY;
    }
    set offsetY(value) {
        this.coreNode.offsetY = value;
    }
    get letterSpacing() {
        return this.coreNode.letterSpacing;
    }
    set letterSpacing(value) {
        this.coreNode.letterSpacing = value;
    }
    get lineHeight() {
        return this.coreNode.lineHeight;
    }
    set lineHeight(value) {
        if (value) {
            this.coreNode.lineHeight = value;
        }
    }
    get maxLines() {
        return this.coreNode.maxLines;
    }
    set maxLines(value) {
        if (value) {
            this.coreNode.maxLines = value;
        }
    }
    get maxLinesSuffix() {
        return this.coreNode.maxLinesSuffix;
    }
    set maxLinesSuffix(value) {
        if (value) {
            this.coreNode.maxLinesSuffix = value;
        }
    }
    get textOverflow() {
        return this.coreNode.textOverflow;
    }
    set textOverflow(value) {
        if (value) {
            this.coreNode.textOverflow = value;
        }
    }
    get debug() {
        return this.coreNode.debug;
    }
    set debug(value) {
        this.coreNode.debug = value;
    }
}
//# sourceMappingURL=MainOnlyTextNode.js.map