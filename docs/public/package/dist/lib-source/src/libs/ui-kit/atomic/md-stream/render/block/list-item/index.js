import { jsx as _jsx } from "react/jsx-runtime";
import { View } from '@tarojs/components';
import { Block } from '../';
export const ListItem = ({ node }) => {
    return (_jsx(View, { children: node.children.map((item, index) => (_jsx(Block, { node: item }, index))) }));
};
//# sourceMappingURL=index.js.map