import React from "react";
import type { AuthConf, UserInfo, ChatInfo, SettingInfo, HeaderConfig, FooterConfig, ChatSlotConfig, IOnImageClickEvent, ErrorUiConfig, LoadingUiConfig } from "./base";
export interface ChatFrameworkProps {
    chat: ChatInfo;
    auth: AuthConf;
    user: UserInfo;
    ui?: {
        isMiniCustomHeader?: boolean;
        isReadonly?: boolean;
        header?: HeaderConfig;
        footer?: FooterConfig;
        chatSlot?: ChatSlotConfig;
        error?: ErrorUiConfig;
        loading?: LoadingUiConfig;
    };
    setting: SettingInfo;
    children?: React.ReactNode;
    eventCallbacks?: {
        onImageClick?: IOnImageClickEvent;
    };
}
