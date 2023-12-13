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
import { MainOnlyNode, getNewId } from './MainOnlyNode.js';
import { Stage } from '../../core/Stage.js';
import { MainOnlyTextNode } from './MainOnlyTextNode.js';
import { loadCoreExtension } from '../utils.js';
export class MainCoreDriver {
    root = null;
    stage = null;
    rendererMain = null;
    async init(rendererMain, rendererSettings, canvas) {
        this.stage = new Stage({
            rootId: getNewId(),
            appWidth: rendererSettings.appWidth,
            appHeight: rendererSettings.appHeight,
            deviceLogicalPixelRatio: rendererSettings.deviceLogicalPixelRatio,
            devicePhysicalPixelRatio: rendererSettings.devicePhysicalPixelRatio,
            clearColor: rendererSettings.clearColor,
            canvas,
            fpsUpdateInterval: rendererSettings.fpsUpdateInterval,
            debug: {
                monitorTextureCache: false,
            },
        });
        this.rendererMain = rendererMain;
        assertTruthy(this.stage.root);
        const node = new MainOnlyNode(rendererMain.resolveNodeDefaults({}), this.rendererMain, this.stage, this.stage.root);
        this.root = node;
        node.once('beforeDestroy', this.onBeforeDestroyNode.bind(this, node));
        this.onCreateNode(node);
        // Load the Core Extension Module if one was specified.
        if (rendererSettings.coreExtensionModule) {
            await loadCoreExtension(rendererSettings.coreExtensionModule, this.stage);
        }
        // Forward fpsUpdate events from the stage to RendererMain
        this.stage.on('fpsUpdate', (stage, fps) => {
            this.onFpsUpdate(fps);
        });
    }
    createNode(props) {
        assertTruthy(this.rendererMain);
        assertTruthy(this.stage);
        const node = new MainOnlyNode(props, this.rendererMain, this.stage);
        node.once('beforeDestroy', this.onBeforeDestroyNode.bind(this, node));
        this.onCreateNode(node);
        return node;
    }
    createTextNode(props) {
        assertTruthy(this.rendererMain);
        assertTruthy(this.stage);
        const node = new MainOnlyTextNode(props, this.rendererMain, this.stage);
        node.once('beforeDestroy', this.onBeforeDestroyNode.bind(this, node));
        this.onCreateNode(node);
        return node;
    }
    // TODO: Remove?
    destroyNode(node) {
        node.destroy();
    }
    releaseTexture(id) {
        const { stage } = this;
        assertTruthy(stage);
        stage.txManager.removeTextureIdFromCache(id);
    }
    getRootNode() {
        assertTruthy(this.root);
        return this.root;
    }
    //#region Event Methods
    // The implementations for these event methods are provided by RendererMain
    onCreateNode(node) {
        throw new Error('Method not implemented.');
    }
    onBeforeDestroyNode(node) {
        throw new Error('Method not implemented.');
    }
    onFpsUpdate(fps) {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=MainCoreDriver.js.map