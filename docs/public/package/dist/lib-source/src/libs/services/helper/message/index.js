import { RawMessageType } from "../../../types";
import { AsyncSendMessage } from "./send-message/async-send-message";
import { getEnv, ENV_TYPE } from "@tarojs/taro";
import { logger } from "../../../utils";
export { RawMessageType };
const envType = getEnv();
const isCanStream = envType === ENV_TYPE.TT ||
    envType === ENV_TYPE.WEB ||
    envType === ENV_TYPE.WEAPP;
export const getSendMessageHandler = (props, isStream = isCanStream) => {
    if (!isStream) {
        logger.error("not support sync send message");
        throw new Error("not support sync send message");
    }
    return new AsyncSendMessage(props);
    /*
     * 暂不支持异步，后续有需要再补充钙内容
     */
    /*
    if (!isStream) {
      return new SyncSendMessage(props);
    } else {
      return new AsyncSendMessage(props);
    }*/
};
//# sourceMappingURL=index.js.map