import { create } from "zustand";
import { useChatPropsContext } from "../context";
import { useMemo } from "react";
import { useUpdateEffect } from "../../hooks";
const createChatStatusStore = ({ isReadonly }) => create()((set, get) => {
    const wrapStateFunc = (func) => (...args) => {
        const result = func(...args);
        get().setOpDisabledState();
        return result;
    };
    return {
        isReadonly: isReadonly || false,
        isDeleting: false,
        isSendingMsg: false,
        isClearingContext: false,
        disableState: {
            clearMessage: isReadonly || false,
            clearContext: isReadonly || false,
            input: isReadonly || false,
        },
        setIsReadonly: wrapStateFunc((isReadonly) => {
            set({
                isReadonly,
            });
        }),
        setIsDeleting: wrapStateFunc((isDeleting) => {
            set({
                isDeleting,
            });
        }),
        setIsSendingMsg: wrapStateFunc((isSendingMsg) => {
            set({
                isSendingMsg,
            });
        }),
        setIsClearingContext: wrapStateFunc((isClearingContext) => {
            set({
                isClearingContext,
            });
        }),
        setOpDisabledState: () => {
            set({
                disableState: get().getOpDisabledState(),
            });
        },
        getOpDisabledState: () => {
            const { isDeleting, isSendingMsg, isClearingContext, isReadonly } = get();
            const isInteracting = isDeleting || isSendingMsg || isClearingContext;
            return {
                clearMessage: isReadonly || isInteracting,
                input: isReadonly || isInteracting,
                clearContext: isReadonly || isInteracting,
            };
        },
    };
});
export const useCreateStatusStore = () => {
    var _a;
    const chatProps = useChatPropsContext();
    const chatStatusStore = useMemo(() => { var _a; return createChatStatusStore({ isReadonly: (_a = chatProps.ui) === null || _a === void 0 ? void 0 : _a.isReadonly }); }, []);
    useUpdateEffect(() => {
        var _a;
        chatStatusStore.getState().setIsReadonly(!!((_a = chatProps.ui) === null || _a === void 0 ? void 0 : _a.isReadonly));
    }, [(_a = chatProps.ui) === null || _a === void 0 ? void 0 : _a.isReadonly]);
    return chatStatusStore;
};
//# sourceMappingURL=chat-status.js.map