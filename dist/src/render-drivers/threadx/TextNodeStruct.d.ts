import { NodeStruct, type NodeStructWritableProps } from './NodeStruct.js';
import type { TextRendererMap, TrProps } from '../../core/text-rendering/renderers/TextRenderer.js';
export interface TextNodeStructWritableProps extends NodeStructWritableProps, Omit<TrProps, 'debug'> {
    textRendererOverride: keyof TextRendererMap | null;
}
export declare class TextNodeStruct extends NodeStruct implements TextNodeStructWritableProps {
    static readonly typeId: number;
    get text(): string;
    set text(value: string);
    get textRendererOverride(): TextNodeStructWritableProps['textRendererOverride'];
    set textRendererOverride(value: TextNodeStructWritableProps['textRendererOverride']);
    get fontSize(): number;
    set fontSize(value: number);
    get fontFamily(): TextNodeStructWritableProps['fontFamily'];
    set fontFamily(value: TextNodeStructWritableProps['fontFamily']);
    get fontStretch(): TextNodeStructWritableProps['fontStretch'];
    set fontStretch(value: TextNodeStructWritableProps['fontStretch']);
    get fontStyle(): TextNodeStructWritableProps['fontStyle'];
    set fontStyle(value: TextNodeStructWritableProps['fontStyle']);
    get fontWeight(): TextNodeStructWritableProps['fontWeight'];
    set fontWeight(value: TextNodeStructWritableProps['fontWeight']);
    get textAlign(): TextNodeStructWritableProps['textAlign'];
    set textAlign(value: TextNodeStructWritableProps['textAlign']);
    get contain(): TextNodeStructWritableProps['contain'];
    set contain(value: TextNodeStructWritableProps['contain']);
    get scrollable(): TextNodeStructWritableProps['scrollable'];
    set scrollable(value: TextNodeStructWritableProps['scrollable']);
    get scrollY(): TextNodeStructWritableProps['scrollY'];
    set scrollY(value: TextNodeStructWritableProps['scrollY']);
    get offsetY(): TextNodeStructWritableProps['offsetY'];
    set offsetY(value: TextNodeStructWritableProps['offsetY']);
    get letterSpacing(): TextNodeStructWritableProps['letterSpacing'];
    set letterSpacing(value: TextNodeStructWritableProps['letterSpacing']);
    get lineHeight(): TextNodeStructWritableProps['lineHeight'];
    set lineHeight(value: TextNodeStructWritableProps['lineHeight']);
    get maxLines(): TextNodeStructWritableProps['maxLines'];
    set maxLines(value: TextNodeStructWritableProps['maxLines']);
    get maxLinesSuffix(): TextNodeStructWritableProps['maxLinesSuffix'];
    set maxLinesSuffix(value: TextNodeStructWritableProps['maxLinesSuffix']);
    get textOverflow(): TextNodeStructWritableProps['textOverflow'];
    set textOverflow(value: TextNodeStructWritableProps['textOverflow']);
    get verticalAlign(): TextNodeStructWritableProps['verticalAlign'];
    set verticalAlign(value: TextNodeStructWritableProps['verticalAlign']);
    get textBaseline(): TextNodeStructWritableProps['textBaseline'];
    set textBaseline(value: TextNodeStructWritableProps['textBaseline']);
}
