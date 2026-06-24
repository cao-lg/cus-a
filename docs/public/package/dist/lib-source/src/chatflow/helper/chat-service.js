var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ChatService } from "../../libs";
import { getConnectorId } from "./get-connector-id";
export const getCustomAppInfo = (chatFlowProps) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (((_a = chatFlowProps === null || chatFlowProps === void 0 ? void 0 : chatFlowProps.project) === null || _a === void 0 ? void 0 : _a.type) === "app" &&
        ((_b = chatFlowProps === null || chatFlowProps === void 0 ? void 0 : chatFlowProps.project) === null || _b === void 0 ? void 0 : _b.mode) === "websdk") {
        return {};
    }
    else {
        return {
            name: ((_c = chatFlowProps === null || chatFlowProps === void 0 ? void 0 : chatFlowProps.project) === null || _c === void 0 ? void 0 : _c.name) || "",
            icon_url: ((_d = chatFlowProps === null || chatFlowProps === void 0 ? void 0 : chatFlowProps.project) === null || _d === void 0 ? void 0 : _d.iconUrl) || "",
            onboarding_info: {
                prologue: ((_f = (_e = chatFlowProps === null || chatFlowProps === void 0 ? void 0 : chatFlowProps.project) === null || _e === void 0 ? void 0 : _e.onBoarding) === null || _f === void 0 ? void 0 : _f.prologue) || "",
                suggested_questions: ((_h = (_g = chatFlowProps === null || chatFlowProps === void 0 ? void 0 : chatFlowProps.project) === null || _g === void 0 ? void 0 : _g.onBoarding) === null || _h === void 0 ? void 0 : _h.suggestions) || [],
            },
            description: "",
            create_time: 0,
            update_time: 0,
            version: "",
        };
    }
};
export class ChatFlowService extends ChatService {
    constructor(props, chatFlowProps) {
        super(props);
        this.chatFlowProps = chatFlowProps;
    }
    createNewConversation() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._createNewConversation(false);
        });
    }
    getAppInfo() {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            if (((_b = (_a = this.chatFlowProps) === null || _a === void 0 ? void 0 : _a.project) === null || _b === void 0 ? void 0 : _b.type) === "app" &&
                ((_d = (_c = this.chatFlowProps) === null || _c === void 0 ? void 0 : _c.project) === null || _d === void 0 ? void 0 : _d.mode) === "websdk") {
                const connectorId = getConnectorId(this.chatFlowProps);
                const res = yield ((_e = this.apiClient) === null || _e === void 0 ? void 0 : _e.get(`/v1/apps/${(_g = (_f = this.chatFlowProps) === null || _f === void 0 ? void 0 : _f.project) === null || _g === void 0 ? void 0 : _g.id}?connector_id=${connectorId}`));
                const { icon_url: iconUrl, name = "" } = (res === null || res === void 0 ? void 0 : res.data) || {};
                return {
                    appId: this.appId,
                    type: this.chatType,
                    name: name,
                    icon_url: iconUrl,
                    onboarding_info: {
                        prologue: "",
                        suggested_questions: [],
                    },
                    description: "",
                    create_time: 0,
                    update_time: 0,
                    version: "",
                };
            }
            else {
                return Object.assign({ appId: this.appId, type: this.chatType }, getCustomAppInfo(this.chatFlowProps));
            }
        });
    }
    getOrCreateConversationId() {
        return this._createNewConversation(true);
    }
    _createNewConversation(isCreateNew = false) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            if (((_b = (_a = this.chatFlowProps) === null || _a === void 0 ? void 0 : _a.project) === null || _b === void 0 ? void 0 : _b.type) === "bot") {
                const { id: conversationId, last_section_id: sectionId = "" } = yield this.apiClient.conversations.create({
                    // @ts-expect-error -- linter-disable-autofix
                    connector_id: this.connectorId,
                });
                return { conversationId, sectionId };
            }
            else {
                const { id: conversationId, last_section_id: sectionId = "" } = yield this.apiClient.conversations.create({
                    // @ts-expect-error -- linter-disable-autofix
                    app_id: this.appId,
                    conversation_name: (_d = (_c = this.chatFlowProps) === null || _c === void 0 ? void 0 : _c.project) === null || _d === void 0 ? void 0 : _d.conversationName,
                    get_or_create: isCreateNew,
                    workflow_id: (_f = (_e = this.chatFlowProps) === null || _e === void 0 ? void 0 : _e.workflow) === null || _f === void 0 ? void 0 : _f.id,
                    draft_mode: ((_h = (_g = this.chatFlowProps) === null || _g === void 0 ? void 0 : _g.project) === null || _h === void 0 ? void 0 : _h.mode) === "draft",
                    connector_id: getConnectorId(this.chatFlowProps),
                });
                return { conversationId, sectionId };
            }
        });
    }
    asyncChat(params, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        const bodyData = {};
        bodyData.additional_messages = params.additional_messages || [];
        bodyData.connector_id = params.connector_id;
        bodyData.conversation_id = params.conversation_id;
        bodyData.workflow_id = (_b = (_a = this.chatFlowProps) === null || _a === void 0 ? void 0 : _a.workflow) === null || _b === void 0 ? void 0 : _b.id;
        bodyData.parameters = (_d = (_c = this.chatFlowProps) === null || _c === void 0 ? void 0 : _c.workflow) === null || _d === void 0 ? void 0 : _d.parameters;
        bodyData.execute_mode =
            ((_f = (_e = this.chatFlowProps) === null || _e === void 0 ? void 0 : _e.project) === null || _f === void 0 ? void 0 : _f.mode) === "draft" ? "DEBUG" : undefined;
        bodyData.app_id =
            ((_h = (_g = this.chatFlowProps) === null || _g === void 0 ? void 0 : _g.project) === null || _h === void 0 ? void 0 : _h.type) === "app"
                ? (_k = (_j = this.chatFlowProps) === null || _j === void 0 ? void 0 : _j.project) === null || _k === void 0 ? void 0 : _k.id
                : undefined;
        bodyData.bot_id =
            ((_m = (_l = this.chatFlowProps) === null || _l === void 0 ? void 0 : _l.project) === null || _m === void 0 ? void 0 : _m.type) === "bot"
                ? (_p = (_o = this.chatFlowProps) === null || _o === void 0 ? void 0 : _o.project) === null || _p === void 0 ? void 0 : _p.id
                : undefined;
        bodyData.connector_id = getConnectorId(this.chatFlowProps);
        bodyData.ext = {
            _caller: (_r = (_q = this.chatFlowProps) === null || _q === void 0 ? void 0 : _q.project) === null || _r === void 0 ? void 0 : _r.caller,
        };
        // @ts-expect-error -- linter-disable-autofix
        return this.apiClient.workflows.chat.stream(bodyData, options);
    }
}
//# sourceMappingURL=chat-service.js.map