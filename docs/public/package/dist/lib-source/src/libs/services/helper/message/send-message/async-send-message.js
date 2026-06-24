var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { ChatEventType, } from "@coze/api";
import { logger, MiniChatError, safeJSONParse } from "../../../../utils";
import { MultiSendMessage } from "./multi-send-message";
export class AsyncSendMessage extends MultiSendMessage {
    constructor(props) {
        super(props);
    }
    sendMessage(message, historyMessages) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger.debug("asyncChat start sendMessage: ", message);
                this._checkTimeout();
                const chatStream = yield this.chatService.asyncChat({
                    bot_id: this.botId,
                    user_id: this.userId,
                    additional_messages: [...(historyMessages || []), message],
                    conversation_id: this.conversationId,
                    connector_id: this.connectorId,
                });
                logger.debug("asyncChat sendMessage stream: ", chatStream);
                this.chatStream = chatStream;
                this.pollAnswer();
            }
            catch (err) {
                logger.error("asyncChat sendMessage error", err);
                this.sendErrorEvent(new MiniChatError(-1, "chat failed"));
                this.close();
            }
        });
    }
    pollAnswer() {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.chatStream) {
                logger.error("asyncChat pollAnswer", "chatStream is undefined");
                // 这里基本不会出现，下边方便通过语法结构
                this.sendErrorEvent(new MiniChatError(-1, "对话失败"));
                return;
            }
            logger.debug("asyncChat pollAnswer awaiting start");
            const messageList = [];
            let messageInProcessing = null;
            this._checkTimeout();
            try {
                try {
                    for (var _d = true, _e = __asyncValues(this.chatStream), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                        _c = _f.value;
                        _d = false;
                        try {
                            let eventData = _c;
                            this._checkTimeout();
                            logger.debug("asyncChat pollAnswer message: ", eventData);
                            if (!this.isAbort) {
                                const { event, data } = eventData;
                                /*
                                 * 未做处理消息
                                 * CONVERSATION_CHAT_REQUIRES_ACTION
                                 * CONVERSATION_CHAT_IN_PROGRESS
                                 * CONVERSATION_AUDIO_DELTA
                                 * CONVERSATION_CHAT_COMPLETED
                                 */
                                switch (event) {
                                    case ChatEventType.CONVERSATION_CHAT_CREATED:
                                        {
                                            const messageNew = safeJSONParse(eventData.data);
                                            // @ts-expect-error -- linter-disable-autofix
                                            const { id: chatId, section_id: sectionId } = messageNew || {};
                                            this.messageSended.chat_id = chatId || "";
                                            this.messageSended.section_id = sectionId;
                                            this.messageSended.extData = {
                                                // @ts-expect-error -- linter-disable-autofix
                                                executeId: data === null || data === void 0 ? void 0 : data.execute_id,
                                            };
                                            this.messageList = [this.messageSended, ...(messageList || [])];
                                            this.sendProcessEvent();
                                        }
                                        break;
                                    case ChatEventType.CONVERSATION_MESSAGE_DELTA:
                                        {
                                            const messageNew = safeJSONParse(data);
                                            if (!messageNew) {
                                                break;
                                            }
                                            if (!messageInProcessing) {
                                                messageInProcessing = messageNew;
                                            }
                                            else {
                                                messageInProcessing.content += messageNew.content;
                                            }
                                            messageInProcessing.isComplete = false;
                                            this.messageList = [
                                                this.messageSended,
                                                ...(messageList || []),
                                                messageInProcessing,
                                            ];
                                            this.sendProcessEvent();
                                        }
                                        break;
                                    case ChatEventType.CONVERSATION_MESSAGE_COMPLETED:
                                        {
                                            // 消息结束
                                            const messageNew = safeJSONParse(data);
                                            if (messageInProcessing) {
                                                messageInProcessing.isComplete = true;
                                                messageList.push(messageInProcessing);
                                                messageInProcessing = null;
                                            }
                                            else {
                                                if (!messageNew) {
                                                    break;
                                                }
                                                messageNew.isComplete = true;
                                                messageList.push(messageNew);
                                            }
                                            this.messageList = [this.messageSended, ...(messageList || [])];
                                            this.sendProcessEvent();
                                        }
                                        break;
                                    case ChatEventType.ERROR:
                                    case ChatEventType.CONVERSATION_CHAT_FAILED: {
                                        this.sendErrorEvent(new MiniChatError(-1, "chat failed"));
                                        return;
                                    }
                                    case ChatEventType.DONE: {
                                        this.messageList = [this.messageSended, ...(messageList || [])];
                                        this.sendCompleteEvent();
                                        return;
                                    }
                                    default:
                                        break;
                                }
                            }
                            else {
                                return;
                            }
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            catch (error) {
                logger.error("asyncChat pollAnswer error", error);
                this.sendErrorEvent(new MiniChatError(-1, "chat failed"));
                return;
            }
        });
    }
}
//# sourceMappingURL=async-send-message.js.map