import { type ISendMessage } from "../services/send-message";
import { type ChatMessage } from "../base";
import { type IMiniChatError } from "../utils/error";
export interface ChatMessageGroup {
    id: string;
    chatId: string;
    query?: ChatMessage;
    isAWaiting?: boolean;
    respMessages: ChatMessage[];
    sectionId?: string;
    isPrologue?: boolean;
}
export interface ConversationState {
    id?: string;
    sectionId?: string;
    prevCursorId?: string;
    prevHasMore?: boolean;
    prevError?: IMiniChatError;
    nextCursorId?: string;
    nextHasMore?: boolean;
    nextError?: IMiniChatError;
    chatMessageGroups: ChatMessageGroup[];
    inProcessChatMessageGroup?: ChatMessageGroup;
    sendMessageService?: ISendMessage;
    isUnshiftingMessageFlag: boolean;
    scrollTop?: number;
}
interface ConversationAction {
    setConversationDetail: (detail: Omit<ConversationState, "chatMessageGroups" | "isUnshiftingMessageFlag">, messageList: ChatMessage[]) => void;
    pushMessageList: (list: ChatMessage[], groupLocalId?: string) => void;
    unshiftMessageList: (conversationId: string, list: ChatMessage[]) => void;
    popLastErrorChatGroup: () => ChatMessageGroup | null;
    setNewConversationId: (id: string) => void;
    setSectionId: (id: string) => void;
    isShowOnBoarding: () => boolean;
    setPrevInfo: (prevHasMore: boolean, prevCursorId: string) => void;
    setNextInfo: (nextHasMore: boolean, nextCursorId: string) => void;
    setPrevError: (error: IMiniChatError) => void;
    setNextError: (error: IMiniChatError) => void;
    clearUnshiftingMessageFlg: (scrollTop?: number) => void;
    setSendMessageService: (service: ISendMessage) => void;
    closeSendMessage: () => void;
}
export type ConversationStore = ConversationAction & ConversationState;
export {};
