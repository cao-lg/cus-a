import React from "react";
import { IMiniChatError } from "../utils/error";
export interface HeaderConfig {
    isNeed?: boolean;
    icon?: string;
    title?: string;
    renderRightSlot?: () => React.ReactNode;
}
export interface FooterConfig {
    isNeed?: boolean;
    expressionText?: string;
    linkvars?: Record<string, {
        text: string;
        link: string;
    }>;
}
export type UiCommandPosition = "headerRight" | "inputLeft";
export interface InputConfig {
    isNeed?: boolean;
    placeholder?: string;
    defaultText?: string;
    renderChatInputTopSlot?: (isChatError?: boolean) => React.ReactNode;
}
export interface ClearContextConfig {
    isNeed?: boolean;
    position?: UiCommandPosition;
}
export interface ClearMessageConfig {
    isNeed?: boolean;
    position?: UiCommandPosition;
}
export interface UploadBtnConfig {
    isNeed?: boolean;
}
export interface ChatSlotConfig {
    input?: InputConfig;
    clearContext?: ClearContextConfig;
    clearMessage?: ClearMessageConfig;
    uploadBtn?: UploadBtnConfig;
}
export interface ErrorUiConfig {
    renderError?: (error?: IMiniChatError, retryChatInit?: () => void) => React.ReactNode;
}
export interface LoadingUiConfig {
    renderLoading?: () => React.ReactNode;
}
