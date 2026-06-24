import { jsx as _jsx } from "react/jsx-runtime";
import { SvgFeishu } from "../../atomic/svg";
import { CenterAlignedBox } from "../../atomic/center-aligned-box";
import { DisableContainer } from "../../atomic/disable-container";
import styles from "./index.module.less";
export const SendBtn = ({ disabled, onClick }) => {
    return (_jsx(DisableContainer, Object.assign({ disabled: disabled }, { children: _jsx(CenterAlignedBox, Object.assign({ width: 32, height: 32, onClick: onClick }, { children: _jsx(SvgFeishu, { className: styles["send-btn"] }) })) })));
};
//# sourceMappingURL=index.js.map