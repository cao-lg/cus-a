import { FC } from "react";
import { IOnImageClickEvent, type ChatMessage } from "../../../types";
export declare const MessageContent: FC<{
    message: ChatMessage;
    isAWaiting?: boolean;
    onImageClick?: IOnImageClickEvent;
}>;
