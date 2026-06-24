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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import cls from "classnames";
import { ScrollView as TaroScrollView, View, } from "@tarojs/components";
import styles from "./index.module.less";
import { useWheelHandle } from "./use-wheel-handle";
import { IconButton } from "../icon-button";
import { SvgArrowDown } from "../svg";
import { useHelperButton } from "./use-helper-button";
import { logger } from "../../../utils";
const ScrollViewSlot = memo((_a) => {
    var { id, children, isScrollTopTop, isLoadMore, checkArrowDownVisible } = _a, restProps = __rest(_a, ["id", "children", "isScrollTopTop", "isLoadMore", "checkArrowDownVisible"]);
    const [scrollTop, setScrollTop] = useState(0);
    const refScrollNow = useRef(1);
    const { onInitScrollRefForWheel } = useWheelHandle();
    useEffect(() => {
        if (isScrollTopTop) {
            logger.debug("ScrollView, isScrollTopTop", scrollTop);
            if (scrollTop !== 0) {
                setScrollTop(0);
            }
        }
        else if (scrollTop === 0) {
            if (refScrollNow.current === 0) {
                setScrollTop(1);
            }
        }
    }, [isScrollTopTop]);
    useLayoutEffect(() => {
        if (isLoadMore) {
            setScrollTop(refScrollNow.current + 10);
        }
    }, [isLoadMore]);
    logger.debug("ScrollView, scrollTop", scrollTop);
    return (_jsx(TaroScrollView, Object.assign({}, restProps, { id: id, scrollTop: scrollTop, ref: onInitScrollRefForWheel, reverse: false, showScrollbar: false, enhanced: true, className: styles.scroll, onScroll: (e) => {
            refScrollNow.current = e.detail.scrollTop;
            checkArrowDownVisible === null || checkArrowDownVisible === void 0 ? void 0 : checkArrowDownVisible(e.detail.scrollTop);
        } }, { children: _jsx(View, Object.assign({ className: cls(styles.children) }, { children: children })) })));
});
export const ScrollView = (_a) => {
    var { className, isShowHelper, children } = _a, restProps = __rest(_a, ["className", "isShowHelper", "children"]);
    const { arrowDownVisible, checkArrowDownVisible } = useHelperButton(isShowHelper);
    logger.debug("ScrollView, arrowDownVisible", arrowDownVisible);
    return (_jsxs(View, Object.assign({ className: cls(styles.container, className) }, { children: [_jsx(ScrollViewSlot, Object.assign({}, restProps, { checkArrowDownVisible: checkArrowDownVisible }, { children: children })), arrowDownVisible ? (_jsx(IconButton, Object.assign({ type: "circle-btn", size: "large", className: styles["arrow-down"] }, { children: _jsx(SvgArrowDown, {}) }))) : null] })));
};
//# sourceMappingURL=index.js.map