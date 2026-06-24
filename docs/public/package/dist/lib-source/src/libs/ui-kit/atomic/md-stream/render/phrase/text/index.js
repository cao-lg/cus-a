import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Text as TaroText } from "@tarojs/components";
import { Break } from "../break";
import { Fragment, useMemo } from "react";
import cls from "classnames";
import styles from "./index.module.less";
export const Text = ({ node }) => {
    const textList = useMemo(() => node.value.split("\n"), [node.value]);
    return (_jsx(_Fragment, { children: textList.map((item, index) => {
            return (_jsxs(Fragment, { children: [item ? (_jsx(TaroText, Object.assign({ selectable: true, className: cls(styles.text, styles.important) }, { children: item }))) : null, index !== textList.length - 1 ? _jsx(Break, {}) : null] }, index));
        }) }));
};
//# sourceMappingURL=index.js.map