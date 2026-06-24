import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Spacing } from "../../atomic/spacing";
import { View, Text } from "@tarojs/components";
import { Avatar } from "../../atomic/avatar";
import styles from "./index.module.less";
export const MessageContainer = ({ children, senderInfo, className }) => {
    return (_jsxs(Spacing, Object.assign({ gap: 12, className: className }, { children: [_jsx(View, { children: _jsx(Avatar, { src: (senderInfo === null || senderInfo === void 0 ? void 0 : senderInfo.avatar) || "", size: "medium" }) }), _jsxs(Spacing, Object.assign({ vertical: true, flex1: true, gap: 5, className: styles["content"] }, { children: [(senderInfo === null || senderInfo === void 0 ? void 0 : senderInfo.name) ? (_jsx(View, { children: _jsx(Text, Object.assign({ numberOfLines: 1, overflow: "ellipsis" }, { children: senderInfo === null || senderInfo === void 0 ? void 0 : senderInfo.name })) })) : null, children] }))] })));
};
//# sourceMappingURL=index.js.map