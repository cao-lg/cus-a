import type { ChatInfo, ChatType } from '../base';
interface ChatInfoAction {
    setChatInfo: (info: ChatInfo) => void;
    setIsLoading: (isLoading: boolean) => void;
    setCustomChatInfo: (info: ChatInfo) => void;
    setError: (error: Error | null) => void;
}
interface ChatInfoState {
    id: string;
    type: ChatType;
    error: Error | null;
    isLoading: boolean;
    info: ChatInfo | null;
}
export type ChatInfoStore = ChatInfoAction & ChatInfoState;
export {};
