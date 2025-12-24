/**
 * Unit tests for markdown-to-html
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { markdownToHTML } from '../sources/index.ts';

describe('markdownToHTML', () => {
  it('should convert headings', () => {
    assert.ok(markdownToHTML('# Title').includes('<h1>Title</h1>'));
    assert.ok(markdownToHTML('## Subtitle').includes('<h2>Subtitle</h2>'));
    assert.ok(markdownToHTML('### H3').includes('<h3>H3</h3>'));
  });

  it('should convert horizontal rules', () => {
    assert.ok(markdownToHTML('---').includes('<hr>'));
  });

  it('should convert checkboxes', () => {
    const result = markdownToHTML('- [x] Done\n- [ ] Todo\n- [/] WIP');
    assert.ok(result.includes('<input type="checkbox" checked disabled>'));
    assert.ok(result.includes('<input type="checkbox" disabled>'));
    assert.ok(result.includes('<input type="checkbox" class="in-progress" disabled>'));
  });

  it('should convert bold text', () => {
    assert.ok(markdownToHTML('**bold**').includes('<strong>bold</strong>'));
  });

  it('should convert italic text', () => {
    assert.ok(markdownToHTML('*italic*').includes('<em>italic</em>'));
  });

  it('should convert inline code', () => {
    assert.ok(markdownToHTML('`code`').includes('<code>code</code>'));
  });

  it('should convert list items to ul/li', () => {
    const result = markdownToHTML('- Item 1\n- Item 2');
    assert.ok(result.includes('<ul>'));
    assert.ok(result.includes('<li>'));
    assert.ok(result.includes('</ul>'));
  });

  it('should escape HTML special characters', () => {
    const result = markdownToHTML('<script>alert("xss")</script>');
    assert.ok(!result.includes('<script>'));
    assert.ok(result.includes('&lt;script&gt;'));
  });
});
