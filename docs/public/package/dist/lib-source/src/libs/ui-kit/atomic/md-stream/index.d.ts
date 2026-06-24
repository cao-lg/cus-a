import { FC, PropsWithChildren } from "react";
import { type IOnImageClickEvent } from "../../../types";
export interface MarkdownProps {
    theme?: "light" | "dark";
    markdown: string;
    isSmooth?: boolean;
    isFinish?: boolean;
    interval?: number;
    onMarkdownEnd?: () => void;
    onRenderMarkdownChange?: (md: string) => void;
    onImageClick?: IOnImageClickEvent;
}
export declare const MdStream: FC<PropsWithChildren<MarkdownProps>>;
