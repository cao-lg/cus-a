import { eventCenter, getEnv, ENV_TYPE, showToast as showToastTaro, } from "@tarojs/taro";
import { UIEventType } from "../types";
const isWeb = getEnv() === ENV_TYPE.WEB;
export const showToast = (options) => {
    if (isWeb || typeof (options === null || options === void 0 ? void 0 : options.content) !== "string") {
        eventCenter.trigger(UIEventType.ChatToastShow, options);
    }
    else {
        showToastTaro({
            title: options.content,
            icon: options.icon,
            duration: options.duration,
        });
    }
};
//# sourceMappingURL=toast.js.map