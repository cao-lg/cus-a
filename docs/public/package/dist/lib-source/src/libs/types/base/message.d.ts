import { type ChatV3Message } from "@coze/api";
import { type IMiniChatError } from "../utils/error";
import { RawMessage } from "../services/send-message";
export type ChatMessage = ChatV3Message & {
    section_id?: string;
    localId?: string;
    error?: IMiniChatError;
    isComplete?: boolean;
    rawMessage?: RawMessage;
    extData?: Record<string, unknown>;
};
export interface FileRaw {
    tempFilePaths: string[];
    tempFiles: {
        path: string;
        size: number;
    }[];
    errMsg: string;
    errNo?: number;
}
