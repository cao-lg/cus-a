import { jsx as _jsx } from "react/jsx-runtime";
import { RichText } from '@tarojs/components';
export const Html = ({ node }) => {
    return _jsx(RichText, { nodes: `${node.value}` });
};
//# sourceMappingURL=index.js.map