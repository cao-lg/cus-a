import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { eventCenter } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { OnBoarding } from "../../../ui-kit";
import { UIEventType } from "../../../types";
import { useSendMessage } from "../../../services";
import { useChatInfoStore, useChatPropsStore, useConversationStore, useUserInfoStore, } from "../../../provider";
import { ChatScrollView } from "../chat-scroll-view";
import { ChatInput } from "../chat-input";
import { ChatGroupList } from "../chat-group-list";
import cls from "classnames";
import styles from "./index.module.less";
import { memo } from "react";
import { logger } from "../../../utils";
const ChatOnBoarding = memo(() => {
    const { chatInfo } = useChatInfoStore((store) => ({
        chatInfo: store.info,
    }));
    const onImageClick = useChatPropsStore((store) => { var _a; return (_a = store.eventCallbacks) === null || _a === void 0 ? void 0 : _a.onImageClick; });
    const { sendTextMessage } = useSendMessage();
    const userInfo = useUserInfoStore((store) => store.info);
    const { isShowOnBoarding } = useConversationStore((store) => ({
        isShowOnBoarding: store.isShowOnBoarding,
        chatMessageGroups: store.chatMessageGroups,
        inProcessChatMessageGroup: store.inProcessChatMessageGroup,
    }));
    logger.debug("ChatOnBoarding:", chatInfo, isShowOnBoarding());
    if (!isShowOnBoarding()) {
        return null;
    }
    return (_jsx(OnBoarding, { user: userInfo || undefined, chat: chatInfo || undefined, onImageClick: onImageClick, onClickSuggestion: (message) => {
            sendTextMessage === null || sendTextMessage === void 0 ? void 0 : sendTextMessage(message);
        } }));
});
export const ChatSlot = memo(({ className }) => {
    logger.debug("In ChatSlot");
    return (_jsxs(View, Object.assign({ className: cls(styles.slot, className), onClick: (event) => {
            eventCenter.trigger(UIEventType.FrameClick, event);
        } }, { children: [_jsxs(ChatScrollView, { children: [_jsx(ChatOnBoarding, {}), _jsx(ChatGroupList, {})] }), _jsx(ChatInput, {})] })));
});
//# sourceMappingURL=index.js.map