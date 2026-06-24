var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useMemo, useState } from "react";
import { useUpdateEffect } from "../../libs/hooks";
import { logger } from "../../libs/utils";
import { ChatType } from "../../libs/types";
import { genErrorRender } from "../helper/gen-error-render";
import { getToken } from "../helper/get-token";
import { ChatFlowService, getCustomAppInfo } from "../helper/chat-service";
import { getConnectorId } from "../helper/get-connector-id";
export const useInitChat = (props) => {
    const { project: projectInfo, userInfo } = props;
    const [hasReady, setHasReady] = useState(false);
    const [authProp, setAuthProp] = useState();
    // The parameters will be changed immediately, so we don't code it in useEffect.
    const syncModifyChatProps = useMemo(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return ({
            chat: Object.assign({ appId: projectInfo === null || projectInfo === void 0 ? void 0 : projectInfo.id, type: (projectInfo === null || projectInfo === void 0 ? void 0 : projectInfo.type) === "app" ? ChatType.App : ChatType.Bot }, getCustomAppInfo(props)),
            user: userInfo,
            ui: {
                isMiniCustomHeader: false,
                isReadonly: (_a = props === null || props === void 0 ? void 0 : props.areaUi) === null || _a === void 0 ? void 0 : _a.isDisabled,
                header: (_b = props === null || props === void 0 ? void 0 : props.areaUi) === null || _b === void 0 ? void 0 : _b.header,
                footer: (_c = props === null || props === void 0 ? void 0 : props.areaUi) === null || _c === void 0 ? void 0 : _c.footer,
                loading: {
                    renderLoading: (_d = props === null || props === void 0 ? void 0 : props.areaUi) === null || _d === void 0 ? void 0 : _d.renderLoading,
                },
                error: {
                    renderError: genErrorRender(props),
                },
                chatSlot: {
                    input: (_e = props === null || props === void 0 ? void 0 : props.areaUi) === null || _e === void 0 ? void 0 : _e.input,
                    clearContext: (_f = props === null || props === void 0 ? void 0 : props.areaUi) === null || _f === void 0 ? void 0 : _f.clearContext,
                    clearMessage: (_g = props === null || props === void 0 ? void 0 : props.areaUi) === null || _g === void 0 ? void 0 : _g.clearMessage,
                    uploadBtn: (_h = props === null || props === void 0 ? void 0 : props.areaUi) === null || _h === void 0 ? void 0 : _h.uploadBtn,
                },
            },
            eventCallbacks: {
                onImageClick: (_j = props === null || props === void 0 ? void 0 : props.eventCallbacks) === null || _j === void 0 ? void 0 : _j.onImageClick,
            },
            setting: Object.assign(Object.assign({}, ((props === null || props === void 0 ? void 0 : props.setting) || {})), { onGetCustomChatService: (chatServiceProps) => {
                    return new ChatFlowService(chatServiceProps, props);
                } }),
        });
    }, [props]);
    useEffect(() => {
        if (hasReady) {
            return;
        }
        // just check param for console, don't do any more;
        checkParam(props);
        (() => __awaiter(void 0, void 0, void 0, function* () {
            // getToken will never throw an exception, so we don't need to catch it;
            const { token, refreshToken } = yield getToken(props);
            setAuthProp({
                // don't need to check token, because it will be checked in chat framework
                token: token,
                onRefreshToken: refreshToken,
                connectorId: getConnectorId(props),
            });
            setHasReady(true);
        }))();
    }, [hasReady]);
    useUpdateEffect(() => {
        setHasReady(false);
    }, [
        projectInfo === null || projectInfo === void 0 ? void 0 : projectInfo.id,
        projectInfo === null || projectInfo === void 0 ? void 0 : projectInfo.type,
        projectInfo === null || projectInfo === void 0 ? void 0 : projectInfo.conversationName,
        projectInfo === null || projectInfo === void 0 ? void 0 : projectInfo.mode,
    ]);
    return {
        hasReady,
        chatProps: Object.assign(syncModifyChatProps, { auth: authProp }),
    };
};
function checkParam(props) {
    var _a, _b, _c, _d;
    let error;
    if (((_a = props === null || props === void 0 ? void 0 : props.project) === null || _a === void 0 ? void 0 : _a.type) === "bot") {
        if (((_b = props === null || props === void 0 ? void 0 : props.project) === null || _b === void 0 ? void 0 : _b.mode) !== "draft") {
            logger.error("mode must be draft when project type is bot");
        }
    }
    else {
        if (((_c = props === null || props === void 0 ? void 0 : props.auth) === null || _c === void 0 ? void 0 : _c.type) !== "internal") {
            if (!((_d = props === null || props === void 0 ? void 0 : props.auth) === null || _d === void 0 ? void 0 : _d.token)) {
                logger.error("token is required when auth type is not internal");
            }
        }
    }
    return error;
}
//# sourceMappingURL=use-init-chat.js.map