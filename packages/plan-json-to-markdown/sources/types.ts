/**
 * Type definitions for PLAN.jsonmd format
 */

import type { MarkdownNode } from 'json-to-markdown';

export type PhaseStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface State {
  currentPhaseIndex: number;
  lastedUpdatedAt: string;
}

export interface Project {
  name: string;
  description?: string;
}

export interface Overview {
  project: Project;
  markdown: MarkdownNode[];
}

export interface Phase {
  index: number;
  status: PhaseStatus;
  markdown: MarkdownNode[];
}

export interface PlanDocument {
  $schema?: string;
  state: State;
  overview: Overview;
  phases: Phase[];
}

// Re-export MarkdownNode for convenience
export type { MarkdownNode } from 'json-to-markdown';
