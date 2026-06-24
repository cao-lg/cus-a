import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useMemo } from "react";
import { logger } from "../../utils";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { Language } from "../../types";
import { createApiClientStore, useCreateChatInfoStore, createConversationStore, useCreateStatusStore, useCreateUserInfoStore, useCreateChatPropsStore, } from "../store";
import { I18n as I18nLocal } from "../../i18n";
import { useValidContext } from "../../hooks";
import { useChatPropsContext } from "./chat-frame-props-context";
/**** Begin store的定义位置 */
var StoreType;
(function (StoreType) {
    StoreType[StoreType["ApiClientStore"] = 0] = "ApiClientStore";
    StoreType[StoreType["ChatInfoStore"] = 1] = "ChatInfoStore";
    StoreType[StoreType["ConversationStore"] = 2] = "ConversationStore";
    StoreType[StoreType["ChatStatusStore"] = 3] = "ChatStatusStore";
    StoreType[StoreType["UserInfoStore"] = 4] = "UserInfoStore";
    StoreType[StoreType["I18n"] = 5] = "I18n";
    StoreType[StoreType["ChatPropsStore"] = 6] = "ChatPropsStore";
})(StoreType || (StoreType = {}));
const ChatStoreContext = createContext({
    [StoreType.ApiClientStore]: null,
    [StoreType.ChatInfoStore]: null,
    [StoreType.ConversationStore]: null,
    [StoreType.ChatStatusStore]: null,
    [StoreType.UserInfoStore]: null,
    [StoreType.I18n]: null,
    [StoreType.ChatPropsStore]: null,
});
/*** End store的定义位置 */
export const ChatPropsProvider = ChatStoreContext.Provider;
export const ChatStoreProvider = ({ children }) => {
    const chatProps = useChatPropsContext();
    const { auth, chat, setting } = chatProps;
    logger.setLoglevel(setting === null || setting === void 0 ? void 0 : setting.logLevel);
    const apiClientStore = useMemo(() => createApiClientStore({ auth, setting, chat }), []);
    const chatInfoStore = useCreateChatInfoStore();
    const conversationStore = useMemo(() => createConversationStore(), []);
    const chatStatusStore = useCreateStatusStore();
    const userInfoStore = useCreateUserInfoStore();
    const chatPropsStore = useCreateChatPropsStore();
    const i18nLocal = useMemo(() => (setting === null || setting === void 0 ? void 0 : setting.i18n) || new I18nLocal((setting === null || setting === void 0 ? void 0 : setting.language) || Language.ZH_CN), []);
    logger.debug("ChatFramework props:", chatProps);
    return (_jsx(ChatStoreContext.Provider, Object.assign({ value: {
            [StoreType.ApiClientStore]: apiClientStore,
            [StoreType.ChatInfoStore]: chatInfoStore,
            [StoreType.ConversationStore]: conversationStore,
            [StoreType.ChatStatusStore]: chatStatusStore,
            [StoreType.UserInfoStore]: userInfoStore,
            [StoreType.I18n]: i18nLocal,
            [StoreType.ChatPropsStore]: chatPropsStore,
        } }, { children: children })));
};
const useChatStoreContext = () => useValidContext(ChatStoreContext);
export const useApiClientStore = (selector) => {
    const store = useChatStoreContext();
    return useStoreWithEqualityFn(store[StoreType.ApiClientStore], selector, shallow);
};
export const useChatInfoStore = (selector) => {
    const store = useChatStoreContext();
    return useStoreWithEqualityFn(store[StoreType.ChatInfoStore], selector, shallow);
};
export const useConversationStore = (selector) => {
    const store = useChatStoreContext();
    return useStoreWithEqualityFn(store[StoreType.ConversationStore], selector, shallow);
};
export const useChatStatusStore = (selector) => {
    const store = useChatStoreContext();
    return useStoreWithEqualityFn(store[StoreType.ChatStatusStore], selector, shallow);
};
export const useUserInfoStore = (selector) => {
    const store = useChatStoreContext();
    return useStoreWithEqualityFn(store[StoreType.UserInfoStore], selector, shallow);
};
export const useI18n = () => {
    const store = useChatStoreContext();
    return store[StoreType.I18n];
};
export const useChatPropsStore = (selector) => {
    const store = useChatStoreContext();
    return useStoreWithEqualityFn(store[StoreType.ChatPropsStore], selector, shallow);
};
//# sourceMappingURL=chat-store-context.js.map