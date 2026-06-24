export { TextMessage } from "./text";
export { ImageMessage } from "./image";
export { MessageContainer } from "./container";
export { MessageContent } from "./content";
export { WaitingMessage } from "./waiting";
export const isSupportAnswerMessage = (item) => {
    if (item.type !== "answer") {
        return false;
    }
    if (!["object_string", "text"].includes(item.content_type)) {
        return false;
    }
    if (!item.content) {
        return false;
    }
    return true;
};
//# sourceMappingURL=index.js.map