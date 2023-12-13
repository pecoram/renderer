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
import { SpecialCodepoints } from '../../../renderers/SdfTextRenderer/internal/SpecialCodepoints.js';
import { FontShaper, } from './FontShaper.js';
export class SdfFontShaper extends FontShaper {
    data;
    kernings;
    constructor(data) {
        super();
        this.data = data;
        const kernings = (this.kernings = {});
        data.kernings.forEach((kerning) => {
            const second = kerning.second;
            const firsts = (kernings[second] = kernings[second] || {});
            firsts[kerning.first] = kerning.amount;
        });
        this.kernings = kernings;
    }
    *shapeText(props, codepoints) {
        let codepointResult;
        let lastGlyphId = undefined;
        while ((codepointResult = codepoints.peek()) && !codepointResult.done) {
            const codepoint = codepointResult.value;
            const glyph = this.data.chars.find((char) => char.id === codepoint);
            codepoints.next();
            if (glyph !== undefined) {
                // We found a glyph for this codepoint
                // Yield the mapped glyph info
                /**
                 * Kerning includes any possible additional letter spacing
                 */
                const kerning = lastGlyphId !== undefined
                    ? (this.kernings[glyph.id]?.[lastGlyphId] || 0) +
                        props.letterSpacing
                    : 0;
                lastGlyphId = glyph.id;
                yield {
                    mapped: true,
                    glyphId: glyph.id,
                    codepoint,
                    cluster: codepoints.lastIndex,
                    xAdvance: glyph.xadvance + kerning,
                    yAdvance: 0,
                    xOffset: glyph.xoffset + kerning,
                    yOffset: glyph.yoffset,
                    xBearing: 0,
                    yBearing: 0,
                    width: glyph.width,
                    height: glyph.height,
                };
            }
            else {
                // We didn't find a glyph for this codepoint
                // Yield the unmapped codepoint info
                // If this codepoint is a linebreak, we should reset the last glyph id
                // so that the next glyph will not be kerned with the last glyph of the
                // previous line.
                if (codepoint === SpecialCodepoints.LINE_FEED) {
                    lastGlyphId = undefined;
                }
                yield {
                    mapped: false,
                    codepoint,
                    cluster: codepoints.lastIndex,
                };
            }
        }
    }
}
//# sourceMappingURL=SdfFontShaper.js.map