import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Text } from "@tarojs/components";
import { getFileTypeByFileName } from "../../../utils";
import { SvgFileType } from "../../atomic/svg";
import { Bubble } from "../../atomic/bubble";
import styles from "./index.module.less";
export const FileMessage = ({ filename }) => {
    const fileType = useMemo(() => getFileTypeByFileName(filename), [filename]);
    return (_jsxs(Bubble, Object.assign({ isActive: true, className: styles.container }, { children: [_jsx(SvgFileType, { type: fileType, className: styles.svg }), _jsx(Text, Object.assign({ className: styles.txt, maxLines: 1, numberOfLines: 1, overflow: "ellipsis" }, { children: filename }))] })));
};
//# sourceMappingURL=index.js.map