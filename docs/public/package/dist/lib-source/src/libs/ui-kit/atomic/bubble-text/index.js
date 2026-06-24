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
import { jsx as _jsx } from "react/jsx-runtime";
import cls from "classnames";
import { Text } from "@tarojs/components";
import { Bubble } from "../bubble";
import styles from "./index.module.less";
export const BubbleText = (_a) => {
    var { className, text, size = "medium" } = _a, props = __rest(_a, ["className", "text", "size"]);
    return (_jsx(Bubble, Object.assign({}, props, { className: cls(className) }, { children: _jsx(Text, Object.assign({ className: cls(styles["bubble-text"], {
                [styles[size || ""]]: true,
            }), selectable: true }, { children: text })) })));
};
//# sourceMappingURL=index.js.map