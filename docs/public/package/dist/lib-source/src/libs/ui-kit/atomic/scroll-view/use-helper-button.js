import { logger } from "../../../utils";
import { useCallback, useState } from "react";
export const useHelperButton = (isShowHelper) => {
    const [arrowDownVisible, setArrowDownVisible] = useState(false);
    const checkArrowDownVisible = useCallback((scrollTop) => {
        if (!isShowHelper) {
            return;
        }
        logger.debug("checkArrowDownVisible", scrollTop);
        if (scrollTop > 500) {
            setArrowDownVisible(true);
        }
    }, [isShowHelper]);
    return {
        arrowDownVisible,
        checkArrowDownVisible,
    };
};
//# sourceMappingURL=use-helper-button.js.map