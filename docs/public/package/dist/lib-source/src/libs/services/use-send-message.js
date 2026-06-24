import { useCallback } from "react";
import { showToast } from "../utils";
import { useApiClientStore, useUserInfoStore } from "../provider";
import { SendMessageEvent } from "../types";
import { useConversationStore, useChatStatusStore, useChatInfoStore, useI18n, } from "../provider/context/chat-store-context";
import { getSendMessageHandler, RawMessageType, } from "./helper/message";
export const useSendMessage = () => {
    const { setSendMessageService, conversationId, sectionId, popLastErrorChatGroup, } = useConversationStore((store) => ({
        setSendMessageService: store.setSendMessageService,
        conversationId: store.id,
        sectionId: store.sectionId,
        popLastErrorChatGroup: store.popLastErrorChatGroup,
    }));
    const i18n = useI18n();
    const userInfo = useUserInfoStore((store) => store.info);
    const botId = useChatInfoStore((store) => store.id);
    const { getOpDisabledState, setIsDeleting } = useChatStatusStore((store) => ({
        setIsDeleting: store.setIsDeleting,
        getOpDisabledState: store.getOpDisabledState,
    }));
    const { connectorId, chatService } = useApiClientStore((store) => ({
        connectorId: store.connectorId,
        chatService: store.chatService,
    }));
    const sendMessage = useCallback((rawMessage, historyMessages) => {
        const { clearMessage: disableState } = getOpDisabledState();
        if (disableState) {
            return;
        }
        if (!botId || !conversationId) {
            return;
        }
        setIsDeleting(true);
        const sendMessageHandler = getSendMessageHandler({
            botId,
            chatService,
            conversationId,
            userId: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.id) || "",
            connectorId,
            sectionId,
        });
        sendMessageHandler.on(SendMessageEvent.Close, () => {
            setIsDeleting(false);
        });
        sendMessageHandler.on(SendMessageEvent.ReceiveComplete, (event) => {
            if (event.error) {
                showToast({
                    content: i18n.t("sendFailed"),
                    icon: "error",
                    duration: 2000,
                });
            }
        });
        setSendMessageService(sendMessageHandler);
        sendMessageHandler.sendRawMessage(rawMessage, historyMessages);
    }, [botId, conversationId, userInfo, connectorId, sectionId]);
    const sendTextMessage = useCallback((content) => {
        sendMessage({
            type: RawMessageType.TEXT,
            data: content,
        });
    }, [sendMessage]);
    const sendFileMessage = useCallback((files) => {
        sendMessage({
            type: RawMessageType.FILE,
            data: files,
        });
    }, [sendMessage]);
    const reSendLastErrorMessage = useCallback(() => {
        var _a, _b;
        const chatMessageGroup = popLastErrorChatGroup();
        if ((_a = chatMessageGroup === null || chatMessageGroup === void 0 ? void 0 : chatMessageGroup.query) === null || _a === void 0 ? void 0 : _a.rawMessage) {
            sendMessage((_b = chatMessageGroup === null || chatMessageGroup === void 0 ? void 0 : chatMessageGroup.query) === null || _b === void 0 ? void 0 : _b.rawMessage);
        }
    }, [sendMessage]);
    return {
        sendMessage,
        sendTextMessage,
        sendFileMessage,
        reSendLastErrorMessage,
    };
};
//# sourceMappingURL=use-send-message.js.map