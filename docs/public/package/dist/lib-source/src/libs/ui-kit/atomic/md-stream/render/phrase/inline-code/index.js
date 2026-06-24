import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from "@tarojs/components";
export const InlineCode = ({ node }) => {
    return _jsx(Text, Object.assign({ selectable: true }, { children: node.value }));
};
//# sourceMappingURL=index.js.map