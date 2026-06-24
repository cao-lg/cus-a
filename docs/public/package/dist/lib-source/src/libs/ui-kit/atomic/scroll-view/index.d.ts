import { type ScrollViewProps } from "@tarojs/components";
type ScrollViewType = Omit<ScrollViewProps, "ref"> & {
    isScrollTopTop?: boolean;
    isLoadMore?: boolean;
};
export declare const ScrollView: ({ className, isShowHelper, children, ...restProps }: Omit<ScrollViewProps, "ref"> & {
    isScrollTopTop?: boolean | undefined;
    isLoadMore?: boolean | undefined;
} & {
    isShowHelper?: boolean | undefined;
}) => import("react/jsx-runtime").JSX.Element;
export {};
