import { useCallback, useRef } from 'react';
import { getLastNode } from '../helper/traversal-last-node';
export const useSmoothAstChange = ({ isSmooth, markdown, showMoreByte, showMarkdownIndex, }) => {
    const refMarkdown = useRef(markdown);
    const refIndex = useRef(showMarkdownIndex);
    const refIsSmooth = useRef(isSmooth);
    const refShowMoreByte = useRef(showMoreByte);
    const onAstChange = useCallback((ast) => {
        if (!refIsSmooth.current) {
            return;
        }
        // 最后元素遇到 很多未显示内容的时候，直接跳过打印
        const lastNode = getLastNode(ast);
        if ((lastNode === null || lastNode === void 0 ? void 0 : lastNode.type) === 'image' || (lastNode === null || lastNode === void 0 ? void 0 : lastNode.type) === 'link') {
            const imgEnd = refMarkdown.current.indexOf(')', refIndex.current);
            const newLine = refMarkdown.current.indexOf('\n', refIndex.current);
            if (newLine === -1 || imgEnd < newLine) {
                if (imgEnd > -1) {
                    refShowMoreByte.current(imgEnd - refIndex.current + 1);
                }
            }
            else {
                refShowMoreByte.current(newLine - refIndex.current + 1);
            }
        }
    }, []);
    return { onAstChange };
};
//# sourceMappingURL=use-smooth-ast-change.js.map