import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import cls from "classnames";
import { ScrollView, Spinning, ErrorRetry, ErrorRetryBtn } from "../../../ui-kit";
import { useScrollMore } from "../../../services";
import { useConversationStore, useI18n } from "../../../provider";
import styles from "./index.module.less";
export const ChatScrollView = ({ children }) => {
    const { prevError, isNeedPrevLoadMore, upperThreshold, onScrollToUpper } = useScrollMore();
    const i18n = useI18n();
    const { inProcessChatMessageGroup, isUnshiftingMessageFlag, clearUnshiftingMessageFlg, } = useConversationStore((store) => ({
        inProcessChatMessageGroup: store.inProcessChatMessageGroup,
        isUnshiftingMessageFlag: store.isUnshiftingMessageFlag,
        clearUnshiftingMessageFlg: store.clearUnshiftingMessageFlg,
    }));
    useEffect(() => {
        if (isUnshiftingMessageFlag) {
            clearUnshiftingMessageFlg();
        }
    }, [isUnshiftingMessageFlag]);
    return (_jsxs(ScrollView, Object.assign({ id: "chatScroll", className: cls(styles["scroll-container"]), scrollY: true, isScrollTopTop: !!inProcessChatMessageGroup, isLoadMore: isUnshiftingMessageFlag, lowerThreshold: upperThreshold, onScrollToLower: onScrollToUpper }, { children: [prevError ? (_jsx(ErrorRetry, { errorText: i18n.t("messageListRetry", {
                    retry: (_jsx(ErrorRetryBtn, { retryText: i18n.t("retryBtn"), onClick: () => {
                            onScrollToUpper === null || onScrollToUpper === void 0 ? void 0 : onScrollToUpper();
                        } })),
                }) })) : isNeedPrevLoadMore ? (_jsx(Spinning, { text: i18n.t("messageListLoading"), className: styles.loading, size: "small" })) : null, children] })));
};
//# sourceMappingURL=index.js.map