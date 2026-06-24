import type { Root as RootMdType } from 'mdast';
interface SmoothShowMarkdownProps {
    markdown: string;
    isSmooth?: boolean;
    showMarkdownIndex: number;
    showMoreByte: (byte: number) => void;
}
export declare const useSmoothAstChange: ({ isSmooth, markdown, showMoreByte, showMarkdownIndex, }: SmoothShowMarkdownProps) => {
    onAstChange: (ast: RootMdType) => void;
};
export {};
