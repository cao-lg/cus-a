import { FC } from "react";
import { ChatMessage } from "../../../../types";
export declare const QueryMessage: FC<{
    message: ChatMessage;
    isAWaiting?: boolean;
    isLastMessage?: boolean;
    hasRespMessage?: boolean;
}>;
