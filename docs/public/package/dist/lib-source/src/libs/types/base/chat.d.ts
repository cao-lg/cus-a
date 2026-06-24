import { BotInfo } from "@coze/api";
export declare enum ChatType {
    Bot = "bot",
    App = "App"
}
export interface ChatInfo extends Partial<Omit<BotInfo, "bot_id" | "model_info" | "plugin_info_list" | "bot_mode" | "prompt_info">> {
    appId: string;
    type: ChatType;
}
