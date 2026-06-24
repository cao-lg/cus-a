import { useCallback, useRef } from "react";
import { getEnv } from "@tarojs/taro";
const isWeb = getEnv() === "WEB";
// Scroll的处理，导致Web上滚轮的方向是反的，因此需要处理
export const useWheelHandle = () => {
    const refScroll = useRef(null);
    const onWheelHandle = useCallback((event) => {
        var _a;
        event.preventDefault();
        const deltaY = event.deltaY;
        (_a = refScroll.current) === null || _a === void 0 ? void 0 : _a.scrollBy(0, -deltaY);
    }, []);
    const onInitScrollRefForWheel = useCallback((el) => {
        if (isWeb) {
            if (refScroll.current) {
                refScroll.current.removeEventListener("wheel", onWheelHandle);
            }
            if (el) {
                refScroll.current = el;
                refScroll.current.addEventListener("wheel", onWheelHandle);
            }
        }
    }, []);
    return { onInitScrollRefForWheel };
};
//# sourceMappingURL=use-wheel-handle.js.map