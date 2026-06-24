import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { View } from "@tarojs/components";
import cls from "classnames";
import { ListItem } from "../list-item";
import styles from "./index.module.less";
export const List = ({ node }) => {
    return (_jsx(View, { children: node.children.map((item, index) => (_jsxs(View, Object.assign({ className: cls(styles.item) }, { children: [_jsx(View, Object.assign({ className: cls(styles.dot, {
                        [styles.ordered]: !!node.ordered,
                    }) }, { children: node.ordered ? _jsxs(_Fragment, { children: [index + 1, "."] }) : null })), _jsx(View, Object.assign({ className: styles.content }, { children: _jsx(ListItem, { node: item }) }))] }), index))) }));
};
//# sourceMappingURL=index.js.map