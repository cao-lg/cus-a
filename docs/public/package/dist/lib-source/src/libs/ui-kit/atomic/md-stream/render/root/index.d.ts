import { FC } from "react";
import type { Root as RootType } from "mdast";
import "./md.css";
export declare const Root: FC<{
    root?: RootType;
    theme?: "dark" | "light";
}>;
