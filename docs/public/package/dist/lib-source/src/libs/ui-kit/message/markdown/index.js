import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { MdStream } from "../../atomic/md-stream";
import { Bubble } from "../../atomic/bubble";
import cls from "classnames";
import styles from "./index.module.less";
import { logger } from "../../../utils";
export const MarkdownMessage = ({ content, isAWaiting = false, className, onImageClick }) => {
    const [isSmooth, setIsSmooth] = useState(isAWaiting);
    const onMarkdownEnd = useCallback(() => {
        setIsSmooth(false);
    }, []);
    logger.debug("MarkdownMessage", content);
    return (_jsx(Bubble, Object.assign({ isNeedBorder: false, className: cls(styles.markdown, className) }, { children: _jsx(MdStream, { markdown: content, isSmooth: isSmooth, isFinish: !isAWaiting, onMarkdownEnd: onMarkdownEnd, theme: "light", onImageClick: onImageClick }) })));
};
//# sourceMappingURL=index.js.map