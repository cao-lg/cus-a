import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Spacing } from "../../../../ui-kit";
import { RespMessageList } from "../resp-message-list";
import { QueryMessage } from "../query-message";
import styles from "./index.module.less";
export const ChatGroup = ({ chatGroup, isProcessing = false, isLastMessage = false, isShowSuggestion = false, }) => {
    var _a;
    return (_jsxs(Spacing, Object.assign({ vertical: true, gap: 16, className: styles["chat-group"] }, { children: [chatGroup.query ? (_jsx(QueryMessage, { message: chatGroup.query, isAWaiting: isProcessing || false, hasRespMessage: !!chatGroup.respMessages.length, isLastMessage: isLastMessage })) : null, _jsx(RespMessageList, { messages: chatGroup.respMessages, 
                // 当进行中，同时已经消息有返回了，则认为等待接收消息中
                isAWaiting: isProcessing && !!((_a = chatGroup.query) === null || _a === void 0 ? void 0 : _a.chat_id), isShowSuggestion: isShowSuggestion })] })));
};
//# sourceMappingURL=index.js.map