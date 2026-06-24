import { ChatService, type ChatServiceProps } from "../../libs";
import { type IChatFlowProps } from "../type";
import { StreamChatReq, RequestOptions, StreamChatData } from "@coze/api";
export declare const getCustomAppInfo: (chatFlowProps: IChatFlowProps) => {
    name?: undefined;
    icon_url?: undefined;
    onboarding_info?: undefined;
    description?: undefined;
    create_time?: undefined;
    update_time?: undefined;
    version?: undefined;
} | {
    name: string;
    icon_url: string;
    onboarding_info: {
        prologue: string;
        suggested_questions: string[];
    };
    description: string;
    create_time: number;
    update_time: number;
    version: string;
};
export declare class ChatFlowService extends ChatService {
    private chatFlowProps;
    constructor(props: ChatServiceProps, chatFlowProps: IChatFlowProps);
    createNewConversation(): Promise<{
        conversationId: string;
        sectionId: string;
    }>;
    getAppInfo(): Promise<{
        name?: undefined;
        icon_url?: undefined;
        onboarding_info?: undefined;
        description?: undefined;
        create_time?: undefined;
        update_time?: undefined;
        version?: undefined;
        appId: string;
        type: import("../../libs").ChatType;
    } | {
        name: string;
        icon_url: string;
        onboarding_info: {
            prologue: string;
            suggested_questions: string[];
        };
        description: string;
        create_time: number;
        update_time: number;
        version: string;
        appId: string;
        type: import("../../libs").ChatType;
    }>;
    getOrCreateConversationId(): Promise<{
        conversationId: string;
        sectionId: string;
    }>;
    private _createNewConversation;
    asyncChat(params: StreamChatReq & {
        connector_id?: string;
    }, options?: RequestOptions): AsyncIterable<StreamChatData>;
}
