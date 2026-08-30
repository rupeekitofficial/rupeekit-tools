#!/usr/bin/env node
/**
 * Composite each scene's two generated halves into one 1080x1920 frame.
 *
 *   node compose.mjs scenes.json art/ frames/
 *
 * Expects art/scene-01-left.png and art/scene-01-right.png (any size; they are fitted).
 * Writes frames/scene-01.png ready for render.sh.
 *
 * Why halves: asking an image model for a finished split-screen tends to drift in line
 * weight between the two sides and to invent a divider that wanders. Generating each side
 * alone and joining them here keeps the divider exact and lets you re-roll one side
 * without losing the other.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [, , scenesPath, artDir, outDir] = process.argv;
if (!scenesPath || !artDir || !outDir) {
  console.error('usage: node compose.mjs scenes.json art/ frames/');
  process.exit(1);
}

const doc = JSON.parse(fs.readFileSync(scenesPath, 'utf8'));
const { width: W, height: H } = doc.master;
const FF = process.env.FFMPEG || 'ffmpeg';

// The illustration band sits between the labels and the caption safe area.
const ART_TOP = Math.round(H * 0.26);
const ART_H = Math.round(H * 0.54);
const HALF_W = Math.round(W / 2);

fs.mkdirSync(outDir, { recursive: true });

let made = 0;
for (const s of doc.scenes) {
  const n = String(s.id).padStart(2, '0');
  const left = path.join(artDir, `scene-${n}-left.png`);
  const right = path.join(artDir, `scene-${n}-right.png`);
  const out = path.join(outDir, `scene-${n}.png`);

  const missing = [left, right].filter((p) => !fs.existsSync(p));
  if (missing.length) {
    console.warn(`scene ${n}: skipped, missing ${missing.map((p) => path.basename(p)).join(' and ')}`);
    continue;
  }

  // White ground, both halves fitted into their column, then a 3px ink divider that
  // stops short of the caption band so it never crosses the text.
  const divTop = ART_TOP - Math.round(H * 0.03);
  const divH = ART_H + Math.round(H * 0.06);
  const filter = [
    `color=c=white:s=${W}x${H}:d=1[bg]`,
    `[1:v]scale=${HALF_W - 24}:${ART_H}:force_original_aspect_ratio=decrease[L]`,
    `[2:v]scale=${HALF_W - 24}:${ART_H}:force_original_aspect_ratio=decrease[R]`,
    `[bg][L]overlay=x=(${HALF_W}-overlay_w)/2:y=${ART_TOP}[a]`,
    `[a][R]overlay=x=${HALF_W}+(${HALF_W}-overlay_w)/2:y=${ART_TOP}[b]`,
    `[b]drawbox=x=${HALF_W - 1}:y=${divTop}:w=3:h=${divH}:color=0x0F172A:t=fill[out]`,
  ].join(';');

  execFileSync(FF, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-f', 'lavfi', '-i', `color=c=white:s=${W}x${H}`,
    '-i', left, '-i', right,
    '-filter_complex', filter, '-map', '[out]',
    '-frames:v', '1', out,
  ], { stdio: 'inherit' });
  made++;
}

console.log(`composited ${made}/${doc.scenes.length} scene frames into ${outDir}`);
