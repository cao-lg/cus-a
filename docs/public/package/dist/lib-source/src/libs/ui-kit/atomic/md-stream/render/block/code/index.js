import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { View } from "@tarojs/components";
import { Text } from "../../phrase/text";
import { Indicator } from "../../phrase/indicator";
import { showToast } from "../../../../../../utils";
import styles from "./index.module.less";
import { setClipboardData } from "@tarojs/taro";
import { useI18n } from "../../../../../../provider";
export const Code = ({ node }) => {
    var _a;
    const i18n = useI18n();
    const children = ((_a = node === null || node === void 0 ? void 0 : node.children) === null || _a === void 0 ? void 0 : _a.length)
        ? node === null || node === void 0 ? void 0 : node.children
        : [
            {
                type: "text",
                value: node.value,
            },
        ];
    return (_jsxs(View, Object.assign({ className: styles.code }, { children: [_jsxs(View, Object.assign({ className: styles.header }, { children: [_jsx(View, Object.assign({ className: styles.lang }, { children: node.lang })), _jsx(View, Object.assign({ className: styles.copy, onClick: () => {
                            setClipboardData({
                                data: node.value,
                                success() {
                                    showToast({
                                        content: i18n.t("copySuccess"),
                                        icon: "success",
                                    });
                                },
                                fail() {
                                    showToast({
                                        content: i18n.t("copyFailed"),
                                        icon: "error",
                                    });
                                },
                            });
                        } }, { children: i18n.t("copyCode") }))] })), _jsx(View, Object.assign({ className: styles.content }, { children: children === null || children === void 0 ? void 0 : children.map((item, index) => (_jsxs(Fragment, { children: [item.type === "text" && _jsx(Text, { node: item }), item.type === "indicator" && _jsx(Indicator, { node: item })] }, index))) }))] })));
};
//# sourceMappingURL=index.js.map