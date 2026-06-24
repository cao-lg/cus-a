import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View } from "@tarojs/components";
import { Spacing } from "../spacing";
import { SvgErrorFill, SvgClose, SvgSuccessFill } from "../svg";
import styles from "./index.module.less";
import cls from "classnames";
const SvgMap = {
    success: SvgSuccessFill,
    error: SvgErrorFill,
    none: null,
};
export const Toast = ({ children, onClose, className, icon = "none" }) => {
    const Icon = SvgMap[icon];
    return (_jsxs(Spacing, Object.assign({ verticalCenter: true, horizontalCenter: true, className: cls(styles.container, className), gap: 12 }, { children: [Icon ? _jsx(Icon, { className: styles.icon }) : null, _jsx(View, Object.assign({ className: styles.content }, { children: children })), _jsx(SvgClose, { onClick: onClose })] })));
};
//# sourceMappingURL=index.js.map