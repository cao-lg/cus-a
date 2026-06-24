import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import cls from "classnames";
import Taro, { useDidHide } from "@tarojs/taro";
import { Input, View } from "@tarojs/components";
import { Spacing } from "../atomic/spacing";
import { DisableContainer } from "../atomic/disable-container";
import { SendBtn } from "./send-btn";
import { UploadBtn } from "./upload-btn";
import styles from "./index.module.less";
import { useUpdateEffect } from "../../hooks";
const isSupportKeyBoardHeight = Taro.getEnv() === Taro.ENV_TYPE.WEAPP;
export const ChatInput = ({ isNeedUpload, defaultValue, onKeyBoardHeightChange, disabled = false, inputAdjustDefault = true, onSendTextMessage, onSendFileMessage, placeholder = "Send Message", }) => {
    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState(defaultValue);
    useUpdateEffect(() => {
        setInputValue(defaultValue);
    }, [defaultValue]);
    useDidHide(() => {
        // 隐藏到后台的时候，默认键盘会收起，设置为0
        onKeyBoardHeightChange === null || onKeyBoardHeightChange === void 0 ? void 0 : onKeyBoardHeightChange(0);
    });
    useEffect(() => {
        var _a;
        if (isSupportKeyBoardHeight) {
            (_a = Taro === null || Taro === void 0 ? void 0 : Taro.onKeyboardHeightChange) === null || _a === void 0 ? void 0 : _a.call(Taro, (res) => {
                if (res.height === 0) {
                    onKeyBoardHeightChange === null || onKeyBoardHeightChange === void 0 ? void 0 : onKeyBoardHeightChange(0);
                    return;
                }
                onKeyBoardHeightChange === null || onKeyBoardHeightChange === void 0 ? void 0 : onKeyBoardHeightChange(res.height);
            });
        }
    }, [onKeyBoardHeightChange]);
    return (_jsx(DisableContainer, Object.assign({ className: styles.container, disabled: disabled }, { children: _jsxs(Spacing, Object.assign({ className: cls(styles["input-container"], {
                [styles.focused]: focused,
            }) }, { children: [_jsx(Input, { placeholder: placeholder, className: styles.input, placeholderClass: styles.placeholder, onConfirm: () => {
                        if (inputValue) {
                            setInputValue("");
                            onSendTextMessage === null || onSendTextMessage === void 0 ? void 0 : onSendTextMessage(inputValue);
                        }
                    }, value: inputValue, onInput: (event) => {
                        setInputValue(event.detail.value);
                    }, onFocus: (event) => {
                        if (!isSupportKeyBoardHeight) {
                            onKeyBoardHeightChange === null || onKeyBoardHeightChange === void 0 ? void 0 : onKeyBoardHeightChange(event.detail.height);
                        }
                        setFocused(true);
                    }, onBlur: () => {
                        if (!isSupportKeyBoardHeight) {
                            onKeyBoardHeightChange === null || onKeyBoardHeightChange === void 0 ? void 0 : onKeyBoardHeightChange(0);
                        }
                        setFocused(false);
                    }, adjustPosition: inputAdjustDefault }), isNeedUpload ? (_jsxs(_Fragment, { children: [_jsx(UploadBtn, { onSendFileMessage: onSendFileMessage }), _jsx(View, { className: styles.divider })] })) : null, _jsx(SendBtn, { disabled: !disabled && !inputValue, onClick: () => {
                        if (inputValue) {
                            setInputValue("");
                            onSendTextMessage === null || onSendTextMessage === void 0 ? void 0 : onSendTextMessage(inputValue);
                        }
                    } })] })) })));
};
//# sourceMappingURL=index.js.map