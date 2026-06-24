interface OpDisabledState {
    clearMessage: boolean;
    input: boolean;
    clearContext: boolean;
}
interface ChatStatusAction {
    setIsReadonly: (isReadonly: boolean) => void;
    setIsDeleting: (isDeleting: boolean) => void;
    setIsSendingMsg: (isSendingMsg: boolean) => void;
    setIsClearingContext: (isClearingContext: boolean) => void;
    disableState: OpDisabledState;
    getOpDisabledState: () => OpDisabledState;
    setOpDisabledState: () => void;
}
interface ChatStatusState {
    isReadonly: boolean;
    isDeleting: boolean;
    isSendingMsg: boolean;
    isClearingContext: boolean;
}
export type ChatStatusStore = ChatStatusAction & ChatStatusState;
export {};
