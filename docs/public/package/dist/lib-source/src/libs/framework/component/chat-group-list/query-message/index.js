import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View } from "@tarojs/components";
import { MessageContent, MessageContainer, Spinning, SvgError, } from "../../../../ui-kit";
import cls from "classnames";
import styles from "./index.module.less";
import { useChatPropsStore, useUserInfoStore } from "../../../../provider";
import { useSendMessage } from "../../../../services";
import { logger } from "../../../../utils";
export const QueryMessage = ({ message, isAWaiting = false, hasRespMessage, isLastMessage = false, }) => {
    const userInfo = useUserInfoStore((store) => store.info);
    const { reSendLastErrorMessage } = useSendMessage();
    const isShowError = message.error && !hasRespMessage;
    const isShowLoading = !isShowError && isAWaiting && !message.chat_id;
    const onImageClick = useChatPropsStore((store) => {
        var _a;
        return (_a = store.eventCallbacks) === null || _a === void 0 ? void 0 : _a.onImageClick;
    });
    logger.debug("QueryMessage userInfo", userInfo);
    return (_jsx(MessageContainer, Object.assign({ senderInfo: userInfo || undefined }, { children: _jsxs(View, Object.assign({ className: styles["query-message"] }, { children: [_jsx(MessageContent, { message: message, onImageClick: onImageClick }), isShowLoading ? (_jsx(Spinning, { className: styles["state-slot"], size: "small" })) : null, isShowError ? (_jsx(SvgError, { className: cls(styles["state-slot"], {
                        [styles.disable]: !isLastMessage,
                    }), onClick: () => isLastMessage && (reSendLastErrorMessage === null || reSendLastErrorMessage === void 0 ? void 0 : reSendLastErrorMessage()) })) : null] })) })));
};
//# sourceMappingURL=index.js.map