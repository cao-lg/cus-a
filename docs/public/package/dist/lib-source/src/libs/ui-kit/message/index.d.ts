import { type ChatMessage } from "../../types";
export { TextMessage } from "./text";
export { ImageMessage } from "./image";
export { MessageContainer } from "./container";
export { MessageContent } from "./content";
export { WaitingMessage } from "./waiting";
export declare const isSupportAnswerMessage: (item: ChatMessage) => boolean;
