import { type EnterMessage } from "@coze/api";
import { MultiSendMessage } from "./multi-send-message";
import { SendMessageOptions } from "./raw-send-message";
export declare class AsyncSendMessage extends MultiSendMessage {
    private chatStream?;
    constructor(props: SendMessageOptions);
    sendMessage(message: EnterMessage, historyMessages?: EnterMessage[]): Promise<void>;
    protected pollAnswer(): Promise<void>;
}
