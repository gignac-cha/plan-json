/**
 * Unit tests for plan-json-to-markdown
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { convertToMarkdown } from '../sources/index.ts';
import type { PlanDocument } from '../sources/types.ts';

describe('convertToMarkdown', () => {
  it('should convert overview section', () => {
    const document: PlanDocument = {
      state: { currentPhaseIndex: 0, lastedUpdatedAt: '2025-12-24T00:00:00Z' },
      overview: {
        project: { name: 'Test Project' },
        markdown: [{ type: 'heading', depth: 1, children: [{ type: 'text', value: 'Project Title' }] }],
      },
      phases: [],
    };
    const result = convertToMarkdown(document);
    assert.ok(result.includes('# Project Title'));
  });

  it('should add phases separator', () => {
    const document: PlanDocument = {
      state: { currentPhaseIndex: 0, lastedUpdatedAt: '2025-12-24T00:00:00Z' },
      overview: {
        project: { name: 'Test' },
        markdown: [{ type: 'heading', depth: 1, children: [{ type: 'text', value: 'Title' }] }],
      },
      phases: [
        {
          index: 0,
          status: 'IN_PROGRESS',
          markdown: [{ type: 'heading', depth: 2, children: [{ type: 'text', value: 'Phase 1' }] }],
        },
      ],
    };
    const result = convertToMarkdown(document);
    assert.ok(result.includes('---'));
    assert.ok(result.includes('# Phases'));
    assert.ok(result.includes('## Phase 1'));
  });

  it('should convert checkboxes in phases', () => {
    const document: PlanDocument = {
      state: { currentPhaseIndex: 0, lastedUpdatedAt: '2025-12-24T00:00:00Z' },
      overview: { project: { name: 'Test' }, markdown: [] },
      phases: [
        {
          index: 0,
          status: 'IN_PROGRESS',
          markdown: [
            {
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
                  checked: 'in_progress',
                  children: [{ type: 'paragraph', children: [{ type: 'text', value: 'WIP' }] }],
                },
              ],
            },
          ],
        },
      ],
    };
    const result = convertToMarkdown(document);
    assert.ok(result.includes('[x] Done'));
    assert.ok(result.includes('[/] WIP'));
  });
});
