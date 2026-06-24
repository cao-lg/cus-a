import { jsx as _jsx } from "react/jsx-runtime";
import { Image as TaroImage } from "@tarojs/components";
import styles from "./index.module.less";
import { previewImage } from "@tarojs/taro";
import { useMdStreamContext } from "../../../context";
export const Image = ({ node }) => {
    const { onImageClick } = useMdStreamContext();
    return (_jsx(TaroImage, { src: node.url, mode: "aspectFill", className: styles.image, onClick: () => {
            if (node.url) {
                if (onImageClick) {
                    onImageClick === null || onImageClick === void 0 ? void 0 : onImageClick({ url: node.url });
                }
                else {
                    previewImage({
                        urls: [node.url],
                        current: node.url,
                        enableShowPhotoDownload: true,
                    });
                }
            }
        } }));
};
//# sourceMappingURL=index.js.map