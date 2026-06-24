import { create } from "zustand";
import { logger, MiniCozeApi } from "../../utils";
import { ChatService } from "../../services";
export const createApiClientStore = ({ auth, setting, chat, }) => {
    const { token, onRefreshToken, connectorId = "999" } = auth;
    const { apiBaseUrl, requestHeader = {}, onGetCustomChatService, } = setting || {};
    const apiClient = new MiniCozeApi({
        token,
        allowPersonalAccessTokenInBrowser: true,
        baseURL: apiBaseUrl,
        axiosOptions: {
            headers: Object.assign({}, requestHeader),
        },
        debug: logger.isDebug(),
        onRefreshToken: onRefreshToken,
    });
    const chatServiceProps = {
        apiClient,
        connectorId,
        appId: chat.appId,
        chatType: chat.type,
    };
    const chatService = (onGetCustomChatService === null || onGetCustomChatService === void 0 ? void 0 : onGetCustomChatService(chatServiceProps)) ||
        new ChatService(chatServiceProps);
    return create()((_set) => ({
        connectorId,
        apiClient,
        chatService,
    }));
};
//# sourceMappingURL=api-client.js.map