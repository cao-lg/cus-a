import type { CreateFileReq, RequestOptions, FileObject, StreamChatReq, StreamChatData } from "@coze/api";
import { IChatService, ChatServiceProps } from "../../types";
import { MiniChatError } from "../../utils";
import { type CozeAPI } from "@coze/api";
import type { ChatInfo, ChatType } from "../../types";
export declare class ChatService implements IChatService {
    protected apiClient: CozeAPI;
    protected connectorId: string;
    protected appId: string;
    protected chatType: ChatType;
    constructor({ apiClient, connectorId, appId, chatType }: ChatServiceProps);
    createNewConversation(): Promise<{
        conversationId: string;
        sectionId: string;
    }>;
    createNewSection(conversationId: any): Promise<{
        sectionId: string;
    }>;
    getAppInfo(): Promise<ChatInfo>;
    getOrCreateConversationId(): Promise<{
        conversationId: string;
        sectionId: string;
    }>;
    getMessageList({ conversationId, prevCursorId, limit, }: {
        conversationId: any;
        prevCursorId: any;
        limit?: number | undefined;
    }): Promise<{
        prevCursorId: string;
        nextCursorId: string;
        prevHasMore: boolean;
        nextHasMore: boolean;
        messages: import("@coze/api").ChatV3Message[];
    } | {
        prevCursorId: undefined;
        nextCursorId: undefined;
        prevHasMore: boolean;
        nextHasMore: boolean;
        messages: never[];
        error: MiniChatError;
    }>;
    asyncChat(params: StreamChatReq & {
        connector_id?: string;
    }, options?: RequestOptions): AsyncIterable<StreamChatData>;
    upload(params: CreateFileReq, options?: RequestOptions): Promise<FileObject>;
}
