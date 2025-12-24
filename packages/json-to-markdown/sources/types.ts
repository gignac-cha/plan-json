/**
 * Type definitions for mdast (Markdown Abstract Syntax Tree)
 */

export interface TextNode {
  type: 'text';
  value: string;
}

export interface StrongNode {
  type: 'strong';
  children: MarkdownNode[];
}

export interface EmphasisNode {
  type: 'emphasis';
  children: MarkdownNode[];
}

export interface InlineCodeNode {
  type: 'inlineCode';
  value: string;
}

export interface HeadingNode {
  type: 'heading';
  depth: 1 | 2 | 3 | 4 | 5 | 6;
  children: MarkdownNode[];
}

export interface ParagraphNode {
  type: 'paragraph';
  children: MarkdownNode[];
}

export interface ListNode {
  type: 'list';
  ordered: boolean;
  start?: number | null;
  spread?: boolean;
  children: MarkdownNode[];
}

export interface ListItemNode {
  type: 'listItem';
  spread?: boolean;
  checked?: boolean | null | 'in_progress';
  children: MarkdownNode[];
}

export interface CodeNode {
  type: 'code';
  lang?: string | null;
  meta?: string | null;
  value: string;
}

export interface LinkNode {
  type: 'link';
  url: string;
  title?: string | null;
  children: MarkdownNode[];
}

export interface ThematicBreakNode {
  type: 'thematicBreak';
}

export type MarkdownNode =
  | TextNode
  | StrongNode
  | EmphasisNode
  | InlineCodeNode
  | HeadingNode
  | ParagraphNode
  | ListNode
  | ListItemNode
  | CodeNode
  | LinkNode
  | ThematicBreakNode;
