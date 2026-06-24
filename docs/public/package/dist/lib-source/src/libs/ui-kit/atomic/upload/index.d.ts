import { FC, PropsWithChildren } from "react";
import { ChooseFileInfo } from "../../../types";
export declare const Upload: FC<PropsWithChildren<{
    onChooseFile?: (file: ChooseFileInfo[]) => void;
    accept?: string;
}>>;
