import { jsx as _jsx } from "react/jsx-runtime";
import { useChatPropsStore } from "../../../../provider";
import { ClearContext } from "../clear-context";
import { DeleteMessage } from "../delete-message";
export const useCommandSlot = (position) => {
    var _a, _b;
    const ui = useChatPropsStore((store) => store.ui);
    const clearContextConfig = Object.assign({ isNeed: true, position: "inputLeft", SlotComponent: ClearContext }, ((_a = ui === null || ui === void 0 ? void 0 : ui.chatSlot) === null || _a === void 0 ? void 0 : _a.clearContext) || {});
    const clearMessageConfig = Object.assign({ isNeed: true, position: "headerRight", SlotComponent: DeleteMessage }, ((_b = ui === null || ui === void 0 ? void 0 : ui.chatSlot) === null || _b === void 0 ? void 0 : _b.clearMessage) || {});
    return [clearContextConfig, clearMessageConfig]
        .filter((item) => {
        return item.isNeed && item.position === position;
    })
        .map(({ position, SlotComponent }) => position === "headerRight" ? (_jsx(SlotComponent, { type: "square-hover-btn" })) : (_jsx(SlotComponent, {})));
};
//# sourceMappingURL=use-command-slot.js.map