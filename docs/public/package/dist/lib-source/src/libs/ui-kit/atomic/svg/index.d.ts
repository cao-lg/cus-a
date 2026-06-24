import { FC } from "react";
import { type ImageProps } from "@tarojs/components";
import { FileTypeEnum } from "../../../types";
interface SvgProps {
    className?: string;
}
type SvtProps = SvgProps & Omit<ImageProps, "ref">;
export declare const Svg: FC<SvtProps>;
export declare const SvgLoading: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const SvgBroom: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const SvgConversation: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const SvgFeishu: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const SvgPlusCircle: ({ className, ...props }: {
    [x: string]: any;
    className: any;
}) => import("react/jsx-runtime").JSX.Element;
export declare const SvgImage: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const SvgCamera: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const SvgWarn: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const SvgError: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const SvgClose: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const SvgErrorFill: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const SvgSuccessFill: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const SvgArrowDown: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare const SvgFileType: FC<Omit<SvtProps, "src"> & {
    type: FileTypeEnum;
}>;
export {};
