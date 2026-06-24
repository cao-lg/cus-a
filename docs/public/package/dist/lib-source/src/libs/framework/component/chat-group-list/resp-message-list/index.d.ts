import { FC } from "react";
import { ChatMessage } from "../../../../types";
export declare const RespMessageList: FC<{
    messages: ChatMessage[];
    isAWaiting: boolean;
    isShowSuggestion?: boolean;
}>;
