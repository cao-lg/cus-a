import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text, Image } from "@tarojs/components";
import { Spacing } from "../../../ui-kit";
import styles from "./index.module.less";
import { useChatPropsStore, useI18n } from "../../../provider";
import CozeLogo from "../../../ui-kit/assets/imgs/coze-logo.png";
import { useCommandSlot } from "../chat-input/hooks/use-command-slot";
import { Fragment } from "react";
export const ChatHeader = () => {
    var _a;
    const header = useChatPropsStore((store) => { var _a; return (_a = store.ui) === null || _a === void 0 ? void 0 : _a.header; });
    const i18n = useI18n();
    const commandSlots = useCommandSlot("headerRight");
    if ((header === null || header === void 0 ? void 0 : header.isNeed) === false) {
        return null;
    }
    return (_jsxs(Spacing, Object.assign({ verticalCenter: true, className: styles.container, gap: 8 }, { children: [_jsx(Image, { src: (header === null || header === void 0 ? void 0 : header.icon) || CozeLogo, className: styles["app-avatar"], mode: "aspectFill" }), _jsx(Text, Object.assign({ className: styles.title, overflow: "ellipsis", numberOfLines: 1 }, { children: (header === null || header === void 0 ? void 0 : header.title) || i18n.t("defaultHeaderTitle") })), commandSlots.map((item, index) => (_jsx(Fragment, { children: item }, index))), (_a = header === null || header === void 0 ? void 0 : header.renderRightSlot) === null || _a === void 0 ? void 0 : _a.call(header)] })));
};
//# sourceMappingURL=index.js.map