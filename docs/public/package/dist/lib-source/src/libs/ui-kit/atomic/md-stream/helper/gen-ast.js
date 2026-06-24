import { gfmStrikethrough } from "micromark-extension-gfm-strikethrough";
import { gfmStrikethroughFromMarkdown } from "mdast-util-gfm-strikethrough";
import { fromMarkdown } from "mdast-util-from-markdown";
import { cloneDeep } from "lodash-es";
import { autoFix } from "./autofix";
import { addIndicator } from "./add-indicator";
export const genAst = ({ oldMarkdown, newMarkdown, lastAstRoot, isShowIndicator, }) => {
    var _a, _b, _c, _d;
    let rawAstRoot;
    const offset = ((_d = (_c = (_a = lastAstRoot === null || lastAstRoot === void 0 ? void 0 : lastAstRoot.children) === null || _a === void 0 ? void 0 : _a[((_b = lastAstRoot === null || lastAstRoot === void 0 ? void 0 : lastAstRoot.children) === null || _b === void 0 ? void 0 : _b.length) - 2]) === null || _c === void 0 ? void 0 : _c.position) === null || _d === void 0 ? void 0 : _d.start.offset) || 0;
    if (oldMarkdown === "" ||
        !(lastAstRoot === null || lastAstRoot === void 0 ? void 0 : lastAstRoot.position) ||
        (lastAstRoot === null || lastAstRoot === void 0 ? void 0 : lastAstRoot.children.length) < 2 ||
        offset < 20 ||
        !newMarkdown.startsWith(oldMarkdown)) {
        // markdown 有变化，重新构建
        // markdown 未构建过Ast，重新构建
        // markdown 上次构建的有问题
        rawAstRoot = fromMarkdown(newMarkdown, {
            extensions: [gfmStrikethrough()],
            mdastExtensions: [gfmStrikethroughFromMarkdown()],
        });
    }
    else {
        const leftMarkdown = newMarkdown.slice(offset);
        const leftAstChildren = fromMarkdown(leftMarkdown, {
            extensions: [gfmStrikethrough()],
            mdastExtensions: [gfmStrikethroughFromMarkdown()],
        }).children;
        leftAstChildren.map((item) => {
            var _a;
            if ((_a = item.position) === null || _a === void 0 ? void 0 : _a.start) {
                item.position.start.offset = item.position.start.offset || 0;
                item.position.start.offset += offset;
                item.position.end.offset = item.position.end.offset || 0;
                item.position.end.offset += offset;
            }
        });
        lastAstRoot.children.splice(-2, 2, ...leftAstChildren);
        rawAstRoot = lastAstRoot;
    }
    // 不需要重新定义了
    const fixedAstRoot = cloneDeep(rawAstRoot);
    autoFix(fixedAstRoot);
    const showAstRoot = cloneDeep(fixedAstRoot);
    if (isShowIndicator) {
        addIndicator(showAstRoot);
    }
    return [rawAstRoot, fixedAstRoot, showAstRoot];
};
//# sourceMappingURL=gen-ast.js.map