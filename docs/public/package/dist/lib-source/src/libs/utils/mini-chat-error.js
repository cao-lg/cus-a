export class MiniChatError extends Error {
    constructor(code, msg) {
        super(msg);
        this.code = code;
        this.msg = msg;
    }
}
//# sourceMappingURL=mini-chat-error.js.map