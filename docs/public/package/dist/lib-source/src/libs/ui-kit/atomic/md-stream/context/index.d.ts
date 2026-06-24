import { FC, PropsWithChildren } from "react";
import { type IOnImageClickEvent } from "../../../../types";
interface MdStreamContext {
    onImageClick?: IOnImageClickEvent;
}
export declare const ChatFamePropsProvider: FC<PropsWithChildren<MdStreamContext>>;
export declare const useMdStreamContext: () => MdStreamContext;
export {};
