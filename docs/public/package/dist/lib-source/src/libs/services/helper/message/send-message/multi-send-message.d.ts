import { type EnterMessage } from "@coze/api";
import { RawMessageType, type RawMessage, ChooseFileInfo } from "../../../../types";
import { RawSendMessage } from "./raw-send-message";
export { RawMessageType, type RawMessage };
export interface ObjectStringItemMix {
    type: "file" | "image";
    name?: string;
    size?: string;
    file_url: string;
    file_id?: string;
    file_info?: ChooseFileInfo;
}
export declare class MultiSendMessage extends RawSendMessage {
    sendTextMessage(content: string, historyMessages?: EnterMessage[]): Promise<void>;
    sendFileMessage(files: ChooseFileInfo[], historyMessages?: EnterMessage[]): Promise<void>;
    private uploadFile;
    private getObjectStringType;
    private packFileObject;
    sendRawMessage(rawMessage: RawMessage, historyMessages?: EnterMessage[]): Promise<void>;
}
