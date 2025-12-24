/**
 * Preview PLAN.json - VSCode Extension
 * Real-time markdown preview for PLAN.jsonmd files
 */

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { convertToMarkdown } from 'plan-json-to-markdown';
import { markdownToHTML } from 'markdown-to-html';
import type { PlanDocument } from 'plan-json-to-markdown';

let currentPanel: vscode.WebviewPanel | undefined = undefined;
let extensionContext: vscode.ExtensionContext | undefined = undefined;

export function activate(context: vscode.ExtensionContext): void {
  console.log('Preview PLAN.json extension is now active!');
  extensionContext = context;

  const openPreviewCommand = vscode.commands.registerCommand('previewPlanJSON.openPreview', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      openPreview(context, editor.document);
    }
  });

  const watcher = vscode.workspace.createFileSystemWatcher('**/*.jsonmd');

  watcher.onDidChange((uri) => {
    if (currentPanel) {
      updatePreview(uri);
    }
  });

  watcher.onDidCreate((uri) => {
    if (currentPanel) {
      updatePreview(uri);
    }
  });

  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor && isJSONMDFile(editor.document)) {
      if (currentPanel) {
        updatePreview(editor.document.uri);
      }
    }
  });

  vscode.workspace.onDidSaveTextDocument((document) => {
    if (isJSONMDFile(document) && currentPanel) {
      updatePreviewFromDocument(document);
    }
  });

  context.subscriptions.push(openPreviewCommand, watcher);
}

function isJSONMDFile(document: vscode.TextDocument): boolean {
  return document.fileName.endsWith('.jsonmd');
}

function getResourcePath(filename: string): string {
  if (!extensionContext) {
    throw new Error('Extension context not initialized');
  }
  return path.join(extensionContext.extensionPath, 'outputs', 'webview', filename);
}

function readTemplate(filename: string): string {
  return fs.readFileSync(getResourcePath(filename), 'utf-8');
}

function openPreview(context: vscode.ExtensionContext, document: vscode.TextDocument): void {
  if (currentPanel) {
    currentPanel.reveal(vscode.ViewColumn.Beside);
  } else {
    currentPanel = vscode.window.createWebviewPanel('planJSONPreview', 'PLAN.json Preview', vscode.ViewColumn.Beside, {
      enableScripts: true,
      retainContextWhenHidden: true,
    });

    currentPanel.onDidDispose(() => {
      currentPanel = undefined;
    });
  }

  updatePreviewFromDocument(document);
}

async function updatePreview(uri: vscode.Uri): Promise<void> {
  try {
    const document = await vscode.workspace.openTextDocument(uri);
    updatePreviewFromDocument(document);
  } catch (error) {
    console.error('Failed to update preview:', error);
  }
}

function updatePreviewFromDocument(document: vscode.TextDocument): void {
  if (!currentPanel) return;

  // Update panel title with file name
  const fileName = path.basename(document.fileName);
  currentPanel.title = `Preview: ${fileName}`;

  try {
    const content = document.getText();
    const planDocument: PlanDocument = JSON.parse(content);
    const markdown = convertToMarkdown(planDocument);
    currentPanel.webview.html = getWebviewContent(markdown, planDocument);
  } catch (error) {
    currentPanel.webview.html = getErrorContent(error as Error);
  }
}

function getWebviewContent(markdown: string, document: PlanDocument): string {
  const template = readTemplate('preview.html');
  const htmlMarkdown = markdownToHTML(markdown);
  const statusBadge = getStatusBadge(document);

  return template
    .replace('{{STATUS_BADGE}}', statusBadge)
    .replace('{{CONTENT}}', htmlMarkdown);
}

function getStatusBadge(document: PlanDocument): string {
  const currentPhase = document.phases[document.state.currentPhaseIndex];
  const projectName = document.overview.project.name;
  const lastUpdated = new Date(document.state.lastedUpdatedAt).toLocaleString();

  const statusClass =
    currentPhase?.status === 'COMPLETED'
      ? 'completed'
      : currentPhase?.status === 'IN_PROGRESS'
        ? 'in-progress'
        : 'not-started';

  return `<span><strong>Project:</strong> ${escapeHTML(projectName)}</span>
    <span class="badge badge-${statusClass}">Phase ${document.state.currentPhaseIndex + 1}: ${currentPhase?.status ?? 'N/A'}</span>
    <span><strong>Updated:</strong> ${lastUpdated}</span>`;
}

function getErrorContent(error: Error): string {
  const template = readTemplate('error.html');
  return template.replace('{{ERROR_MESSAGE}}', escapeHTML(error.message));
}

function escapeHTML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function deactivate(): void {
  if (currentPanel) {
    currentPanel.dispose();
  }
}
