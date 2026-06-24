import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from "@tarojs/components";
import { CenterAlignedBox, Link } from "../../../ui-kit";
import styles from "./index.module.less";
import { useI18n, useChatPropsStore } from "../../../provider";
import { useMemo } from "react";
export const ChatFooter = () => {
    const i18n = useI18n();
    const footer = useChatPropsStore((store) => { var _a; return (_a = store.ui) === null || _a === void 0 ? void 0 : _a.footer; });
    const footerContent = useMemo(() => {
        return (footer === null || footer === void 0 ? void 0 : footer.expressionText)
            ? getTextByExpress(footer === null || footer === void 0 ? void 0 : footer.expressionText, footer === null || footer === void 0 ? void 0 : footer.linkvars)
            : i18n.t("chatFooterTip");
    }, [footer === null || footer === void 0 ? void 0 : footer.expressionText, footer === null || footer === void 0 ? void 0 : footer.linkvars]);
    if ((footer === null || footer === void 0 ? void 0 : footer.isNeed) === false) {
        return null;
    }
    return (_jsx(CenterAlignedBox, Object.assign({ className: styles.container }, { children: _jsx(Text, Object.assign({ className: styles.footer, numberOfLines: 1, overflow: "ellipsis" }, { children: footerContent })) })));
};
function getTextByExpress(expressionText, linkvars) {
    const arrLinks = [];
    const splitLinkTag = "{{{link}}}";
    const textWithLinkTags = expressionText.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
        const { link, text: linkText } = (linkvars === null || linkvars === void 0 ? void 0 : linkvars[key]) || {};
        if (link && linkText) {
            arrLinks.push(_jsx(Link, Object.assign({ src: link }, { children: linkText })));
            return splitLinkTag;
        }
        else {
            arrLinks.push(linkText || "");
        }
        return splitLinkTag;
    });
    return textWithLinkTags.split(splitLinkTag).map((item, index) => (_jsxs(Text, { children: [item, arrLinks[index]] }, `text_link_${index}`)));
}
//# sourceMappingURL=index.js.map