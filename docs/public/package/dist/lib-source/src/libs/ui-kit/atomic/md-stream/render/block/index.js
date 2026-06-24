import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View } from '@tarojs/components';
import { Html } from '../phrase/html';
import { Code } from './code';
import { Heading } from './heading';
import { Paragraph } from './paragpha';
import { Blockquote } from './blockquote';
import { List } from './list';
import { ListItem } from './list-item';
export const BlockTypes = [
    'code',
    'heading',
    'paragraph',
    'blockquote',
    'list',
    'listItem',
    'table',
    'thematicBreak',
];
export const Block = ({ node }) => {
    return (_jsxs(View, { children: [node.type === 'html' && _jsx(Html, { node: node }), node.type === 'code' && _jsx(Code, { node: node }), node.type === 'heading' && _jsx(Heading, { node: node }), node.type === 'paragraph' && _jsx(Paragraph, { node: node }), node.type === 'blockquote' && _jsx(Blockquote, { node: node }), node.type === 'list' && _jsx(List, { node: node }), node.type === 'listItem' && _jsx(ListItem, { node: node }), node.type === 'table' && null /* 不做处理，做一个标记*/, node.type === 'thematicBreak' && null /* 不做处理，做一个标记*/] }));
};
//# sourceMappingURL=index.js.map