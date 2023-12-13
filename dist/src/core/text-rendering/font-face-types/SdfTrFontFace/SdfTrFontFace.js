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
// import type { Renderer } from '../../../Renderer';
import { assertTruthy } from '../../../../utils.js';
import { WebGlCoreRenderer } from '../../../renderers/webgl/WebGlCoreRenderer.js';
import { ImageTexture } from '../../../textures/ImageTexture.js';
import { TrFontFace } from '../TrFontFace.js';
import { SdfFontShaper } from './internal/SdfFontShaper.js';
export class SdfTrFontFace extends TrFontFace {
    type;
    texture;
    data;
    shaper;
    glyphMap = new Map();
    constructor(fontFamily, descriptors, type, stage, atlasUrl, atlasDataUrl) {
        super(fontFamily, descriptors);
        this.type = type;
        const renderer = stage.renderer;
        assertTruthy(renderer instanceof WebGlCoreRenderer, 'SDF Font Faces can only be used with the WebGL Renderer');
        this.texture = stage.txManager.loadTexture('ImageTexture', {
            src: atlasUrl,
            // IMPORTANT: The SDF shader requires the alpha channel to NOT be
            // premultiplied on the atlas texture. If it is premultiplied, the
            // rendering of SDF glyphs (especially single-channel SDF fonts) will
            // be very jagged.
            premultiplyAlpha: false,
        }, {
            preload: true,
        });
        // TODO: Add texture loaded support
        // this.texture.on('loaded', () => {
        //   this.checkLoaded();
        // });
        // Set this.data to the fetched data from dataUrl
        fetch(atlasDataUrl)
            .then(async (response) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            this.data = await response.json();
            // We know `data` is defined here, because we just set it
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.shaper = new SdfFontShaper(this.data);
            // Add all the glyphs to the glyph map
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.data.chars.forEach((glyph) => {
                this.glyphMap.set(glyph.id, glyph);
            });
            this.checkLoaded();
        })
            .catch(console.error);
    }
    getAtlasEntry(glyphId) {
        const glyph = this.glyphMap.get(glyphId);
        if (glyph === undefined) {
            throw new Error(`Glyph ${glyphId} not found in font ${this.fontFamily}`);
        }
        return {
            x: glyph.x,
            y: glyph.y,
            width: glyph.width,
            height: glyph.height,
        };
    }
    checkLoaded() {
        if (this.loaded)
            return;
        if ( /*this.texture.loaded && */this.data) {
            this.loaded = true;
            this.emit('loaded');
        }
    }
}
//# sourceMappingURL=SdfTrFontFace.js.map