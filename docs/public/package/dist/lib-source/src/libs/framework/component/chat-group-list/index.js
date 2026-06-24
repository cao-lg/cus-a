import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import cls from "classnames";
import { View } from "@tarojs/components";
import { useConversationStore } from "../../../provider";
import { SectionPrologueGroup, TopPrologueGroup } from "./prologue-group";
import { ChatGroup } from "./chat-group";
import styles from "./index.module.less";
const ChatGroups = ({ chatMessageGroups, className, }) => {
    const { hasInProcessChatMessageGroup, sectionId } = useConversationStore((store) => ({
        hasInProcessChatMessageGroup: !!store.inProcessChatMessageGroup,
        sectionId: store.sectionId,
    }));
    return (_jsx(View, Object.assign({ className: cls(styles.container, className) }, { children: chatMessageGroups.map((item, index) => (_jsxs(Fragment, { children: [_jsx(ChatGroup, { chatGroup: item, isProcessing: item.isAWaiting, isLastMessage: index === chatMessageGroups.length - 1, isShowSuggestion: 
                    // 如果是最后一个，同时没有进行中消息，同时section是一条数据，则展示suggestion;
                    index === chatMessageGroups.length - 1 &&
                        !hasInProcessChatMessageGroup &&
                        sectionId === item.sectionId }), _jsx(SectionPrologueGroup, { chatMessageGroupNow: item, chatMessageGroupNext: chatMessageGroups[index + 1] })] }, item.id))) })));
};
const InProcessingChatMessageGroup = () => {
    const { inProcessChatMessageGroup } = useConversationStore((store) => ({
        inProcessChatMessageGroup: store.inProcessChatMessageGroup,
    }));
    if (!inProcessChatMessageGroup) {
        return null;
    }
    return (_jsx(ChatGroup, { chatGroup: inProcessChatMessageGroup, isProcessing: true, isShowSuggestion: true }));
};
export const ChatGroupList = () => {
    const { chatMessageGroups } = useConversationStore((store) => ({
        chatMessageGroups: store.chatMessageGroups,
    }));
    return (_jsxs(View, Object.assign({ className: styles.container }, { children: [_jsx(TopPrologueGroup, {}), _jsx(ChatGroups, { chatMessageGroups: chatMessageGroups }), _jsx(InProcessingChatMessageGroup, {})] })));
};
//# sourceMappingURL=index.js.map