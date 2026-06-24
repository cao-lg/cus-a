import { jsx as _jsx } from "react/jsx-runtime";
import { View } from "@tarojs/components";
import { Phrase } from "../";
import { setClipboardData, getEnv, ENV_TYPE } from "@tarojs/taro";
import cls from "classnames";
import styles from "./index.module.less";
import { useI18n } from "../../../../../../provider";
import { showToast } from "../../../../../../utils";
const isH5 = getEnv() === ENV_TYPE.WEB;
export const Link = ({ node }) => {
    const i18n = useI18n();
    const isValidUrl = node.url && node.url !== "#";
    return (_jsx(View, Object.assign({ onClick: () => {
            if (isValidUrl) {
                if (isH5) {
                    window.open(node.url);
                }
                else {
                    setClipboardData({
                        data: node.url,
                        success() {
                            showToast({
                                content: i18n.t("copyLinkSuccess", { url: node.url }),
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
                }
            }
        }, className: cls(styles.link, {
            [styles.invalid]: !isValidUrl,
        }) }, { children: node.children.map((item, index) => (_jsx(Phrase, { node: item }, index))) })));
};
//# sourceMappingURL=index.js.map