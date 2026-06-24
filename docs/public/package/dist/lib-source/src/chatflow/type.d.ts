import type { SettingInfo, FooterConfig, HeaderConfig, UserInfo, InputConfig, ClearContextConfig, ClearMessageConfig, UploadBtnConfig } from "../libs/types";
import React from "react";
export type OnImageClick = (extra: {
    url: string;
}) => void;
export interface IWorkflow {
    id?: string;
    parameters?: Record<string, unknown>;
}
export interface IProject {
    id: string;
    type: "app" | "bot";
    mode: "draft" | "release" | "websdk";
    caller?: "UI_BUILDER" | "CANVAS";
    connectorId?: string;
    conversationName?: string;
    name?: string;
    iconUrl?: string;
    onBoarding?: {
        prologue: string;
        suggestions: string[];
    };
}
export interface IEventCallbacks {
    onImageClick?: (extra: {
        url: string;
    }) => void;
    onGetChatFlowExecuteId?: (id: string) => void;
}
export interface IChatFlowProps {
    workflow: IWorkflow;
    project: IProject;
    eventCallbacks?: IEventCallbacks;
    userInfo: UserInfo;
    areaUi: {
        isDisabled?: boolean;
        input?: InputConfig;
        clearContext?: ClearContextConfig;
        clearMessage?: ClearMessageConfig;
        uploadBtn?: UploadBtnConfig;
        header?: HeaderConfig;
        footer?: FooterConfig;
        uiTheme?: "uiBuilder" | "chatFlow";
        renderLoading?: () => React.ReactNode;
    };
    auth?: {
        type: "external" | "internal";
        token?: string;
        refreshToken?: () => Promise<string> | string;
    };
    setting: SettingInfo;
    style?: React.CSSProperties;
}
