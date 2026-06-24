import type { ConversationStore, ChatMessageGroup } from "../../types";
export declare const combineMessageGroup: (groupBefore: ChatMessageGroup[], groupAfter: ChatMessageGroup[]) => ChatMessageGroup[];
export declare const createConversationStore: () => import("zustand").UseBoundStore<import("zustand").StoreApi<ConversationStore>>;
export type CreateConversationStore = ReturnType<typeof createConversationStore>;
