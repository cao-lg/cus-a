import { FC } from "react";
import { type ChooseFileInfo } from "../../types";
export declare const ChatInput: FC<{
    isNeedUpload?: boolean;
    defaultValue?: string;
    disabled?: boolean;
    placeholder?: string;
    inputAdjustDefault?: boolean;
    onKeyBoardHeightChange?: (height: number) => void;
    onSendTextMessage?: (text: string) => void;
    onSendFileMessage?: (files: ChooseFileInfo[]) => void;
}>;
