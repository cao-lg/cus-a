import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { getEnv, ENV_TYPE, previewImage } from "@tarojs/taro";
import { Image, View } from "@tarojs/components";
import styles from "./index.module.less";
const isWeb = getEnv() === ENV_TYPE.WEB;
export const ImageMessage = ({ url, onImageClick }) => {
    const [imageWidth, setImageWidth] = useState();
    return (_jsx(View, { children: _jsx(Image, { src: url, mode: "widthFix", className: styles.image, style: {
                width: imageWidth,
            }, onClick: () => {
                if (onImageClick) {
                    onImageClick === null || onImageClick === void 0 ? void 0 : onImageClick({ url });
                }
                else {
                    previewImage({
                        urls: [url],
                        current: url,
                        enableShowPhotoDownload: true,
                    });
                }
            }, onLoad: (res) => {
                if (!isWeb) {
                    setImageWidth(res.detail.width || 200);
                }
            } }) }));
};
//# sourceMappingURL=index.js.map