import type { BlockContent, DefinitionContent, ListItem as ListItemMdType } from 'mdast';
import { FC } from 'react';
export declare const BlockTypes: string[];
export declare const Block: FC<{
    node: BlockContent | DefinitionContent | ListItemMdType;
}>;
