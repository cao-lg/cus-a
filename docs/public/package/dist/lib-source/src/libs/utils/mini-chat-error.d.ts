import type { IMiniChatError } from "../types";
export declare class MiniChatError extends Error implements IMiniChatError {
    readonly code: number;
    readonly msg: string;
    constructor(code: number, msg: string);
}
