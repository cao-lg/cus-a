import type { PhrasingContent } from "mdast";
import { FC } from "react";
import { type IndicatorLocal } from "../../ast";
export declare const PhraseTypes: string[];
export declare const Phrase: FC<{
    node: PhrasingContent | IndicatorLocal;
}>;
