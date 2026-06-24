import { FC, PropsWithChildren } from "react";
export declare const IconButton: FC<PropsWithChildren<{
    type?: "circle-btn" | "square-hover-btn";
    className?: string;
    size?: "large" | "medium" | "small";
    onClick?: () => void;
}>>;
