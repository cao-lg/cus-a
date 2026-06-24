import type { CozeAPI, StreamChatData, StreamChatReq, RequestOptions, CreateFileReq, FileObject } from "@coze/api";
import type { ChatInfo, ChatType } from "..";
import { type ChatV3Message } from "@coze/api";
import { ConversationState } from "../provider/conversation";
import { IMiniChatError } from "../utils/error";
interface GetMessageListRes extends Pick<ConversationState, "prevCursorId" | "nextCursorId" | "prevHasMore" | "nextHasMore"> {
    error?: IMiniChatError;
    messages: ChatV3Message[];
}
export interface ChatServiceProps {
    apiClient: CozeAPI;
    connectorId?: string;
    appId: string;
    chatType: ChatType;
}
export interface IChatService {
    createNewConversation(): Promise<{
        conversationId: string;
        sectionId: string;
    }>;
    createNewSection(conversationId: string): Promise<{
        sectionId: string;
    }>;
    getAppInfo(): Promise<ChatInfo>;
    getOrCreateConversationId(): Promise<{
        conversationId: string;
        sectionId: string;
    }>;
    getMessageList({ conversationId, prevCursorId, limit, }: {
        conversationId: string;
        prevCursorId?: string;
        limit?: number;
    }): Promise<GetMessageListRes>;
    asyncChat(params: StreamChatReq & {
        connector_id?: string;
    }, options?: RequestOptions): AsyncIterable<StreamChatData>;
    upload(params: CreateFileReq, options?: RequestOptions): Promise<FileObject>;
}
export {};
