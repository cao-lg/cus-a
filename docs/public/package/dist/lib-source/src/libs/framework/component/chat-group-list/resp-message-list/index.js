import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Spacing, MessageContent, WaitingMessage, isSupportAnswerMessage, MessageContainer, } from "../../../../ui-kit";
import { useChatInfoStore, useChatPropsStore } from "../../../../provider";
import { SuggestionList } from "../suggestion-list";
import styles from "./index.module.less";
export const RespMessageList = ({ messages, isAWaiting, isShowSuggestion }) => {
    const appInfo = useChatInfoStore((info) => info.info);
    const answerMessages = useMemo(() => messages.filter((item) => isSupportAnswerMessage(item)), [messages]);
    const followUpMessages = useMemo(() => messages
        .filter((item) => item.type === "follow_up" && item.content)
        .slice(0, 3), [messages]);
    if (!isAWaiting &&
        answerMessages.length === 0 &&
        followUpMessages.length === 0) {
        // 兜底
        // 没有回答
        return null;
    }
    return (_jsx(MessageContainer, Object.assign({ className: styles["resp-container"], senderInfo: {
            name: (appInfo === null || appInfo === void 0 ? void 0 : appInfo.name) || "",
            avatar: (appInfo === null || appInfo === void 0 ? void 0 : appInfo.icon_url) || "",
            id: (appInfo === null || appInfo === void 0 ? void 0 : appInfo.appId) || "",
        } }, { children: _jsx(RespMessageListContent, { isAWaiting: isAWaiting, isShowSuggestion: isShowSuggestion, followUpMessages: followUpMessages, answerMessages: answerMessages }) })));
};
const RespMessageListContent = ({ answerMessages, followUpMessages, isAWaiting, isShowSuggestion }) => {
    const onImageClick = useChatPropsStore((store) => {
        var _a;
        return (_a = store.eventCallbacks) === null || _a === void 0 ? void 0 : _a.onImageClick;
    });
    if (isAWaiting &&
        answerMessages.length === 0 &&
        followUpMessages.length === 0) {
        return _jsx(WaitingMessage, {});
    }
    const isNeedWaitingMessage = isAWaiting && !answerMessages.some((item) => !item.isComplete);
    return (_jsxs(Spacing, Object.assign({ className: styles.resp, vertical: true, gap: 8 }, { children: [_jsx(Spacing, Object.assign({ vertical: true, className: styles.answer, gap: 16 }, { children: answerMessages.map((item, index) => (_jsx(MessageContent, { message: item, onImageClick: onImageClick, isAWaiting: 
                    // 如果是回答的最后一条消息，同时是等待中的消息，则添加一个圆点的等待状态
                    followUpMessages.length === 0 &&
                        answerMessages.length - 1 === index &&
                        isAWaiting &&
                        !item.isComplete }, item.id || `noId_${index}`))) })), followUpMessages.length > 0 && isShowSuggestion ? (_jsx(SuggestionList, { messages: followUpMessages })) : null, isNeedWaitingMessage ? _jsx(WaitingMessage, {}) : null] })));
};
//# sourceMappingURL=index.js.map