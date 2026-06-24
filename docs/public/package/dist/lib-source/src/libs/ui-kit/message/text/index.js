import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import cls from "classnames";
import { BubbleText } from "../..";
import styles from "./index.module.less";
export const TextMessage = ({ content, messageType }) => (_jsxs(_Fragment, { children: [messageType === "question" ? (_jsx(BubbleText, { text: content, className: cls(styles["question-text"], styles.text), isNeedBorder: false })) : null, messageType === "answer" ? (_jsx(BubbleText, { text: content, className: styles.text, isNeedBorder: false })) : null] }));
//# sourceMappingURL=index.js.map