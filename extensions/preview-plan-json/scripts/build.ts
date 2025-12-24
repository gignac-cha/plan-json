/**
 * Build script for VSCode extension
 */

import * as esbuild from 'esbuild';
import * as fs from 'fs';

const isWatch = process.argv.includes('--watch');

const esbuildOptions: esbuild.BuildOptions = {
  entryPoints: ['sources/extension.ts'],
  bundle: true,
  outfile: 'outputs/extension.js',
  external: ['vscode'],
  format: 'cjs',
  platform: 'node',
  target: 'node18',
  sourcemap: true,
  minify: !isWatch,
};

function buildWebview(): void {
  console.log('Copying webview resources...');
  fs.mkdirSync('outputs/webview', { recursive: true });
  fs.copyFileSync('resources/preview.html', 'outputs/webview/preview.html');
  fs.copyFileSync('resources/error.html', 'outputs/webview/error.html');
  console.log('Webview resources copied!');
}

async function buildExtension(): Promise<void> {
  console.log('Building extension with esbuild...');
  if (isWatch) {
    const context = await esbuild.context(esbuildOptions);
    await context.watch();
    console.log('Watching for changes...');
  } else {
    await esbuild.build(esbuildOptions);
    console.log('Extension build complete!');
  }
}

async function build(): Promise<void> {
  buildWebview();
  await buildExtension();
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
