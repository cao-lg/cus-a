import { jsx as _jsx } from "react/jsx-runtime";
import { SvgBroom, IconButton } from "../../../../ui-kit";
import { useClearMessage } from "../../../../services";
import { DisableContainer } from "../../../../ui-kit/atomic/disable-container";
import { useChatStatusStore, useConversationStore } from "../../../../provider";
export const DeleteMessage = ({ type = "circle-btn" }) => {
    const { clearMessage } = useClearMessage();
    const { clearMessage: clearMessageDisableState } = useChatStatusStore((store) => store.disableState);
    const { chatMessageGroups } = useConversationStore((store) => ({
        sectionId: store.sectionId,
        chatMessageGroups: store.chatMessageGroups,
    }));
    const isCanUse = chatMessageGroups.length > 0;
    return (_jsx(DisableContainer, Object.assign({ disabled: clearMessageDisableState || !isCanUse }, { children: _jsx(IconButton, Object.assign({ onClick: clearMessage, type: type }, { children: _jsx(SvgBroom, {}) })) })));
};
//# sourceMappingURL=index.js.map