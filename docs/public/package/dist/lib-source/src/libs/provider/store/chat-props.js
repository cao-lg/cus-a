import { create } from "zustand";
import { logger } from "../../utils";
import { useChatPropsContext } from "../context";
import { useMemo } from "react";
import { useUpdateEffect } from "../../hooks";
const createChatPropsStore = (props) => {
    return create()((set) => (Object.assign(Object.assign({}, props), { setChatProps: (props) => {
            set(Object.assign({}, props));
        } })));
};
export const useCreateChatPropsStore = () => {
    const chatProps = useChatPropsContext();
    const chatPropsStore = useMemo(() => createChatPropsStore(chatProps), []);
    useUpdateEffect(() => {
        chatPropsStore.getState().setChatProps(chatProps);
        logger.debug("useCreateChatPropsStore props Change", chatProps);
    }, [chatProps]);
    return chatPropsStore;
};
//# sourceMappingURL=chat-props.js.map