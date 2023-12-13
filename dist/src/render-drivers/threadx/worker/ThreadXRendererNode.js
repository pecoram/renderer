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
import { SharedNode } from '../SharedNode.js';
import { ThreadX } from '@lightningjs/threadx';
import { assertTruthy } from '../../../utils.js';
import { CoreAnimation } from '../../../core/animations/CoreAnimation.js';
import { CoreAnimationController } from '../../../core/animations/CoreAnimationController.js';
import { CoreNode } from '../../../core/CoreNode.js';
export class ThreadXRendererNode extends SharedNode {
    stage;
    coreNode;
    _parent = null;
    _children = [];
    texture = null;
    animationControllers = new Map();
    constructor(stage, sharedNodeStruct, coreNode, extendedCurProps) {
        super(sharedNodeStruct, extendedCurProps);
        this.stage = stage;
        // This Proxy makes sure properties on the coreNode that an animation
        // changes are also updated on the shared node.
        // TODO: Improve this pattern because its ugly!!!
        this.coreNode = new Proxy(coreNode || this.createCoreNode(stage, sharedNodeStruct), {
            set: (target, prop, value) => {
                // Only set the numeric properties on the shared node.
                if (prop !== 'parent' && prop !== 'texture' && prop !== 'shader') {
                    Reflect.set(this, prop, value);
                }
                return Reflect.set(target, prop, value);
            },
        });
        // Set up parent
        const parent = ThreadX.instance.getSharedObjectById(sharedNodeStruct.parentId);
        assertTruthy(parent instanceof ThreadXRendererNode || parent === null);
        this.parent = parent;
        // Create inbound event listeners
        // TOOD: Make sure event listeners are removed when the node is destroyed.
        this.on('createAnimation', (target, { id, props, settings }) => {
            const animation = new CoreAnimation(this.coreNode, props, settings);
            animation.on('finished', () => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                this.emit('animationFinished', {
                    id: id,
                    loop: settings.loop,
                });
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
            const controller = new CoreAnimationController(this.stage.animationManager, animation);
            this.animationControllers.set(id, controller);
        });
        this.on('destroyAnimation', (target, { id }) => {
            this.animationControllers.delete(id);
        });
        this.on('startAnimation', (target, { id }) => {
            this.animationControllers.get(id)?.start();
        });
        this.on('stopAnimation', (target, { id }) => {
            this.animationControllers.get(id)?.stop();
        });
        this.on('pauseAnimation', (target, { id }) => {
            this.animationControllers.get(id)?.pause();
        });
        this.on('loadTexture', (target, textureDesc) => {
            this.coreNode.loadTexture(textureDesc.txType, textureDesc.props, textureDesc.options);
        });
        this.on('loadShader', (target, shaderDesc) => {
            this.coreNode.loadShader(shaderDesc.shType, shaderDesc.props);
        });
        this.on('unloadTexture', (target) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
            this.coreNode.unloadTexture();
        });
        // Forward on CoreNode events
        this.coreNode.on('loaded', (target, payload) => {
            this.emit('loaded', payload);
        });
        this.coreNode.on('failed', (target, payload) => {
            this.emit('failed', payload);
        });
    }
    onPropertyChange(propName, newValue, oldValue) {
        if (propName === 'parentId') {
            const parent = ThreadX.instance.getSharedObjectById(newValue);
            assertTruthy(parent instanceof ThreadXRendererNode || parent === null);
            this.parent = parent;
            return;
        }
        else {
            // @ts-expect-error Ignore readonly assignment errors
            this.coreNode[propName] =
                newValue;
        }
    }
    //#region Parent/Child Props
    get parent() {
        return this._parent;
    }
    set parent(newParent) {
        const oldParent = this._parent;
        this._parent = newParent;
        this.coreNode.parent = newParent?.coreNode ?? null;
        this.parentId = newParent?.id ?? 0;
        if (oldParent) {
            const index = oldParent.children.indexOf(this);
            assertTruthy(index !== -1, "ThreadXRendererNode.parent: Node not found in old parent's children!");
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
    createCoreNode(stage, sharedNodeStruct) {
        const parent = ThreadX.instance.getSharedObjectById(sharedNodeStruct.parentId);
        assertTruthy(parent instanceof ThreadXRendererNode || parent === null);
        const node = new CoreNode(stage, {
            id: sharedNodeStruct.id,
            x: sharedNodeStruct.x,
            y: sharedNodeStruct.y,
            width: sharedNodeStruct.width,
            height: sharedNodeStruct.height,
            alpha: sharedNodeStruct.alpha,
            clipping: sharedNodeStruct.clipping,
            color: sharedNodeStruct.color,
            colorTop: sharedNodeStruct.colorTop,
            colorBottom: sharedNodeStruct.colorBottom,
            colorLeft: sharedNodeStruct.colorLeft,
            colorRight: sharedNodeStruct.colorRight,
            colorTl: sharedNodeStruct.colorTl,
            colorTr: sharedNodeStruct.colorTr,
            colorBl: sharedNodeStruct.colorBl,
            colorBr: sharedNodeStruct.colorBr,
            zIndex: sharedNodeStruct.zIndex,
            zIndexLocked: sharedNodeStruct.zIndexLocked,
            scaleX: sharedNodeStruct.scaleX,
            scaleY: sharedNodeStruct.scaleY,
            mount: sharedNodeStruct.mount,
            mountX: sharedNodeStruct.mountX,
            mountY: sharedNodeStruct.mountY,
            pivot: sharedNodeStruct.pivot,
            pivotX: sharedNodeStruct.pivotX,
            pivotY: sharedNodeStruct.pivotY,
            rotation: sharedNodeStruct.rotation,
            // These are passed in via message handlers
            shader: null,
            shaderProps: null,
            texture: null,
            textureOptions: null,
            // Setup the parent after
            parent: null,
        });
        return node;
    }
}
//# sourceMappingURL=ThreadXRendererNode.js.map