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
import { assertTruthy } from '../utils.js';
import { EventEmitter } from '../common/EventEmitter.js';
import { Matrix3d } from './lib/Matrix3d.js';
export class CoreNode extends EventEmitter {
    stage;
    children = [];
    props;
    /**
     * Recalculation type
     * 0 - no recalculation
     * 1 - alpha recalculation
     * 2 - translate recalculation
     * 4 - transform recalculation
     */
    recalculationType = 6;
    hasUpdates = true;
    globalTransform;
    scaleRotateTransform;
    localTransform;
    isComplex = false;
    constructor(stage, props) {
        super();
        this.stage = stage;
        this.props = {
            ...props,
            parent: null,
        };
        // Allow for parent to be processed appropriately
        this.parent = props.parent;
        this.updateScaleRotateTransform();
    }
    //#region Textures
    loadTexture(textureType, props, options = null) {
        // First unload any existing texture
        if (this.props.texture) {
            this.unloadTexture();
        }
        const { txManager } = this.stage;
        const texture = txManager.loadTexture(textureType, props, options);
        this.props.texture = texture;
        this.props.textureOptions = options;
        // If texture is already loaded / failed, trigger loaded event manually
        // so that users get a consistent event experience.
        // We do this in a microtask to allow listeners to be attached in the same
        // synchronous task after calling loadTexture()
        queueMicrotask(() => {
            if (texture.state === 'loaded') {
                this.onTextureLoaded(texture, texture.dimensions);
            }
            else if (texture.state === 'failed') {
                this.onTextureFailed(texture, texture.error);
            }
            texture.on('loaded', this.onTextureLoaded);
            texture.on('failed', this.onTextureFailed);
        });
    }
    unloadTexture() {
        if (this.props.texture) {
            this.props.texture.off('loaded', this.onTextureLoaded);
            this.props.texture.off('failed', this.onTextureFailed);
        }
        this.props.texture = null;
        this.props.textureOptions = null;
    }
    onTextureLoaded = (target, dimensions) => {
        this.emit('loaded', {
            type: 'texture',
            dimensions,
        });
    };
    onTextureFailed = (target, error) => {
        this.emit('failed', {
            type: 'texture',
            error,
        });
    };
    //#endregion Textures
    loadShader(shaderType, props) {
        const shManager = this.stage.renderer.getShaderManager();
        assertTruthy(shManager);
        const { shader, props: p } = shManager.loadShader(shaderType, props);
        this.props.shader = shader;
        this.props.shaderProps = p;
    }
    setHasUpdates() {
        if (!this.props.alpha) {
            return;
        }
        this.hasUpdates = true;
        let p = this?.props.parent;
        while (p) {
            p.hasUpdates = true;
            p = p?.props.parent;
        }
    }
    /**
     * 1 - alpha recalculation
     * 2 - translate recalculation
     * 4 - transform recalculation
     * @param type
     */
    setRecalculationType(type) {
        this.recalculationType |= type;
        this.setHasUpdates();
    }
    updateScaleRotateTransform() {
        this.setRecalculationType(4);
        this.scaleRotateTransform = Matrix3d.rotate(this.props.rotation, this.scaleRotateTransform).scale(this.props.scaleX, this.props.scaleY);
        // do transformations when matrix is implemented
        this.updateLocalTransform();
    }
    updateLocalTransform() {
        assertTruthy(this.scaleRotateTransform);
        this.setRecalculationType(2);
        const pivotTranslateX = this.props.pivotX * this.props.width;
        const pivotTranslateY = this.props.pivotY * this.props.height;
        const mountTranslateX = this.props.mountX * this.props.width;
        const mountTranslateY = this.props.mountY * this.props.height;
        this.localTransform = Matrix3d.translate(pivotTranslateX - mountTranslateX + this.props.x, pivotTranslateY - mountTranslateY + this.props.y, this.localTransform)
            .multiply(this.scaleRotateTransform)
            .translate(-pivotTranslateX, -pivotTranslateY);
    }
    /**
     * @todo: test for correct calculation flag
     * @param delta
     */
    update(delta) {
        assertTruthy(this.localTransform);
        const parentGlobalTransform = this.parent?.globalTransform;
        if (parentGlobalTransform) {
            this.globalTransform = Matrix3d.copy(parentGlobalTransform, this.globalTransform).multiply(this.localTransform);
        }
        else {
            this.globalTransform = Matrix3d.copy(this.localTransform, this.globalTransform);
        }
        if (this.children.length) {
            this.children.forEach((child) => {
                child.update(delta);
            });
        }
        // reset update flag
        this.hasUpdates = false;
        // reset recalculation type
        this.recalculationType = 0;
    }
    renderQuads(renderer, clippingRect) {
        const { width, height, colorTl, colorTr, colorBl, colorBr, texture, textureOptions, shader, shaderProps, } = this.props;
        const { zIndex, worldAlpha, globalTransform: gt } = this;
        assertTruthy(gt);
        // add to list of renderables to be sorted before rendering
        renderer.addRenderable({
            width,
            height,
            colorTl,
            colorTr,
            colorBl,
            colorBr,
            texture,
            textureOptions,
            zIndex,
            shader,
            shaderProps,
            alpha: worldAlpha,
            clippingRect,
            tx: gt.tx,
            ty: gt.ty,
            ta: gt.ta,
            tb: gt.tb,
            tc: gt.tc,
            td: gt.td,
        });
        // Calculate absolute X and Y based on all ancestors
        // renderer.addQuad(absX, absY, w, h, color, texture, textureOptions, zIndex);
    }
    //#region Properties
    get id() {
        return this.props.id;
    }
    get x() {
        return this.props.x;
    }
    set x(value) {
        if (this.props.x !== value) {
            this.props.x = value;
            this.updateLocalTransform();
        }
    }
    get absX() {
        return (this.props.x +
            (this.props.parent?.absX || this.props.parent?.globalTransform?.tx || 0));
    }
    get absY() {
        return this.props.y + (this.props.parent?.absY ?? 0);
    }
    get y() {
        return this.props.y;
    }
    set y(value) {
        if (this.props.y !== value) {
            this.props.y = value;
            this.updateLocalTransform();
        }
    }
    get width() {
        return this.props.width;
    }
    set width(value) {
        if (this.props.width !== value) {
            this.props.width = value;
            this.updateLocalTransform();
        }
    }
    get height() {
        return this.props.height;
    }
    set height(value) {
        if (this.props.height !== value) {
            this.props.height = value;
            this.updateLocalTransform();
        }
    }
    get scale() {
        // The CoreNode `scale` property is only used by Animations.
        // Unlike INode, `null` should never be possibility for Animations.
        return this.scaleX;
    }
    set scale(value) {
        // The CoreNode `scale` property is only used by Animations.
        // Unlike INode, `null` should never be possibility for Animations.
        this.scaleX = value;
        this.scaleY = value;
    }
    get scaleX() {
        return this.props.scaleX;
    }
    set scaleX(value) {
        if (this.props.scaleX !== value) {
            this.props.scaleX = value;
            this.updateScaleRotateTransform();
        }
    }
    get scaleY() {
        return this.props.scaleY;
    }
    set scaleY(value) {
        if (this.props.scaleY !== value) {
            this.props.scaleY = value;
            this.updateScaleRotateTransform();
        }
    }
    get worldScaleX() {
        return (this.props.scaleX * (this.props.parent?.worldScaleX ?? 1) ||
            this.props.scaleX);
    }
    get worldScaleY() {
        return (this.props.scaleY * (this.props.parent?.worldScaleY ?? 1) ||
            this.props.scaleY);
    }
    get mount() {
        return this.props.mount;
    }
    set mount(value) {
        // if (this.props.mountX !== value || this.props.mountY !== value) {
        this.props.mountX = value;
        this.props.mountY = value;
        this.props.mount = value;
        this.updateLocalTransform();
        // }
    }
    get mountX() {
        return this.props.mountX;
    }
    set mountX(value) {
        this.props.mountX = value;
        this.updateLocalTransform();
    }
    get mountY() {
        return this.props.mountY;
    }
    set mountY(value) {
        this.props.mountY = value;
        this.updateLocalTransform();
    }
    get pivot() {
        return this.props.pivot;
    }
    set pivot(value) {
        if (this.props.pivotX !== value || this.props.pivotY !== value) {
            this.props.pivotX = value;
            this.props.pivotY = value;
            this.updateLocalTransform();
        }
    }
    get pivotX() {
        return this.props.pivotX;
    }
    set pivotX(value) {
        this.props.pivotX = value;
        this.updateLocalTransform();
    }
    get pivotY() {
        return this.props.pivotY;
    }
    set pivotY(value) {
        this.props.pivotY = value;
        this.updateLocalTransform();
    }
    get rotation() {
        return this.props.rotation;
    }
    set rotation(value) {
        if (this.props.rotation !== value) {
            this.props.rotation = value;
            this.updateScaleRotateTransform();
        }
    }
    get alpha() {
        return this.props.alpha;
    }
    set alpha(value) {
        this.props.alpha = value;
    }
    get worldAlpha() {
        const props = this.props;
        const parent = props.parent;
        return props.alpha * (parent?.worldAlpha || 1);
    }
    get clipping() {
        return this.props.clipping;
    }
    set clipping(value) {
        this.props.clipping = value;
    }
    get color() {
        return this.props.color;
    }
    set color(value) {
        if (this.props.colorTl !== value ||
            this.props.colorTr !== value ||
            this.props.colorBl !== value ||
            this.props.colorBr !== value) {
            this.colorTl = value;
            this.colorTr = value;
            this.colorBl = value;
            this.colorBr = value;
        }
        this.props.color = value;
    }
    get colorTop() {
        return this.props.colorTop;
    }
    set colorTop(value) {
        if (this.props.colorTl !== value || this.props.colorTr !== value) {
            this.colorTl = value;
            this.colorTr = value;
        }
        this.props.colorTop = value;
    }
    get colorBottom() {
        return this.props.colorBottom;
    }
    set colorBottom(value) {
        if (this.props.colorBl !== value || this.props.colorBr !== value) {
            this.colorBl = value;
            this.colorBr = value;
        }
        this.props.colorBottom = value;
    }
    get colorLeft() {
        return this.props.colorLeft;
    }
    set colorLeft(value) {
        if (this.props.colorTl !== value || this.props.colorBl !== value) {
            this.colorTl = value;
            this.colorBl = value;
        }
        this.props.colorLeft = value;
    }
    get colorRight() {
        return this.props.colorRight;
    }
    set colorRight(value) {
        if (this.props.colorTr !== value || this.props.colorBr !== value) {
            this.colorTr = value;
            this.colorBr = value;
        }
        this.props.colorRight = value;
    }
    get colorTl() {
        return this.props.colorTl;
    }
    set colorTl(value) {
        this.props.colorTl = value;
    }
    get colorTr() {
        return this.props.colorTr;
    }
    set colorTr(value) {
        this.props.colorTr = value;
    }
    get colorBl() {
        return this.props.colorBl;
    }
    set colorBl(value) {
        this.props.colorBl = value;
    }
    get colorBr() {
        return this.props.colorBr;
    }
    set colorBr(value) {
        this.props.colorBr = value;
    }
    // we're only interested in parent zIndex to test
    // if we should use node zIndex is higher then parent zIndex
    get zIndexLocked() {
        return this.props.zIndexLocked || 0;
    }
    set zIndexLocked(value) {
        this.props.zIndexLocked = value;
    }
    get zIndex() {
        const props = this.props;
        const z = props.zIndex || 0;
        const p = props.parent?.zIndex || 0;
        if (props.parent?.zIndexLocked) {
            return z < p ? z : p;
        }
        return z;
    }
    set zIndex(value) {
        this.props.zIndex = value;
    }
    get parent() {
        return this.props.parent;
    }
    set parent(newParent) {
        const oldParent = this.props.parent;
        if (oldParent === newParent) {
            return;
        }
        this.props.parent = newParent;
        if (oldParent) {
            const index = oldParent.children.indexOf(this);
            assertTruthy(index !== -1, "CoreNode.parent: Node not found in old parent's children!");
            oldParent.children.splice(index, 1);
        }
        if (newParent) {
            newParent.children.push(this);
        }
        this.updateScaleRotateTransform();
    }
}
//# sourceMappingURL=CoreNode.js.map