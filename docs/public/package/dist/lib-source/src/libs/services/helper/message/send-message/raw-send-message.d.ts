import { type TaroStatic } from "@tarojs/taro";
import { type EnterMessage } from "@coze/api";
import { MiniChatError } from "../../../../utils";
import { type ChatMessage, ISendMessage, SendMessageEvent, type RawMessage, type SendMessageEventData, IChatService } from "../../../../types";
export interface SendMessageOptions {
    conversationId: string;
    botId: string;
    chatService: IChatService;
    userId: string;
    connectorId: string;
    sectionId?: string;
}
export declare abstract class RawSendMessage implements ISendMessage {
    protected botId: string;
    protected userId: string;
    protected conversationId: string;
    protected sectionId?: string;
    private timeoutId?;
    protected chatId: string;
    protected connectorId: string;
    protected isAbort: boolean;
    protected chatService: IChatService;
    protected event: InstanceType<TaroStatic["Events"]>;
    protected messageSended: ChatMessage;
    protected messageList: ChatMessage[];
    constructor({ conversationId, botId, chatService, userId, connectorId, sectionId, }: SendMessageOptions);
    abstract sendRawMessage(_rawMessage: RawMessage, _historyMessages?: EnterMessage[]): any;
    sendMessage(_message: EnterMessage, _historyMessages?: EnterMessage[]): void;
    on(eventName: SendMessageEvent, callback: (args: SendMessageEventData) => void): void;
    off(eventName: SendMessageEvent, callback: (args: SendMessageEventData) => void): void;
    protected emit(eventName: SendMessageEvent, data: SendMessageEventData): void;
    close(data?: SendMessageEventData): boolean;
    break(): void;
    protected sendStartMessage(message: EnterMessage): void;
    private packMessage;
    protected sendBreakEvent(): void;
    protected sendProcessEvent(): void;
    protected sendCompleteEvent(): void;
    protected sendErrorEvent(error?: MiniChatError): void;
    protected _checkTimeout(timeout?: number): void;
    protected _clearTimeout(): void;
}
