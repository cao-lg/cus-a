import { jsx as _jsx } from "react/jsx-runtime";
import { Toast } from "../../../ui-kit";
import styles from "./index.module.less";
import { useEffect, useState } from "react";
import { UIEventType } from "../../../types";
import { eventCenter } from "@tarojs/taro";
export const ChatToast = () => {
    const [event, setEvent] = useState();
    useEffect(() => {
        eventCenter.on(UIEventType.ChatToastShow, (e) => {
            setEvent(e);
        });
    }, []);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setEvent(undefined);
        }, Math.max(Math.min(10000, (event === null || event === void 0 ? void 0 : event.duration) || 3000), 1000));
        return () => {
            clearTimeout(timeout);
        };
    }, [event]);
    if (!event || !event.content) {
        return null;
    }
    return (_jsx(Toast, Object.assign({ className: styles.container, icon: event.icon }, { children: event.content })));
};
//# sourceMappingURL=index.js.map