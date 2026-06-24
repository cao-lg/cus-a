import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { safeJSONParse } from "../../../utils";
import { useI18n } from "../../../provider";
import { ErrorBoundary } from "../../atomic/error-boundary";
import { TextMessage } from "../text";
import { MarkdownMessage } from "../markdown";
import { ImageMessage } from "../image";
import { FileMessage } from "../file";
const getObjectValue = (objectString) => safeJSONParse(objectString, []);
export const MessageContent = ({ message, isAWaiting, onImageClick }) => {
    var _a;
    const i18n = useI18n();
    return (_jsxs(ErrorBoundary, Object.assign({ fallbackNode: !isAWaiting ? (_jsx(TextMessage, { content: i18n.t("noAnswer"), messageType: message.type })) : (_jsx(_Fragment, {})) }, { children: [message.content_type === "text" ? (message.type === "question" ? (_jsx(TextMessage, { content: message.content, messageType: message.type })) : (_jsx(MarkdownMessage, { content: message.content, isAWaiting: isAWaiting, onImageClick: onImageClick }))) : null, message.content_type === "object_string"
                ? (_a = getObjectValue(message.content)) === null || _a === void 0 ? void 0 : _a.map((item, index) => {
                    switch (item.type) {
                        case "text": {
                            return (_jsx(TextMessage, { content: item.text, messageType: message.type }, `${item.type}_${index}`));
                        }
                        case "file": {
                            return (_jsx(FileMessage
                            // @ts-expect-error -- linter-disable-autofix
                            , { 
                                // @ts-expect-error -- linter-disable-autofix
                                filename: item.name || "" }, `${item.type}_${index}`));
                        }
                        case "image": {
                            return (_jsx(ImageMessage
                            // @ts-expect-error -- linter-disable-autofix
                            , { 
                                // @ts-expect-error -- linter-disable-autofix
                                url: item.file_url, onImageClick: onImageClick }, `${item.type}_${index}`));
                        }
                        default: {
                            return (_jsx(TextMessage, { content: i18n.t("messageTypeUnSupport"), messageType: message.type }, `${item.type}_${index}`));
                        }
                    }
                })
                : null, message.content_type === "card" ? (_jsx(TextMessage, { content: i18n.t("messageTypeUnSupport"), messageType: message.type })) : null] })));
};
//# sourceMappingURL=index.js.map