var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import cls from "classnames";
import { Image } from "@tarojs/components";
import { FileTypeEnum } from "../../../types";
import SvgWarnRaw from "../../assets/svg/warn.svg";
import SvgPlusRaw from "../../assets/svg/plus.svg";
import SvgLoadingRaw from "../../assets/svg/loading.svg";
import SvgImageRaw from "../../assets/svg/image.svg";
import SvgFileZipRaw from "../../assets/svg/file-type/zip.svg";
import SvgFileXlsxRaw from "../../assets/svg/file-type/xlsx.svg";
import SvgFileVideoRaw from "../../assets/svg/file-type/video.svg";
import SvgFileTxtRaw from "../../assets/svg/file-type/txt.svg";
import SvgFilePptxRaw from "../../assets/svg/file-type/pptx.svg";
import SvgFilePdfRaw from "../../assets/svg/file-type/pdf.svg";
import SvgFileOtherRaw from "../../assets/svg/file-type/other.svg";
import SvgFileDocxRaw from "../../assets/svg/file-type/docx.svg";
import SvgFileCsxRaw from "../../assets/svg/file-type/csv.svg";
import SvgFileCodeRaw from "../../assets/svg/file-type/code.svg";
import SvgFileAudioRaw from "../../assets/svg/file-type/audio.svg";
import SvgFeishuRow from "../../assets/svg/feishu.svg";
import SvgCameraRaw from "../../assets/svg/camera.svg";
import SvgBroomRaw from "../../assets/svg/broom.svg";
import SvgErrorRaw from "../../assets/svg/error.svg";
import SvgCloseRaw from "../../assets/svg/close.svg";
import SvgErrorFillRaw from "../../assets/svg/error-fill.svg";
import SvgSuccessFillRaw from "../../assets/svg/success-fill.svg";
import SvgArrowDownRaw from "../../assets/svg/arrow-down.svg";
import SvgConversationRaw from "../../assets/svg/conversation.svg";
import styles from "./index.module.less";
export const Svg = (_a) => {
    var { src, className } = _a, rest = __rest(_a, ["src", "className"]);
    return (_jsx(Image, Object.assign({}, rest, { src: src, svg: true, className: cls(styles.svg, className) })));
};
export const SvgLoading = (props) => _jsx(Svg, Object.assign({}, props, { src: SvgLoadingRaw }));
export const SvgBroom = (props) => _jsx(Svg, Object.assign({}, props, { src: SvgBroomRaw }));
export const SvgConversation = (props) => (_jsx(Svg, Object.assign({}, props, { src: SvgConversationRaw })));
export const SvgFeishu = (props) => _jsx(Svg, Object.assign({}, props, { src: SvgFeishuRow }));
export const SvgPlusCircle = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(Svg, Object.assign({}, props, { src: SvgPlusRaw, className: cls(styles.circle, className) })));
};
export const SvgImage = (props) => _jsx(Svg, Object.assign({}, props, { src: SvgImageRaw }));
export const SvgCamera = (props) => _jsx(Svg, Object.assign({}, props, { src: SvgCameraRaw }));
export const SvgWarn = (props) => _jsx(Svg, Object.assign({}, props, { src: SvgWarnRaw }));
export const SvgError = (props) => _jsx(Svg, Object.assign({}, props, { src: SvgErrorRaw }));
export const SvgClose = (props) => _jsx(Svg, Object.assign({}, props, { src: SvgCloseRaw }));
export const SvgErrorFill = (props) => _jsx(Svg, Object.assign({}, props, { src: SvgErrorFillRaw }));
export const SvgSuccessFill = (props) => (_jsx(Svg, Object.assign({}, props, { src: SvgSuccessFillRaw })));
export const SvgArrowDown = (props) => _jsx(Svg, Object.assign({}, props, { src: SvgArrowDownRaw }));
const FILE_SVG_MAP = {
    [FileTypeEnum.AUDIO]: SvgFileAudioRaw,
    [FileTypeEnum.VIDEO]: SvgFileVideoRaw,
    [FileTypeEnum.ZIP]: SvgFileZipRaw,
    [FileTypeEnum.PDF]: SvgFilePdfRaw,
    [FileTypeEnum.DOCX]: SvgFileDocxRaw,
    [FileTypeEnum.EXCEL]: SvgFileXlsxRaw,
    [FileTypeEnum.CSV]: SvgFileCsxRaw,
    [FileTypeEnum.PPT]: SvgFilePptxRaw,
    [FileTypeEnum.TXT]: SvgFileTxtRaw,
    [FileTypeEnum.CODE]: SvgFileCodeRaw,
    [FileTypeEnum.DEFAULT_UNKNOWN]: SvgFileOtherRaw,
};
export const SvgFileType = (_a) => {
    var { type } = _a, rest = __rest(_a, ["type"]);
    return _jsx(Svg, Object.assign({}, rest, { src: FILE_SVG_MAP[type] }));
};
//# sourceMappingURL=index.js.map