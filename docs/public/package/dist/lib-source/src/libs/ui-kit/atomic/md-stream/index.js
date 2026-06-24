import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useMemo, useRef } from "react";
import { Root } from "./render/root";
import { useSmoothShowMarkdown } from "./hooks/use-smooth-show-markdown";
import { useSmoothAstChange } from "./hooks/use-smooth-ast-change";
import { useRenderChange } from "./hooks/use-render-change";
import { genAst } from "./helper/gen-ast";
import { ChatFamePropsProvider } from "./context";
import { logger } from "../../../utils";
const MarkdownRender = ({ markdown, onAstChange, isShowIndicator = false, theme }) => {
    const refRaw = useRef("");
    const refAst = useRef();
    const renderAst = useMemo(() => {
        const [rawAstRoot, fixedAstRoot, showAstRoot] = genAst({
            oldMarkdown: refRaw.current,
            newMarkdown: markdown,
            lastAstRoot: refAst.current,
            isShowIndicator,
        });
        refAst.current = rawAstRoot;
        refRaw.current = markdown;
        onAstChange === null || onAstChange === void 0 ? void 0 : onAstChange(fixedAstRoot);
        return showAstRoot;
    }, [markdown, isShowIndicator, onAstChange]);
    return _jsx(Root, { root: renderAst, theme: theme });
};
const MdStreamOp = ({ theme = "light", markdown, isSmooth, isFinish, interval = 50, onMarkdownEnd, onRenderMarkdownChange, onImageClick, }) => {
    const { showMarkdown, isShowIndicator, showMoreByte } = useSmoothShowMarkdown({
        isSmooth,
        interval,
        markdown,
        isFinish,
    });
    useRenderChange({
        showMarkdown,
        markdown,
        isFinish,
        onMarkdownEnd,
        onRenderMarkdownChange,
    });
    const { onAstChange } = useSmoothAstChange({
        isSmooth,
        markdown,
        showMoreByte,
        showMarkdownIndex: showMarkdown.length,
    });
    logger.debug("MarkdownRender", markdown);
    return (_jsx(ChatFamePropsProvider, Object.assign({ onImageClick: onImageClick }, { children: _jsx(MarkdownRender, { theme: theme, markdown: showMarkdown, isShowIndicator: isShowIndicator, onAstChange: onAstChange }) })));
};
export const MdStream = memo(MdStreamOp, (prev, next) => {
    if (Object.keys(prev).length !== Object.keys(next).length) {
        return false;
    }
    else {
        return !Object.keys(prev).find((key) => {
            if (prev[key] !== next[key]) {
                return true;
            }
            return false;
        });
    }
});
//# sourceMappingURL=index.js.map