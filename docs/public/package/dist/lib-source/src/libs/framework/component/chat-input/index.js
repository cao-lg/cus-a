import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useMemo } from "react";
import { ChatInput as ChatInputUi, Spacing } from "../../../ui-kit";
import { useSendMessage } from "../../../services";
import { useChatPropsStore, useChatStatusStore, useI18n, } from "../../../provider";
import { useInputAdjust } from "./hooks/use-input-adjust";
import styles from "./index.module.less";
import { useCommandSlot } from "./hooks/use-command-slot";
import { View } from "@tarojs/components";
let chatInputNo = 1;
export const ChatInput = () => {
    var _a, _b;
    const i18n = useI18n();
    const { sendTextMessage, sendFileMessage } = useSendMessage();
    const { input: inputDisableState } = useChatStatusStore((store) => store.disableState);
    const uiConfig = useChatPropsStore((store) => store.ui);
    const inputUiConfig = (_a = uiConfig === null || uiConfig === void 0 ? void 0 : uiConfig.chatSlot) === null || _a === void 0 ? void 0 : _a.input;
    const uploadConfig = (_b = uiConfig === null || uiConfig === void 0 ? void 0 : uiConfig.chatSlot) === null || _b === void 0 ? void 0 : _b.uploadBtn;
    const renderChatInputTopSlot = inputUiConfig === null || inputUiConfig === void 0 ? void 0 : inputUiConfig.renderChatInputTopSlot;
    const inputId = useMemo(() => `chatInput${chatInputNo++}`, []);
    const { changeInputLocation, bottomOffset, inputAdjustDefault } = useInputAdjust(inputId);
    const commandSlots = useCommandSlot("inputLeft");
    if ((inputUiConfig === null || inputUiConfig === void 0 ? void 0 : inputUiConfig.isNeed) === false) {
        return null;
    }
    return (_jsxs(View, Object.assign({ className: styles.container, id: inputId, style: {
            bottom: `${bottomOffset}px`,
        } }, { children: [renderChatInputTopSlot === null || renderChatInputTopSlot === void 0 ? void 0 : renderChatInputTopSlot(), _jsxs(Spacing, Object.assign({ gap: 12, verticalCenter: true, width100: true }, { children: [commandSlots.map((item, index) => (_jsx(Fragment, { children: item }, index))), _jsx(ChatInputUi, { isNeedUpload: uploadConfig === null || uploadConfig === void 0 ? void 0 : uploadConfig.isNeed, disabled: inputDisableState, defaultValue: inputUiConfig === null || inputUiConfig === void 0 ? void 0 : inputUiConfig.defaultText, placeholder: (inputUiConfig === null || inputUiConfig === void 0 ? void 0 : inputUiConfig.placeholder) || i18n.t("chatInputPlaceholder"), onSendTextMessage: sendTextMessage, onSendFileMessage: sendFileMessage, onKeyBoardHeightChange: changeInputLocation, inputAdjustDefault: inputAdjustDefault })] }))] })));
};
//# sourceMappingURL=index.js.map