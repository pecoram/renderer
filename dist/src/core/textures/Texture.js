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
import { EventEmitter } from '../../common/EventEmitter.js';
/**
 * Represents a source of texture data for a CoreContextTexture.
 *
 * @remarks
 * Texture sources are used to populate a CoreContextTexture when that texture
 * is loaded. Texture data retrieved by the CoreContextTexture by the
 * `getTextureData` method. It's the responsibility of the concerete `Texture`
 * subclass to implement this method appropriately.
 */
export class Texture extends EventEmitter {
    txManager;
    /**
     * The dimensions of the texture
     *
     * @remarks
     * Until the texture data is loaded for the first time the value will be
     * `null`.
     */
    dimensions = null;
    error = null;
    state = 'loading';
    constructor(txManager) {
        super();
        this.txManager = txManager;
    }
    /**
     * Set the state of the texture
     *
     * @remark
     * Intended for internal-use only but declared public so that it can be set
     * by it's associated {@link CoreContextTexture}
     *
     * @param state
     * @param args
     */
    setState(state, ...args) {
        if (this.state !== state) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            this.state = state;
            if (state === 'loaded') {
                const loadedArgs = args;
                this.dimensions = loadedArgs[0];
            }
            else if (state === 'failed') {
                const failedArgs = args;
                this.error = failedArgs[0];
            }
            this.emit(state, ...args);
        }
    }
    /**
     * Make a cache key for this texture.
     *
     * @remarks
     * Each concrete `Texture` subclass must implement this method to provide an
     * appropriate cache key for the texture type including the texture's
     * properties that uniquely identify a copy of the texture. If the texture
     * type does not support caching, then this method should return `false`.
     *
     * @param props
     * @returns
     * A cache key for this texture or `false` if the texture type does not
     * support caching.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static makeCacheKey(props) {
        return false;
    }
    /**
     * Resolve the default values for the texture's properties.
     *
     * @remarks
     * Each concrete `Texture` subclass must implement this method to provide
     * default values for the texture's optional properties.
     *
     * @param props
     * @returns
     * The default values for the texture's properties.
     */
    static resolveDefaults(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    props) {
        return {};
    }
}
//# sourceMappingURL=Texture.js.map