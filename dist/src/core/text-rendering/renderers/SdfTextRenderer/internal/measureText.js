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
import { PeekableIterator } from './PeekableGenerator.js';
import { getUnicodeCodepoints } from './getUnicodeCodepoints.js';
/**
 * Measures a single-line of text width ignoring any unmapped glyphs including line breaks
 *
 * @param text
 * @param shaperProps
 * @param shaper
 * @returns
 */
export function measureText(text, shaperProps, shaper) {
    const glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(text, 0), 0));
    let width = 0;
    for (const glyph of glyphs) {
        if (glyph.mapped) {
            width += glyph.xAdvance;
        }
    }
    return width;
}
//# sourceMappingURL=measureText.js.map