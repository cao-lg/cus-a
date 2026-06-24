import { type EnterMessage } from "@coze/api";
import { type ChatMessage, type ChooseFileInfo } from "..";
import { MiniChatError } from "../../utils";
export declare enum SendMessageEvent {
    ReceiveMessage = "receiveMessage",
    ReceiveComplete = "receiveComplete",
    Close = "close"
}
export declare enum RawMessageType {
    TEXT = "text",
    FILE = "file"
}
export type RawMessage = {
    type: RawMessageType.TEXT;
    data: string;
} | {
    type: RawMessageType.FILE;
    data: ChooseFileInfo[];
};
export interface SendMessageEventData {
    messages: ChatMessage[];
    status: "complete" | "in_process" | "break" | "error";
    error?: MiniChatError;
}
export interface ISendMessage {
    sendRawMessage(_rawMessage: RawMessage, _historyMessages?: EnterMessage[]): any;
    sendMessage(_message: EnterMessage, _historyMessages?: EnterMessage[]): any;
    on(eventName: SendMessageEvent, callback: (args: SendMessageEventData) => void): any;
    off(eventName: SendMessageEvent, callback: (args: SendMessageEventData) => void): any;
    close(data?: SendMessageEventData): any;
    break(): any;
}
