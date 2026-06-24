import { jsx as _jsx } from "react/jsx-runtime";
import { SvgPlusCircle } from "../../atomic/svg";
import { Upload } from "../../atomic/upload";
import { CenterAlignedBox } from "../../atomic/center-aligned-box";
import styles from "./index.module.less";
// 文档：DOC、DOCX、XLS、XLSX、PPT、PPTX、PDF、Numbers、CSV
// 图片：JPG、JPG2、PNG、GIF、WEBP、HEIC、HEIF、BMP、PCD、TIFF
export const UploadBtn = ({ onSendFileMessage }) => {
    return (_jsx(Upload, Object.assign({ accept: ".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.numbers,.csv,.jpg,.jpg2,.png,.gif,.webp,.heic,.heif,.bmp,.pcd,.tiff,image/*", onChooseFile: (item) => {
            onSendFileMessage === null || onSendFileMessage === void 0 ? void 0 : onSendFileMessage(item);
        } }, { children: _jsx(CenterAlignedBox, Object.assign({ width: 32, height: 32 }, { children: _jsx(SvgPlusCircle, { className: styles["file-btn"] }) })) })));
};
//# sourceMappingURL=index.js.map