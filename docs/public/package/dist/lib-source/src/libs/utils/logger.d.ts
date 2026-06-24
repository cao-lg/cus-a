import type { LogLevel } from "../types";
export declare class Logger {
    private prefix;
    private level;
    constructor(prefix?: string, level?: LogLevel);
    setLoglevel(level?: LogLevel): void;
    isDebug(): boolean;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
export declare const logger: Logger;
