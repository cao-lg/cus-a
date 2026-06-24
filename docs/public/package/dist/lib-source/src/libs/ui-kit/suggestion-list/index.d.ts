import { FC } from "react";
interface SuggestionList {
    suggestions: string[];
    onClickSuggestion?: (suggestion: string) => void;
}
export declare const SuggestionList: FC<SuggestionList>;
export {};
