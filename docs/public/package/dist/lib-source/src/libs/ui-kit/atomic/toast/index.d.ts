import { FC, PropsWithChildren } from "react";
export declare const Toast: FC<PropsWithChildren<{
    className?: string;
    icon?: "success" | "error" | "none";
    onClose?: () => void;
}>>;
