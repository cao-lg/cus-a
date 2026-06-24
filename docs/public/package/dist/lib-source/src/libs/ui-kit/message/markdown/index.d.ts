import { FC } from "react";
import { IOnImageClickEvent } from "../../../types";
export declare const MarkdownMessage: FC<{
    content: string;
    isAWaiting?: boolean;
    className?: string;
    onImageClick?: IOnImageClickEvent;
}>;
