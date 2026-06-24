import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { View, Text, Image } from "@tarojs/components";
import { SuggestionList } from "../suggestion-list";
import { MarkdownMessage } from "../message/markdown";
import { ErrorBoundary } from "../atomic/error-boundary";
import styles from "./index.module.less";
import { logger } from "../../utils";
export const OnBoarding = ({ chat: chatInfo, user: userInfo, onClickSuggestion, onImageClick, }) => {
    var _a, _b;
    const prologue = useMemo(() => {
        var _a;
        return (((_a = chatInfo === null || chatInfo === void 0 ? void 0 : chatInfo.onboarding_info) === null || _a === void 0 ? void 0 : _a.prologue) || "").replaceAll("{{user_name}}", (userInfo === null || userInfo === void 0 ? void 0 : userInfo.name) || "");
    }, [(_a = chatInfo === null || chatInfo === void 0 ? void 0 : chatInfo.onboarding_info) === null || _a === void 0 ? void 0 : _a.prologue]);
    logger.debug("OnBoarding props", prologue, chatInfo);
    return (_jsxs(View, Object.assign({ className: styles.container }, { children: [_jsxs(View, Object.assign({ className: styles["info-container"] }, { children: [_jsx(Image, { src: (chatInfo === null || chatInfo === void 0 ? void 0 : chatInfo.icon_url) || "", className: styles["app-avatar"], mode: "aspectFill" }), _jsx(Text, Object.assign({ className: styles["chat-name"], overflow: "ellipsis", numberOfLines: 1 }, { children: chatInfo === null || chatInfo === void 0 ? void 0 : chatInfo.name })), _jsx(ErrorBoundary, Object.assign({ fallbackNode: _jsx(_Fragment, {}) }, { children: prologue ? (_jsx(MarkdownMessage, { content: prologue, className: styles.prologue, onImageClick: onImageClick })) : null }))] })), _jsx(SuggestionList, { suggestions: ((_b = chatInfo === null || chatInfo === void 0 ? void 0 : chatInfo.onboarding_info) === null || _b === void 0 ? void 0 : _b.suggested_questions) || [], onClickSuggestion: onClickSuggestion })] })));
};
//# sourceMappingURL=index.js.map