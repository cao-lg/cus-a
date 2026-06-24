import { create } from "zustand";
import { useChatPropsContext } from "../context";
import { useMemo } from "react";
import { useUpdateEffect } from "../../hooks";
import { logger } from "../../utils";
const getCustomChatInfo = (chat) => {
    return Object.fromEntries(Object.entries({
        name: chat.name,
        description: chat.description,
        icon_url: chat.icon_url,
        onboarding_info: chat.onboarding_info,
    }).filter(([_, value]) => value !== undefined));
};
const createChatInfoStore = ({ chat }) => {
    // If the chat's parameter(name, description, icon_url, onboarding_info) is not empty, then use it to set the chat info
    const customChatInfo = getCustomChatInfo(chat);
    return create()((set, get) => ({
        id: chat.appId,
        type: chat.type,
        info: null,
        isLoading: false,
        error: null,
        setIsLoading: (isLoading) => {
            set({
                isLoading,
                error: null,
            });
        },
        // 设置系统配置的数据
        setChatInfo: (info) => {
            logger.debug("setChatInfo", { initInfo: info, customChatInfo });
            set({
                error: null,
                isLoading: false,
                info: Object.assign(Object.assign({}, info), customChatInfo),
            });
        },
        // 设置自定义参数
        setCustomChatInfo: (info) => {
            Object.assign(customChatInfo, getCustomChatInfo(info));
            const chatInfo = get().info;
            if (!chatInfo) {
                return;
            }
            logger.debug("setCustomChatInfo", { oldInfo: chatInfo, customChatInfo });
            set({
                info: Object.assign(Object.assign({}, chatInfo), customChatInfo),
            });
        },
        setError: (error) => {
            set({
                isLoading: false,
                error,
            });
        },
    }));
};
export const useCreateChatInfoStore = () => {
    const chatProps = useChatPropsContext();
    const chatInfoStore = useMemo(() => createChatInfoStore({ chat: chatProps.chat }), []);
    useUpdateEffect(() => {
        chatInfoStore.getState().setCustomChatInfo(chatProps.chat);
    }, [chatProps.chat]);
    return chatInfoStore;
};
//# sourceMappingURL=chat-info.js.map