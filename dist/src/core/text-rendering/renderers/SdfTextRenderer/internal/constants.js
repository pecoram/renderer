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
/**
 * Number of floating point numbers that represent a single glyph in the SDF vertex buffer.
 *
 * @remarks
 * The vertex buffer contains:
 *  - 6 vertex positions
 *  - 6 texture coordinates
 *  - = 12 positions/coordinates per glyph
 *
 * Each vertex position and texture coordinate consist of 2 floating point numbers (x/y).
 * So there are 12 * 2 = 24 floating point numbers that make up a single glyph.
 */
export const FLOATS_PER_GLYPH = 24;
//# sourceMappingURL=constants.js.map