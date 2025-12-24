/**
 * Converter functions for mdast JSON to Markdown
 */

import type {
  MarkdownNode,
  HeadingNode,
  ListNode,
  ListItemNode,
  ParagraphNode,
  TextNode,
  StrongNode,
  EmphasisNode,
  InlineCodeNode,
  CodeNode,
  LinkNode,
} from './types.ts';

/**
 * Convert a single markdown node to string
 */
export function convertNode(node: MarkdownNode): string {
  switch (node.type) {
    case 'heading':
      return convertHeading(node);
    case 'list':
      return convertList(node);
    case 'listItem':
      return convertListItem(node);
    case 'paragraph':
      return convertParagraph(node);
    case 'text':
      return convertText(node);
    case 'strong':
      return convertStrong(node);
    case 'emphasis':
      return convertEmphasis(node);
    case 'inlineCode':
      return convertInlineCode(node);
    case 'code':
      return convertCode(node);
    case 'link':
      return convertLink(node);
    case 'thematicBreak':
      return '---';
    default:
      return '';
  }
}

function convertHeading(node: HeadingNode): string {
  const prefix = '#'.repeat(node.depth);
  const content = node.children.map(convertNode).join('');
  return `${prefix} ${content}`;
}

function convertList(node: ListNode): string {
  return node.children
    .map((child, index) => {
      if (child.type === 'listItem') {
        const prefix = node.ordered ? `${(node.start ?? 1) + index}.` : '-';
        return convertListItemWithPrefix(child, prefix);
      }
      return convertNode(child);
    })
    .join('\n');
}

function convertListItemWithPrefix(node: ListItemNode, prefix: string): string {
  const checkbox = getCheckbox(node.checked);
  const content = node.children.map(convertNode).join('');
  return `${prefix} ${checkbox}${content}`;
}

function convertListItem(node: ListItemNode): string {
  return convertListItemWithPrefix(node, '-');
}

function getCheckbox(checked: boolean | null | 'in_progress' | undefined): string {
  if (checked === true) return '[x] ';
  if (checked === false) return '[ ] ';
  if (checked === 'in_progress') return '[/] ';
  return '';
}

function convertParagraph(node: ParagraphNode): string {
  return node.children.map(convertNode).join('');
}

function convertText(node: TextNode): string {
  return node.value;
}

function convertStrong(node: StrongNode): string {
  const content = node.children.map(convertNode).join('');
  return `**${content}**`;
}

function convertEmphasis(node: EmphasisNode): string {
  const content = node.children.map(convertNode).join('');
  return `*${content}*`;
}

function convertInlineCode(node: InlineCodeNode): string {
  return `\`${node.value}\``;
}

function convertCode(node: CodeNode): string {
  const lang = node.lang ?? '';
  return `\`\`\`${lang}\n${node.value}\n\`\`\``;
}

function convertLink(node: LinkNode): string {
  const content = node.children.map(convertNode).join('');
  const title = node.title ? ` "${node.title}"` : '';
  return `[${content}](${node.url}${title})`;
}

/**
 * Convert an array of markdown nodes to string
 */
export function convertNodes(nodes: MarkdownNode[]): string {
  return nodes.map(convertNode).join('\n\n');
}
