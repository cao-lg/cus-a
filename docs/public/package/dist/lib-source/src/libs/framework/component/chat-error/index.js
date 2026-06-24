import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Image, Text, View } from "@tarojs/components";
import { Spacing, Button } from "../../../ui-kit";
import { useChatPropsStore, useI18n } from "../../../provider";
import ChatErrorImg from "../../../ui-kit/assets/imgs/error-default.png";
import styles from "./index.module.less";
export const ChatErrorDefault = ({ retryChatInit, }) => {
    const i18n = useI18n();
    return (_jsx(View, Object.assign({ className: styles.container }, { children: _jsx(Spacing, Object.assign({ horizontalCenter: true, flex1: true, verticalCenter: true }, { children: _jsxs(Spacing, Object.assign({ vertical: true, verticalCenter: true, horizontalCenter: true, gap: 16 }, { children: [_jsx(Image, { src: ChatErrorImg, className: styles["error-img"] }), _jsx(Text, Object.assign({ className: styles["error-txt"] }, { children: i18n.t("chatInitRetry") })), _jsx(Button, Object.assign({ onClick: retryChatInit }, { children: i18n.t("retryBtn") }))] })) })) })));
};
export const ChatError = ({ retryChatInit, }) => {
    const renderError = useChatPropsStore((store) => { var _a, _b; return (_b = (_a = store.ui) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.renderError; });
    if (renderError) {
        return _jsx(_Fragment, { children: renderError(undefined, retryChatInit) });
    }
    return _jsx(ChatErrorDefault, {});
};
//# sourceMappingURL=index.js.map