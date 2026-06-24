import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import Showdown from "showdown";
import { RichText } from "@tarojs/components";
import { markdownRevert } from "./markdown-revert";
import styles from "./index.module.less";
import { logger } from "../../../utils";
export const Markdown = ({ markdown, }) => {
    const converter = useMemo(() => new Showdown.Converter({
        ghCodeBlocks: true,
        smartIndentationFix: true,
        extensions: [
            {
                type: "output",
                regex: /<a href="([^"]*)">([^<]*)<\/a>/g,
                replace: (match, href, text) => {
                    logger.info("replace:", { match, href, text });
                    return `<a href="${href}" class="custom-link">${text}</a>`;
                },
            },
            {
                type: "output",
                filter: (html) => markdownRevert(html),
            },
        ],
        tables: true,
    }), []);
    const html = useMemo(() => {
        try {
            return converter.makeHtml(markdown);
        }
        catch (_err) {
            return markdown;
        }
    }, [converter, markdown]);
    return (_jsx(RichText, { nodes: `${html}`, className: styles["markdown-container"] }));
};
//# sourceMappingURL=index.js.map