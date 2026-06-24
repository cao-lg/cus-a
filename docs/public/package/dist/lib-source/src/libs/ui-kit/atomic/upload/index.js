var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { FileTypeEnum } from "../../../types";
import { getFileTypeByFile, logger } from "../../../utils";
import styles from "./index.module.less";
import { getEnv, ENV_TYPE, chooseMedia } from "@tarojs/taro";
import { View } from "@tarojs/components";
const isWeb = getEnv() === ENV_TYPE.WEB;
export const Upload = ({ children, accept, onChooseFile }) => {
    const ref = useRef(null);
    const onWebInputFileChange = (e) => {
        const { files } = e.target;
        if (onChooseFile) {
            if (files && files.length > 0) {
                const fileInfos = [];
                for (let file of files) {
                    const fileType = getFileTypeByFile(file);
                    fileInfos.push({
                        from: "H5_Input_Chooser",
                        type: fileType,
                        size: file.size,
                        file,
                        tempFilePath: URL.createObjectURL(file),
                    });
                }
                onChooseFile === null || onChooseFile === void 0 ? void 0 : onChooseFile(fileInfos);
            }
            else {
                // 没有选中文件
            }
        }
        e.target.value = "";
    };
    return (_jsxs(View, Object.assign({ className: styles.container }, { children: [isWeb && (_jsx("input", { type: "file", multiple: false, accept: accept, autoComplete: "off", tabIndex: -1, className: styles.input, onChange: onWebInputFileChange, ref: ref })), _jsx(View, Object.assign({ onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                    var _a, _b;
                    if (isWeb) {
                        if (ref.current) {
                            (_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.click) === null || _b === void 0 ? void 0 : _b.call(_a);
                        }
                    }
                    else {
                        try {
                            const res = yield chooseMedia({
                                count: 1,
                                mediaType: ["image"],
                                sizeType: ["original", "compressed"],
                                sourceType: ["album", "camera"],
                            });
                            const fileInfos = res.tempFiles.map((item) => ({
                                from: "Taro_Image_Chooser",
                                type: item.fileType === "image"
                                    ? FileTypeEnum.IMAGE
                                    : FileTypeEnum.VIDEO,
                                size: item.size,
                                tempFilePath: item.tempFilePath,
                                file: {
                                    filePath: item.tempFilePath,
                                },
                            }));
                            onChooseFile === null || onChooseFile === void 0 ? void 0 : onChooseFile(fileInfos);
                        }
                        catch (error) {
                            logger.error("chooseMedia error:", error);
                        }
                    }
                }) }, { children: children }))] })));
};
//# sourceMappingURL=index.js.map