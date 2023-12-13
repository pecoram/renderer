import type { TextRenderer, TextRendererMap, TrProps, TextRendererState } from './text-rendering/renderers/TextRenderer.js';
import { CoreNode, type CoreNodeProps } from './CoreNode.js';
import type { Stage } from './Stage.js';
import type { CoreRenderer } from './renderers/CoreRenderer.js';
import type { Rect } from './lib/utils.js';
export interface CoreTextNodeProps extends CoreNodeProps, TrProps {
    text: string;
    textRendererOverride: keyof TextRendererMap | null;
}
type ICoreTextNode = Omit<CoreTextNodeProps, 'texture' | 'textureOptions' | 'shader' | 'shaderProps'>;
export declare class CoreTextNode extends CoreNode implements ICoreTextNode {
    textRenderer: TextRenderer;
    trState: TextRendererState;
    updateScheduled: boolean;
    private _textRendererOverride;
    constructor(stage: Stage, props: CoreTextNodeProps);
    private onTextLoaded;
    private onTextFailed;
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get color(): number;
    set color(value: number);
    get text(): string;
    set text(value: string);
    get textRendererOverride(): CoreTextNodeProps['textRendererOverride'];
    set textRendererOverride(value: CoreTextNodeProps['textRendererOverride']);
    get fontSize(): CoreTextNodeProps['fontSize'];
    set fontSize(value: CoreTextNodeProps['fontSize']);
    get fontFamily(): CoreTextNodeProps['fontFamily'];
    set fontFamily(value: CoreTextNodeProps['fontFamily']);
    get fontStretch(): CoreTextNodeProps['fontStretch'];
    set fontStretch(value: CoreTextNodeProps['fontStretch']);
    get fontStyle(): CoreTextNodeProps['fontStyle'];
    set fontStyle(value: CoreTextNodeProps['fontStyle']);
    get fontWeight(): CoreTextNodeProps['fontWeight'];
    set fontWeight(value: CoreTextNodeProps['fontWeight']);
    get textAlign(): CoreTextNodeProps['textAlign'];
    set textAlign(value: CoreTextNodeProps['textAlign']);
    get contain(): CoreTextNodeProps['contain'];
    set contain(value: CoreTextNodeProps['contain']);
    get scrollable(): CoreTextNodeProps['scrollable'];
    set scrollable(value: CoreTextNodeProps['scrollable']);
    get scrollY(): CoreTextNodeProps['scrollY'];
    set scrollY(value: CoreTextNodeProps['scrollY']);
    get offsetY(): CoreTextNodeProps['offsetY'];
    set offsetY(value: CoreTextNodeProps['offsetY']);
    get letterSpacing(): CoreTextNodeProps['letterSpacing'];
    set letterSpacing(value: CoreTextNodeProps['letterSpacing']);
    get lineHeight(): CoreTextNodeProps['lineHeight'];
    set lineHeight(value: CoreTextNodeProps['lineHeight']);
    get maxLines(): CoreTextNodeProps['maxLines'];
    set maxLines(value: CoreTextNodeProps['letterSpacing']);
    get maxLinesSuffix(): CoreTextNodeProps['maxLinesSuffix'];
    set maxLinesSuffix(value: CoreTextNodeProps['maxLinesSuffix']);
    get textOverflow(): CoreTextNodeProps['textOverflow'];
    set textOverflow(value: CoreTextNodeProps['textOverflow']);
    get verticalAlign(): CoreTextNodeProps['verticalAlign'];
    set verticalAlign(value: CoreTextNodeProps['verticalAlign']);
    get textBaseline(): CoreTextNodeProps['textBaseline'];
    set textBaseline(value: CoreTextNodeProps['textBaseline']);
    get debug(): CoreTextNodeProps['debug'];
    set debug(value: CoreTextNodeProps['debug']);
    update(delta: number): void;
    private updateText;
    renderQuads(renderer: CoreRenderer, clippingRect: Rect | null): void;
    /**
     * Resolve a text renderer and a new state based on the current text renderer props provided
     * @param props
     * @returns
     */
    private resolveTextRendererAndState;
}
export {};
