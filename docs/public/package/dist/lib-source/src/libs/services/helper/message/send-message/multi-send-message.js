var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RoleType } from "@coze/api";
import { RawMessageType, FileTypeEnum, } from "../../../../types";
import { MiniChatError } from "../../../../utils";
import { RawSendMessage } from "./raw-send-message";
export { RawMessageType };
export class MultiSendMessage extends RawSendMessage {
    sendTextMessage(content, historyMessages) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = {
                role: RoleType.User,
                content,
                content_type: "text",
            };
            this.sendStartMessage(message);
            yield this.sendMessage(message, historyMessages);
        });
    }
    sendFileMessage(files, historyMessages) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = files
                .map((item) => this.packFileObject(item))
                .filter((item) => !!item);
            const message = {
                role: RoleType.User,
                content: content,
                content_type: "object_string",
            };
            this.sendStartMessage(message);
            const fileList = yield this.uploadFile(files);
            if (!fileList) {
                //失败了。
                this.sendErrorEvent(new MiniChatError(-1, "上传文件失败"));
                return;
            }
            this.messageSended.content = JSON.stringify(fileList);
            message.content = JSON.stringify(fileList.map((item) => ({
                type: item.type,
                file_id: item.file_id,
            })));
            this.sendMessage(message, historyMessages);
        });
    }
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileList = [];
            let hasError = false;
            try {
                yield Promise.all(file.map((item) => __awaiter(this, void 0, void 0, function* () {
                    const packResult = this.packFileObject(item);
                    if (packResult) {
                        const res = yield this.chatService.upload({
                            file: item.file,
                        });
                        packResult.file_id = res.id;
                        fileList.push(packResult);
                    }
                })));
            }
            catch (error) {
                hasError = true;
            }
            return hasError ? null : fileList;
        });
    }
    getObjectStringType(fileType) {
        return fileType === FileTypeEnum.IMAGE ? "image" : "file";
    }
    packFileObject(fileInfo) {
        const type = this.getObjectStringType(fileInfo.type);
        switch (type) {
            case "image": {
                return {
                    type: "image",
                    file_url: fileInfo.tempFilePath,
                    file_info: fileInfo,
                };
            }
            case "file": {
                return {
                    type: "file",
                    // @ts-expect-error -- linter-disable-autofix
                    name: fileInfo.file.name,
                    // @ts-expect-error -- linter-disable-autofix
                    size: fileInfo.file.size,
                    file_url: fileInfo.tempFilePath,
                    file_info: fileInfo,
                };
            }
            default: {
                return null;
            }
        }
    }
    sendRawMessage(rawMessage, historyMessages) {
        return __awaiter(this, void 0, void 0, function* () {
            this.messageSended.rawMessage = rawMessage;
            switch (rawMessage.type) {
                case RawMessageType.TEXT: {
                    return yield this.sendTextMessage(rawMessage.data, historyMessages);
                }
                case RawMessageType.FILE: {
                    return yield this.sendFileMessage(rawMessage.data, historyMessages);
                }
                default: {
                    throw new MiniChatError(-1, "unknown message type");
                }
            }
        });
    }
}
//# sourceMappingURL=multi-send-message.js.map