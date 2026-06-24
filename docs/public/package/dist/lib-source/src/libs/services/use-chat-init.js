var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from "react";
import { logger } from "../utils";
import { useApiClientStore, useChatPropsContext, useChatInfoStore, } from "../provider";
import { MiniChatError } from "../utils";
import { useConversationStore } from "../provider/context/chat-store-context";
export const useChatInit = () => {
    const chatProps = useChatPropsContext();
    const { setChatError, setChatInfo, setChatIsLoading, error: chatError, } = useChatInfoStore((store) => ({
        setChatError: store.setError,
        setChatInfo: store.setChatInfo,
        setChatIsLoading: store.setIsLoading,
        setCustomChatInfo: store.setCustomChatInfo,
        isLoadingChatInfo: store.isLoading,
        error: store.error,
    }));
    const setConversationDetail = useConversationStore((store) => store.setConversationDetail);
    const chatService = useApiClientStore((store) => store.chatService);
    const [retryTime, setRetryTime] = useState(0);
    useEffect(() => {
        if (!checkParams(chatProps)) {
            setChatError(new MiniChatError(-1, "params error"));
            return;
        }
        let isAbort = false;
        setChatError(null);
        setChatIsLoading(true);
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [chatInfo, conversationDetail] = yield Promise.all([
                    chatService.getAppInfo(),
                    getInitConversationDetail(chatService),
                ]);
                if (!isAbort) {
                    setConversationDetail(conversationDetail, conversationDetail.messages);
                    setChatInfo(chatInfo);
                }
            }
            catch (err) {
                setChatError(err);
            }
        }))();
        return () => {
            isAbort = true;
        };
    }, [retryTime, chatService]);
    return {
        retryChatInit: () => {
            if (chatError) {
                setRetryTime(retryTime + 1);
            }
        },
    };
};
/*
 * @param chatProps - The chat props.
 * @returns A boolean value.
 */
function checkParams(chatProps) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!((_a = chatProps === null || chatProps === void 0 ? void 0 : chatProps.setting) === null || _a === void 0 ? void 0 : _a.apiBaseUrl)) {
        logger.error("Setting's apiBaseUrl must be provided");
        return false;
    }
    if (!((_b = chatProps === null || chatProps === void 0 ? void 0 : chatProps.chat) === null || _b === void 0 ? void 0 : _b.appId)) {
        logger.error("Chat's appId must be provided");
        return false;
    }
    if (!((_c = chatProps === null || chatProps === void 0 ? void 0 : chatProps.auth) === null || _c === void 0 ? void 0 : _c.token)) {
        logger.error("Token  must be provided");
        return false;
    }
    if (!((_d = chatProps === null || chatProps === void 0 ? void 0 : chatProps.auth) === null || _d === void 0 ? void 0 : _d.onRefreshToken)) {
        logger.warn("onRefreshToken is not provided; The chat will not be able to refresh the token");
    }
    if (!((_e = chatProps === null || chatProps === void 0 ? void 0 : chatProps.user) === null || _e === void 0 ? void 0 : _e.id) ||
        !((_f = chatProps === null || chatProps === void 0 ? void 0 : chatProps.user) === null || _f === void 0 ? void 0 : _f.name) ||
        !((_g = chatProps === null || chatProps === void 0 ? void 0 : chatProps.user) === null || _g === void 0 ? void 0 : _g.avatar)) {
        logger.warn("User's property (id, name, avatar) is empty; The chat will show a default user");
        return true;
    }
    return true;
}
/*
 * Get the initial conversation detail
 * @param chatService - The chat service to use.
 * @returns The conversation detail(conversationId, sectionId, messages)
 */
function getInitConversationDetail(chatService) {
    return __awaiter(this, void 0, void 0, function* () {
        const { conversationId, sectionId } = yield chatService.getOrCreateConversationId();
        const messageListRes = yield chatService.getMessageList({
            conversationId,
        });
        return Object.assign({ id: conversationId, sectionId }, messageListRes);
    });
}
//# sourceMappingURL=use-chat-init.js.map