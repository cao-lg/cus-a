import React from "react";
import { type BubbleProps } from "../bubble";
interface BubbleTextProps extends BubbleProps {
    text: string | React.ReactNode;
    size?: "large" | "medium" | "small";
}
export declare const BubbleText: ({ className, text, size, ...props }: BubbleTextProps) => import("react/jsx-runtime").JSX.Element;
export {};
