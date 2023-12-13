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
import { CoreAnimation } from '../../core/animations/CoreAnimation.js';
import { CoreAnimationController } from '../../core/animations/CoreAnimationController.js';
import { CoreNode } from '../../core/CoreNode.js';
import { EventEmitter } from '../../common/EventEmitter.js';
let nextId = 1;
export function getNewId() {
    return nextId++;
}
export class MainOnlyNode extends EventEmitter {
    rendererMain;
    stage;
    id;
    coreNode;
    // Prop stores
    _children = [];
    _src = '';
    _parent = null;
    _texture = null;
    _shader = null;
    constructor(props, rendererMain, stage, coreNode) {
        super();
        this.rendererMain = rendererMain;
        this.stage = stage;
        this.id = coreNode?.id ?? getNewId();
        this.coreNode =
            coreNode ||
                new CoreNode(this.stage, {
                    id: this.id,
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
                    parent: null,
                    shader: null,
                    shaderProps: null,
                    texture: null,
                    textureOptions: null,
                });
        // Forward loaded/failed events
        this.coreNode.on('loaded', this.onTextureLoaded);
        this.coreNode.on('failed', this.onTextureFailed);
        // Assign properties to this object
        this.parent = props.parent;
        this.shader = props.shader;
        this.texture = props.texture;
        this.src = props.src;
    }
    get x() {
        return this.coreNode.x;
    }
    set x(value) {
        this.coreNode.x = value;
    }
    get y() {
        return this.coreNode.y;
    }
    set y(value) {
        this.coreNode.y = value;
    }
    get width() {
        return this.coreNode.width;
    }
    set width(value) {
        this.coreNode.width = value;
    }
    get height() {
        return this.coreNode.height;
    }
    set height(value) {
        this.coreNode.height = value;
    }
    get alpha() {
        return this.coreNode.alpha;
    }
    set alpha(value) {
        this.coreNode.alpha = value;
    }
    get clipping() {
        return this.coreNode.clipping;
    }
    set clipping(value) {
        this.coreNode.clipping = value;
    }
    get color() {
        return this.coreNode.color;
    }
    set color(value) {
        this.coreNode.color = value;
    }
    get colorTop() {
        return this.coreNode.colorTop;
    }
    set colorTop(value) {
        this.coreNode.colorTop = value;
    }
    get colorBottom() {
        return this.coreNode.colorBottom;
    }
    set colorBottom(value) {
        this.coreNode.colorBottom = value;
    }
    get colorLeft() {
        return this.coreNode.colorLeft;
    }
    set colorLeft(value) {
        this.coreNode.colorLeft = value;
    }
    get colorRight() {
        return this.coreNode.colorRight;
    }
    set colorRight(value) {
        this.coreNode.colorRight = value;
    }
    get colorTl() {
        return this.coreNode.colorTl;
    }
    set colorTl(value) {
        this.coreNode.colorTl = value;
    }
    get colorTr() {
        return this.coreNode.colorTr;
    }
    set colorTr(value) {
        this.coreNode.colorTr = value;
    }
    get colorBl() {
        return this.coreNode.colorBl;
    }
    set colorBl(value) {
        this.coreNode.colorBl = value;
    }
    get colorBr() {
        return this.coreNode.colorBr;
    }
    set colorBr(value) {
        this.coreNode.colorBr = value;
    }
    get scale() {
        if (this.scaleX !== this.scaleY) {
            return null;
        }
        return this.coreNode.scaleX;
    }
    set scale(value) {
        // We ignore `null` when it's set.
        if (value === null) {
            return;
        }
        this.coreNode.scaleX = value;
        this.coreNode.scaleY = value;
    }
    get scaleX() {
        return this.coreNode.scaleX;
    }
    set scaleX(value) {
        this.coreNode.scaleX = value;
    }
    get scaleY() {
        return this.coreNode.scaleY;
    }
    set scaleY(value) {
        this.coreNode.scaleY = value;
    }
    get mount() {
        return this.coreNode.mount;
    }
    set mount(value) {
        this.coreNode.mount = value;
    }
    get mountX() {
        return this.coreNode.mountX;
    }
    set mountX(value) {
        this.coreNode.mountX = value;
    }
    get mountY() {
        return this.coreNode.mountY;
    }
    set mountY(value) {
        this.coreNode.mountY = value;
    }
    get pivot() {
        return this.coreNode.pivot;
    }
    set pivot(value) {
        this.coreNode.pivot = value;
    }
    get pivotX() {
        return this.coreNode.pivotX;
    }
    set pivotX(value) {
        this.coreNode.pivotX = value;
    }
    get pivotY() {
        return this.coreNode.pivotY;
    }
    set pivotY(value) {
        this.coreNode.pivotY = value;
    }
    get rotation() {
        return this.coreNode.rotation;
    }
    set rotation(value) {
        this.coreNode.rotation = value;
    }
    get parent() {
        return this._parent;
    }
    set parent(newParent) {
        const oldParent = this._parent;
        this._parent = newParent;
        this.coreNode.parent = newParent?.coreNode ?? null;
        if (oldParent) {
            const index = oldParent.children.indexOf(this);
            assertTruthy(index !== -1, "MainOnlyNode.parent: Node not found in old parent's children!");
            oldParent.children.splice(index, 1);
        }
        if (newParent) {
            newParent.children.push(this);
        }
    }
    get children() {
        return this._children;
    }
    get zIndex() {
        return this.coreNode.zIndex;
    }
    set zIndex(value) {
        this.coreNode.zIndex = value;
    }
    get zIndexLocked() {
        return this.coreNode.zIndexLocked;
    }
    set zIndexLocked(value) {
        this.coreNode.zIndexLocked = value;
    }
    get src() {
        return this._src;
    }
    set src(imageUrl) {
        if (this._src === imageUrl) {
            return;
        }
        this._src = imageUrl;
        if (!imageUrl) {
            this.texture = null;
            return;
        }
        this.texture = this.rendererMain.createTexture('ImageTexture', {
            src: imageUrl,
        });
    }
    //#region Texture
    get texture() {
        return this._texture;
    }
    set texture(texture) {
        if (this._texture === texture) {
            return;
        }
        if (this._texture) {
            this.rendererMain.textureTracker.decrementTextureRefCount(this._texture);
        }
        if (texture) {
            this.rendererMain.textureTracker.incrementTextureRefCount(texture);
        }
        this._texture = texture;
        if (texture) {
            this.coreNode.loadTexture(texture.txType, texture.props, texture.options);
        }
        else {
            this.coreNode.unloadTexture();
        }
    }
    onTextureLoaded = (target, payload) => {
        this.emit('loaded', payload);
    };
    onTextureFailed = (target, payload) => {
        this.emit('failed', payload);
    };
    //#endregion Texture
    get shader() {
        return this._shader;
    }
    set shader(shader) {
        if (this._shader === shader) {
            return;
        }
        this._shader = shader;
        if (shader) {
            this.coreNode.loadShader(shader.shType, shader.props);
        }
    }
    destroy() {
        this.emit('beforeDestroy', {});
        this.parent = null;
        this.texture = null;
        this.emit('afterDestroy', {});
        this.removeAllListeners();
    }
    flush() {
        // No-op
    }
    animate(props, settings) {
        const animation = new CoreAnimation(this.coreNode, props, settings);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const controller = new CoreAnimationController(this.stage.animationManager, animation);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return controller;
    }
}
//# sourceMappingURL=MainOnlyNode.js.map