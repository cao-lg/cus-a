import type { Parent } from 'mdast';
export declare const isParent: (value: any) => value is Parent;
export declare const getRegResult: (value: string, regExps: RegExp[]) => RegExpExecArray | null;
