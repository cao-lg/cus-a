import { jsx as _jsx } from "react/jsx-runtime";
import cls from 'classnames';
import { Image } from '@tarojs/components';
import styles from './index.module.less';
export const Avatar = ({ className, src, size = 'medium' }) => (_jsx(Image, { src: src, className: cls(styles.avatar, className, {
        [styles[size || '']]: true,
    }), mode: "aspectFill" }));
//# sourceMappingURL=index.js.map