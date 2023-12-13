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
import { EventEmitter } from '../../../common/EventEmitter.js';
export class TrFontFace extends EventEmitter {
    fontFamily;
    descriptors;
    loaded = false;
    constructor(fontFamily, descriptors) {
        super();
        this.fontFamily = fontFamily;
        this.descriptors = {
            style: 'normal',
            weight: 'normal',
            stretch: 'normal',
            ...descriptors,
        };
    }
    /**
     * Convert a TrFontFaceDescriptors to a FontFaceDescriptors which differ slightly
     *
     * @param descriptors
     * @returns
     */
    static convertToCssFontFaceDescriptors(descriptors) {
        return {
            style: descriptors.style,
            weight: typeof descriptors.weight === 'number'
                ? `${descriptors.weight}`
                : descriptors.weight,
            stretch: descriptors.stretch,
            unicodeRange: descriptors.unicodeRange,
            variant: descriptors.variant,
            featureSettings: descriptors.featureSettings,
            display: descriptors.display,
        };
    }
}
//# sourceMappingURL=TrFontFace.js.map