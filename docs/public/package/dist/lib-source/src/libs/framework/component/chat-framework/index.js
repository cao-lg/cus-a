var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useChatInit } from "../../../services";
import { ChatFrameProvider, useChatInfoStore } from "../../../provider";
import cls from "classnames";
import { ChatSlot } from "../chat-slot";
import { ChatLoading } from "../chat-loading";
import { Spacing } from "../../../ui-kit";
import { ChatFooter } from "../chat-footer";
import { ChatHeader } from "../chat-header";
import { View } from "@tarojs/components";
import { ChatToast } from "../chat-toast";
import "../../../ui-kit/token/index.css";
import styles from "./index.module.less";
import { logger } from "../../../utils";
import { ChatError } from "../chat-error";
const ChatFrameInit = ({ children }) => {
    const { isLoading, error } = useChatInfoStore((store) => ({
        isLoading: store.isLoading,
        error: store.error,
    }));
    logger.info("in chat frame init", { isLoading, error });
    const { retryChatInit } = useChatInit();
    if (error) {
        return _jsx(ChatError, { retryChatInit: retryChatInit });
    }
    if (isLoading) {
        return _jsx(ChatLoading, {});
    }
    return _jsx(_Fragment, { children: children });
};
export const ChatFramework = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (_jsx(ChatFrameProvider, Object.assign({}, props, { children: _jsxs(Spacing, Object.assign({ vertical: true, className: cls(styles.container, "light-theme chat-root") }, { children: [_jsx(ChatHeader, {}), _jsx(View, Object.assign({ className: styles.chat }, { children: _jsx(ChatFrameInit, { children: children || _jsx(ChatSlot, {}) }) })), _jsx(ChatFooter, {}), _jsx(ChatToast, {})] })) })));
};
//# sourceMappingURL=index.js.map