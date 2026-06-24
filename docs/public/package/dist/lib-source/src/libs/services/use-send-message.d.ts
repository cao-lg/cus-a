import { type EnterMessage } from "@coze/api";
import { ChooseFileInfo } from "../types";
import { type RawMessage } from "./helper/message";
export declare const useSendMessage: () => {
    sendMessage: (rawMessage: RawMessage, historyMessages?: EnterMessage[]) => void;
    sendTextMessage: (content: string) => void;
    sendFileMessage: (files: ChooseFileInfo[]) => void;
    reSendLastErrorMessage: () => void;
};
