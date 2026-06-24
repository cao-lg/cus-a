/// <reference types="react" />
export declare enum UIEventType {
    FrameClick = "frame-click",
    ChatToastShow = "chat-toast-show"
}
export interface UIChatToastEvent {
    content: string | React.ReactNode;
    icon: "success" | "error" | "none";
    duration?: number;
}
