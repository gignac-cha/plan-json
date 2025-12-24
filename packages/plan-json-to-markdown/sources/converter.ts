/**
 * Converter for PLAN.jsonmd to Markdown
 */

import { convertNodes } from 'json-to-markdown';
import type { PlanDocument } from './types.ts';

/**
 * Convert a full PLAN.jsonmd document to Markdown
 */
export function convertToMarkdown(document: PlanDocument): string {
  const sections: string[] = [];

  // Convert overview section
  if (document.overview.markdown.length > 0) {
    sections.push(convertNodes(document.overview.markdown));
  }

  // Add separator between overview and phases
  if (document.phases.length > 0) {
    sections.push('---');
    sections.push('# Phases');
  }

  // Convert each phase
  for (const phase of document.phases) {
    if (phase.markdown.length > 0) {
      sections.push(convertNodes(phase.markdown));
    }
  }

  return sections.join('\n\n');
}
