import { jsx as _jsx } from "react/jsx-runtime";
import cls from "classnames";
import { Text } from "@tarojs/components";
import { getEnv, navigateTo } from "@tarojs/taro";
import styles from "./index.module.less";
const isH5 = getEnv() === "WEB";
export const Link = ({ className, src, children, }) => (_jsx(Text, Object.assign({ className: cls(styles.link, className), onClick: () => {
        if (isH5) {
            window.open(src);
        }
        else {
            navigateTo({
                url: src,
            });
        }
    } }, { children: children })));
//# sourceMappingURL=index.js.map