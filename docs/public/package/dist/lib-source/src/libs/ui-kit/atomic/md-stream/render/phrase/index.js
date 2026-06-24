import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Break } from "./break";
import { Text } from "./text";
import { Delete } from "./delete";
import { Emphasis } from "./emphasis";
import { Html } from "./html";
import { Image } from "./image";
import { InlineCode } from "./inline-code";
import { Link } from "./link";
import { Strong } from "./strong";
import { Indicator } from "./indicator";
export const PhraseTypes = [
    "break",
    "delete",
    "emphasis",
    "footnoteReference",
    "html",
    "image",
    "imageReference",
    "inlineCode",
    "link",
    "linkReference",
    "strong",
    "text",
    "indicator",
];
export const Phrase = ({ node }) => {
    return (_jsxs(_Fragment, { children: [node.type === "break" && _jsx(Break, {}), node.type === "delete" && _jsx(Delete, { node: node }), node.type === "emphasis" && _jsx(Emphasis, { node: node }), node.type === "footnoteReference" && null /* 不做处理，做一个标记*/, node.type === "html" && _jsx(Html, { node: node }), node.type === "image" && _jsx(Image, { node: node }), node.type === "imageReference" && null /* 不做处理，做一个标记*/, node.type === "inlineCode" && _jsx(InlineCode, { node: node }), node.type === "link" && _jsx(Link, { node: node }), node.type === "linkReference" && null /* 不做处理，做一个标记*/, node.type === "strong" && _jsx(Strong, { node: node }), node.type === "text" && _jsx(Text, { node: node }), node.type === "indicator" && _jsx(Indicator, { node: node })] }));
};
//# sourceMappingURL=index.js.map