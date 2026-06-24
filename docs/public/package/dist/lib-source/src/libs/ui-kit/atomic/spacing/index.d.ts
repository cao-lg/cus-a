import { PropsWithChildren } from "react";
import { ViewProps } from "@tarojs/components";
interface SuggestionProps {
    className?: string;
    gap?: number;
    flex1?: boolean;
    horizontalCenter?: boolean;
    verticalCenter?: boolean;
    vertical?: boolean;
    width100?: boolean;
    height100?: boolean;
    style?: React.CSSProperties;
    onClick?: () => void;
}
export declare const Spacing: ({ className, children, gap, vertical, flex1, horizontalCenter, verticalCenter, onClick, width100, height100, style, ...rest }: PropsWithChildren<SuggestionProps & Omit<ViewProps, "ref" | "style">>) => import("react/jsx-runtime").JSX.Element;
export {};
