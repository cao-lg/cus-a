import { jsx as _jsx } from "react/jsx-runtime";
import { useInitChat } from "./hooks/use-init-chat";
import { ChatFramework, ChatSlot, useConversationStore } from "../libs";
import { logger } from "../libs/utils";
import { useUpdateEffect } from "../libs/hooks";
const ChatFlowSlot = (props) => {
    var _a, _b, _c;
    const inProcessChatMessageGroup = useConversationStore((store) => {
        return store.inProcessChatMessageGroup;
    });
    const executeId = (_b = (_a = inProcessChatMessageGroup === null || inProcessChatMessageGroup === void 0 ? void 0 : inProcessChatMessageGroup.query) === null || _a === void 0 ? void 0 : _a.extData) === null || _b === void 0 ? void 0 : _b.executeId;
    const onGetChatFlowExecuteId = (_c = props === null || props === void 0 ? void 0 : props.eventCallbacks) === null || _c === void 0 ? void 0 : _c.onGetChatFlowExecuteId;
    logger.debug("ChatFlow inProcessChatMessageGroup", inProcessChatMessageGroup);
    useUpdateEffect(() => {
        logger.debug("ChatFlow excuteId", executeId);
        if (executeId && onGetChatFlowExecuteId) {
            onGetChatFlowExecuteId(executeId);
        }
    }, [executeId, onGetChatFlowExecuteId]);
    return _jsx(ChatSlot, {});
};
export const ChatFlowFramework = (props) => {
    var _a;
    logger.setLoglevel((_a = props === null || props === void 0 ? void 0 : props.setting) === null || _a === void 0 ? void 0 : _a.logLevel);
    const { chatProps, hasReady } = useInitChat(props);
    logger.debug("ChatFlow props", props, chatProps, hasReady);
    if (!(chatProps === null || chatProps === void 0 ? void 0 : chatProps.auth) || !hasReady) {
        return null;
    }
    return (_jsx(ChatFramework, Object.assign({}, chatProps, { auth: chatProps.auth }, { children: _jsx(ChatFlowSlot, Object.assign({}, props)) })));
};
//# sourceMappingURL=index.js.map