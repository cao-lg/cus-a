var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logger } from "../logger";
import { EventSourceBase, MessageEvent } from "./event-source";
import { MiniChatError } from "..";
/**
 * 基于 tt.createEventSource 实现的 EventSource
 * 存在问题： 如果失败返回了json结构，会接收不到消息，直接失败。
 */
export class TTEventSource extends EventSourceBase {
    close() {
        var _a;
        if (!super.close()) {
            return false;
        }
        (_a = this.ttClient) === null || _a === void 0 ? void 0 : _a.close();
        return true;
    }
    _sendMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            this.ttClient = tt.createEventSource({
                url: this.url,
                method: this.method,
                header: this.header,
                data: this.data,
            });
            logger.debug("TTEventSource init", {
                url: this.url,
                method: this.method,
                header: this.header,
                data: this.data,
            });
            this.ttClient.onOpen((...arg) => {
                logger.debug("TTEventSource onOpen", arg);
                this.event.trigger(MessageEvent.OPEN, {});
            });
            this.ttClient.onClose((...arg) => {
                logger.debug("TTEventSource onClose", arg);
                this.close();
            });
            this.ttClient.onError((errMsg) => {
                logger.debug("TTEventSource onError", errMsg);
                this.event.trigger(MessageEvent.ERROR, new MiniChatError(-1, errMsg));
            });
            this.ttClient.onMessage((data) => {
                logger.debug("TTEventSource onMessage", data);
                this.event.trigger(MessageEvent.MESSAGE, data);
            });
        });
    }
}
//# sourceMappingURL=tt-event-source.js.map