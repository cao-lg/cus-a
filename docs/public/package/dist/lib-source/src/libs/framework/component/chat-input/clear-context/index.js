import { jsx as _jsx } from "react/jsx-runtime";
import { SvgConversation, IconButton } from "../../../../ui-kit";
import { useMemo } from "react";
import { DisableContainer } from "../../../../ui-kit/atomic/disable-container";
import { useClearContext } from "../../../../services";
import { useChatStatusStore, useConversationStore } from "../../../../provider";
export const ClearContext = ({ type = "circle-btn", }) => {
    const { clearContext } = useClearContext();
    const { clearContext: clearContextDisableState } = useChatStatusStore((store) => store.disableState);
    const { sectionId, chatMessageGroups } = useConversationStore((store) => ({
        sectionId: store.sectionId,
        chatMessageGroups: store.chatMessageGroups,
    }));
    const isCanUser = useMemo(() => {
        var _a, _b;
        if (chatMessageGroups.length === 0) {
            return false;
        }
        if (sectionId &&
            ((_a = chatMessageGroups[chatMessageGroups.length - 1]) === null || _a === void 0 ? void 0 : _a.sectionId)) {
            if (sectionId !== ((_b = chatMessageGroups[chatMessageGroups.length - 1]) === null || _b === void 0 ? void 0 : _b.sectionId)) {
                return false;
            }
        }
        return true;
    }, [sectionId, chatMessageGroups]);
    return (_jsx(DisableContainer, Object.assign({ disabled: clearContextDisableState || !isCanUser }, { children: _jsx(IconButton, Object.assign({ onClick: clearContext, type: type }, { children: _jsx(SvgConversation, {}) })) })));
};
//# sourceMappingURL=index.js.map