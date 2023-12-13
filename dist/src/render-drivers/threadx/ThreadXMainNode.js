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
import { SharedNode } from './SharedNode.js';
import { ThreadXMainAnimationController } from './ThreadXMainAnimationController.js';
export class ThreadXMainNode extends SharedNode {
    rendererMain;
    nextAnimationId = 1;
    _parent = null;
    _children = [];
    _texture = null;
    _shader = null;
    _src = '';
    /**
     * FinalizationRegistry for animation controllers. When an animation
     * controller is garbage collected, we let the render worker know so that
     * it can remove it's corresponding animation controler from it's stored
     * Set. This should ultimately allow the render worker to garbage collect
     * it's animation controller. The animation itself independent from the animation
     * controller, so it will continue to run until it's finished regardless of
     * whether or not the animation controller is garbage collected.
     */
    animationRegistry = new FinalizationRegistry((id) => {
        this.emit('destroyAnimation', { id });
    });
    constructor(rendererMain, sharedNodeStruct, extendedCurProps) {
        super(sharedNodeStruct, extendedCurProps);
        this.rendererMain = rendererMain;
    }
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
            this.emit('loadTexture', texture);
        }
        else {
            this.emit('unloadTexture', {});
        }
    }
    get shader() {
        return this._shader;
    }
    set shader(shader) {
        if (this._shader === shader) {
            return;
        }
        this._shader = shader;
        if (shader) {
            this.emit('loadShader', shader);
        }
    }
    get scale() {
        if (this.scaleX !== this.scaleY) {
            return null;
        }
        return this.scaleX;
    }
    set scale(scale) {
        // We ignore `null` when it's set.
        if (scale === null) {
            return;
        }
        this.scaleX = scale;
        this.scaleY = scale;
    }
    animate(props, settings) {
        const id = this.nextAnimationId++;
        this.emit('createAnimation', { id, props, settings });
        const controller = new ThreadXMainAnimationController(this, id);
        this.animationRegistry.register(controller, id);
        return controller;
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
    //#region Parent/Child Props
    get parent() {
        return this._parent;
    }
    set parent(newParent) {
        const oldParent = this._parent;
        this._parent = newParent;
        this.parentId = newParent?.id ?? 0;
        if (oldParent) {
            const index = oldParent.children.indexOf(this);
            assertTruthy(index !== -1, "ThreadXMainNode.parent: Node not found in old parent's children!");
            oldParent.children.splice(index, 1);
        }
        if (newParent) {
            newParent.children.push(this);
        }
    }
    get children() {
        return this._children;
    }
    //#endregion Parent/Child Props
    get props() {
        return this.curProps;
    }
    destroy() {
        super.destroy();
        this.texture = null;
    }
}
//# sourceMappingURL=ThreadXMainNode.js.map