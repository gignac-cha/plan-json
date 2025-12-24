/**
 * Unit tests for json-to-markdown
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { convertNode, convertNodes } from '../sources/index.ts';
import type { MarkdownNode } from '../sources/types.ts';

describe('convertNode', () => {
  it('should convert text node', () => {
    const node: MarkdownNode = { type: 'text', value: 'Hello World' };
    assert.strictEqual(convertNode(node), 'Hello World');
  });

  it('should convert heading nodes', () => {
    const h1: MarkdownNode = { type: 'heading', depth: 1, children: [{ type: 'text', value: 'Title' }] };
    const h2: MarkdownNode = { type: 'heading', depth: 2, children: [{ type: 'text', value: 'Subtitle' }] };
    assert.strictEqual(convertNode(h1), '# Title');
    assert.strictEqual(convertNode(h2), '## Subtitle');
  });

  it('should convert strong node', () => {
    const node: MarkdownNode = { type: 'strong', children: [{ type: 'text', value: 'bold' }] };
    assert.strictEqual(convertNode(node), '**bold**');
  });

  it('should convert emphasis node', () => {
    const node: MarkdownNode = { type: 'emphasis', children: [{ type: 'text', value: 'italic' }] };
    assert.strictEqual(convertNode(node), '*italic*');
  });

  it('should convert inline code node', () => {
    const node: MarkdownNode = { type: 'inlineCode', value: 'code' };
    assert.strictEqual(convertNode(node), '`code`');
  });

  it('should convert list with checked items', () => {
    const node: MarkdownNode = {
      type: 'list',
      ordered: false,
      children: [
        {
          type: 'listItem',
          checked: true,
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Done' }] }],
        },
        {
          type: 'listItem',
          checked: false,
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Todo' }] }],
        },
        {
          type: 'listItem',
          checked: 'in_progress',
          children: [{ type: 'paragraph', children: [{ type: 'text', value: 'WIP' }] }],
        },
      ],
    };
    const result = convertNode(node);
    assert.ok(result.includes('[x] Done'));
    assert.ok(result.includes('[ ] Todo'));
    assert.ok(result.includes('[/] WIP'));
  });

  it('should convert thematic break', () => {
    const node: MarkdownNode = { type: 'thematicBreak' };
    assert.strictEqual(convertNode(node), '---');
  });
});

describe('convertNodes', () => {
  it('should join multiple nodes with double newlines', () => {
    const nodes: MarkdownNode[] = [
      { type: 'heading', depth: 1, children: [{ type: 'text', value: 'Title' }] },
      { type: 'paragraph', children: [{ type: 'text', value: 'Content' }] },
    ];
    const result = convertNodes(nodes);
    assert.strictEqual(result, '# Title\n\nContent');
  });
});
