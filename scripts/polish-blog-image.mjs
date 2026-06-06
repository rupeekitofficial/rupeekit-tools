#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUTPUT_BASE_DIR = path.join(ROOT, 'public', 'blog', 'images');
const LOGO_PATH = path.join(ROOT, 'public', 'brand', 'rupeekit_logo_horizontal_transparent.png');

const SIZE_LIMITS = {
  hero: 1_200_000,
  og: 1_600_000,
  thumbnail: 450_000,
  inline: 1_000_000,
};

const VARIANTS = [
  {
    key: 'hero',
    fileName: 'hero.webp',
    width: 1600,
    height: 900,
    format: 'webp',
    quality: 86,
    limitBytes: SIZE_LIMITS.hero,
    logoWidth: 240,
    baseTitleSize: 72,
    maxChars: 30,
    maxLines: 3,
  },
  {
    key: 'og',
    fileName: 'og.png',
    width: 1200,
    height: 630,
    format: 'png',
    quality: null,
    limitBytes: SIZE_LIMITS.og,
    logoWidth: 200,
    baseTitleSize: 56,
    maxChars: 26,
    maxLines: 3,
  },
  {
    key: 'thumbnail',
    fileName: 'thumbnail.webp',
    width: 800,
    height: 450,
    format: 'webp',
    quality: 84,
    limitBytes: SIZE_LIMITS.thumbnail,
    logoWidth: 170,
    baseTitleSize: 38,
    maxChars: 22,
    maxLines: 3,
  },
  {
    key: 'inline',
    fileName: 'inline.webp',
    width: 1200,
    height: 675,
    format: 'webp',
    quality: 85,
    limitBytes: SIZE_LIMITS.inline,
    logoWidth: 200,
    baseTitleSize: 52,
    maxChars: 26,
    maxLines: 3,
  },
];

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) {
      parsed[key] = true;
      continue;
    }
    parsed[key] = value;
    index += 1;
  }
  return parsed;
}

function toPosixRelative(absolutePath) {
  return path.relative(ROOT, absolutePath).split(path.sep).join('/');
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxCharsPerLine, maxLines) {
  const words = String(text).trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const lines = [];
  let currentLine = '';

  const flush = (value) => {
    if (value) lines.push(value);
  };

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      currentLine = candidate;
      continue;
    }

    if (currentLine) {
      flush(currentLine);
      currentLine = word;
    } else {
      flush(word.slice(0, maxCharsPerLine));
      currentLine = word.slice(maxCharsPerLine);
    }

    if (lines.length === maxLines) {
      break;
    }
  }

  if (currentLine && lines.length < maxLines) {
    flush(currentLine);
  }

  if (lines.length > maxLines) {
    return lines.slice(0, maxLines);
  }

  if (lines.length === maxLines && currentLine) {
    const lastLine = lines[maxLines - 1];
    lines[maxLines - 1] = `${lastLine.slice(0, Math.max(0, maxCharsPerLine - 3))}...`;
  }

  return lines;
}

function chooseLayout(title, baseTitleSize, maxChars, maxLines, width, height) {
  const marginX = Math.round(width * 0.05);
  const marginY = Math.round(height * 0.06);
  const availableTextWidth = width - (marginX * 2) - Math.round(width * 0.22);
  const minimumFontSize = Math.max(24, Math.floor(baseTitleSize * 0.7));

  let fontSize = baseTitleSize;
  let lines = [];

  while (fontSize >= minimumFontSize) {
    const estimatedChars = Math.max(
      16,
      Math.min(maxChars, Math.floor(availableTextWidth / (fontSize * 0.56)))
    );
    lines = wrapText(title, estimatedChars, maxLines);
    if (lines.length <= maxLines && lines.every((line) => line.length <= estimatedChars)) {
      break;
    }
    fontSize -= 4;
  }

  return { fontSize, lines, marginX, marginY };
}

function buildEffectsSvg(width, height, style) {
  const gradientStrength = style === 'bold' ? 0.9 : style === 'clean' ? 0.7 : 0.82;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bgShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#08101c" stop-opacity="0" />
          <stop offset="48%" stop-color="#08101c" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#08101c" stop-opacity="${gradientStrength}" />
        </linearGradient>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0 0.03 0.06" />
          </feComponentTransfer>
        </filter>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#bgShade)" />
      <rect x="0" y="0" width="${width}" height="${height}" filter="url(#grain)" opacity="0.18" />
    </svg>
  `;
}

function buildContentSvg({
  width,
  height,
  title,
  category,
  alt,
  style,
  titleSize,
  lines,
  logoWidth,
  logoHeight,
  marginX,
  marginY,
}) {
  const categoryLabel = category.toUpperCase();
  const logoPaddingX = Math.round(logoWidth * 0.12);
  const logoPaddingY = Math.round(logoHeight * 0.18);
  const logoBoxWidth = logoWidth + (logoPaddingX * 2);
  const logoBoxHeight = logoHeight + (logoPaddingY * 2);
  const logoBoxX = width - marginX - logoBoxWidth;
  const logoBoxY = marginY;
  const labelWidth = Math.max(240, Math.round(category.length * 13) + 44);
  const labelHeight = 42;
  const footerFontSize = Math.max(16, Math.round(titleSize * 0.3));
  const lineHeight = 1.1;
  const titleBlockHeight = Math.round((lines.length * titleSize * lineHeight) + footerFontSize + 18);
  const titleY = height - marginY - titleBlockHeight;
  const footerY = titleY + Math.round(lines.length * titleSize * lineHeight) + 16;
  const logoStrokeOpacity = style === 'bold' ? 0.14 : 0.08;
  const titleLines = lines.length > 0 ? lines : [title];

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <filter id="textShadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.42" />
        </filter>
      </defs>
      <rect x="${marginX}" y="${marginY}" width="${labelWidth}" height="${labelHeight}" rx="20" fill="#0a1220" fill-opacity="0.55" stroke="#ffffff" stroke-opacity="0.16" />
      <text x="${marginX + 18}" y="${marginY + 27}" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="#ffffff" fill-opacity="0.92" letter-spacing="0.08em">${escapeXml(categoryLabel)}</text>

      <rect x="${logoBoxX}" y="${logoBoxY}" width="${logoBoxWidth}" height="${logoBoxHeight}" rx="24" fill="#ffffff" fill-opacity="0.84" stroke="#ffffff" stroke-opacity="${logoStrokeOpacity}" />

      <g filter="url(#textShadow)">
        <text x="${marginX}" y="${titleY}" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}" font-weight="800" fill="#ffffff">
          ${titleLines.map((line, index) => {
            const dy = index === 0 ? 0 : Math.round(titleSize * lineHeight);
            return `<tspan x="${marginX}" dy="${dy}">${escapeXml(line)}</tspan>`;
          }).join('')}
        </text>
        <text x="${marginX}" y="${footerY}" font-family="Arial, Helvetica, sans-serif" font-size="${footerFontSize}" font-weight="600" fill="#ffffff" fill-opacity="0.84" letter-spacing="0.02em">${escapeXml('rupeekit.co.in')}</text>
      </g>
      <desc>${escapeXml(alt)}</desc>
    </svg>
  `;
}

async function assertReadableImage(filePath) {
  await fs.access(filePath);
  const metadata = await sharp(filePath).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Input image metadata is missing dimensions: ${filePath}`);
  }
  return metadata;
}

async function writeVariant({
  inputPath,
  outputDir,
  logoBuffer,
  title,
  category,
  alt,
  style,
  spec,
}) {
  const logoMetadata = await sharp(logoBuffer).metadata();
  const logoRatio = logoMetadata.width && logoMetadata.height
    ? logoMetadata.height / logoMetadata.width
    : 0.26;
  const logoHeight = Math.max(42, Math.round(spec.logoWidth * logoRatio));
  const layout = chooseLayout(title, spec.baseTitleSize, spec.maxChars, spec.maxLines, spec.width, spec.height);
  const effectsSvg = Buffer.from(buildEffectsSvg(spec.width, spec.height, style));
  const contentSvg = Buffer.from(buildContentSvg({
    width: spec.width,
    height: spec.height,
    title,
    category,
    alt,
    style,
    titleSize: layout.fontSize,
    lines: layout.lines,
    logoWidth: spec.logoWidth,
    logoHeight,
    marginX: layout.marginX,
    marginY: layout.marginY,
  }));
  const resizedLogo = await sharp(logoBuffer)
    .resize({ width: spec.logoWidth, height: logoHeight, fit: 'inside', withoutEnlargement: true })
    .png()
    .toBuffer();

  const outputPath = path.join(outputDir, spec.fileName);
  const pipeline = sharp(inputPath)
    .rotate()
    .resize(spec.width, spec.height, {
      fit: 'cover',
      position: sharp.strategy.attention,
      withoutEnlargement: false,
    })
    .modulate({
      brightness: 1.03,
      saturation: 1.06,
      lightness: 1.01,
    })
    .linear(1.02, -2)
    .composite([
      { input: effectsSvg },
      { input: contentSvg },
      {
        input: resizedLogo,
        left: spec.width - layout.marginX - spec.logoWidth - Math.round(spec.logoWidth * 0.12),
        top: layout.marginY + Math.round(logoHeight * 0.18),
      },
    ])
    .sharpen({ sigma: 0.75 });

  if (spec.format === 'webp') {
    pipeline.webp({
      quality: spec.quality,
      effort: 6,
      smartSubsample: true,
    });
  } else {
    pipeline.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      force: true,
    });
  }

  await pipeline.toFile(outputPath);

  const outputMeta = await sharp(outputPath).metadata();
  if (outputMeta.width !== spec.width || outputMeta.height !== spec.height) {
    throw new Error(`Output dimensions mismatch for ${spec.fileName}: expected ${spec.width}x${spec.height}, got ${outputMeta.width || 'unknown'}x${outputMeta.height || 'unknown'}`);
  }

  const stats = await fs.stat(outputPath);
  if (stats.size > spec.limitBytes) {
    throw new Error(`Output file too large for ${spec.fileName}: ${stats.size} bytes (limit ${spec.limitBytes})`);
  }

  return {
    key: spec.key,
    path: toPosixRelative(outputPath),
    width: spec.width,
    height: spec.height,
    bytes: stats.size,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const inputArg = args.input;
  const slug = String(args.slug || '').trim().toLowerCase();
  const title = String(args.title || '').trim();
  const category = String(args.category || '').trim();
  const alt = String(args.alt || '').trim();
  const style = String(args.style || 'editorial').trim().toLowerCase();

  if (!inputArg) throw new Error('Missing required --input argument.');
  if (!slug) throw new Error('Missing required --slug argument.');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('Slug must use lowercase letters, numbers, and hyphens only.');
  }
  if (!title) throw new Error('Missing required --title argument.');
  if (!category) throw new Error('Missing required --category argument.');
  if (!alt) throw new Error('Missing required --alt argument.');

  const validStyles = new Set(['editorial', 'clean', 'bold']);
  if (!validStyles.has(style)) {
    throw new Error(`Unsupported --style "${style}". Use editorial, clean, or bold.`);
  }

  const inputPath = path.resolve(ROOT, inputArg);
  const outputDir = path.join(OUTPUT_BASE_DIR, slug);

  if (!(await fs.access(LOGO_PATH).then(() => true).catch(() => false))) {
    throw new Error(`Missing official logo asset: ${LOGO_PATH}`);
  }

  const inputMetadata = await assertReadableImage(inputPath);
  await fs.mkdir(outputDir, { recursive: true });
  const logoBuffer = await fs.readFile(LOGO_PATH);

  const outputs = [];
  for (const spec of VARIANTS) {
    outputs.push(await writeVariant({
      inputPath,
      outputDir,
      logoBuffer,
      title,
      category,
      alt,
      style,
      spec,
    }));
  }

  const manifest = {
    slug,
    title,
    category,
    alt,
    style,
    inputPath: toPosixRelative(inputPath),
    outputDir: toPosixRelative(outputDir),
    generatedAt: new Date().toISOString(),
    sourceDimensions: {
      width: inputMetadata.width,
      height: inputMetadata.height,
    },
    outputs: Object.fromEntries(outputs.map((entry) => [
      entry.key,
      {
        path: entry.path,
        width: entry.width,
        height: entry.height,
        bytes: entry.bytes,
      },
    ])),
  };

  const manifestPath = path.join(outputDir, 'manifest.json');
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const manifestSize = (await fs.stat(manifestPath)).size;
  if (manifestSize > 120_000) {
    throw new Error(`Manifest is unexpectedly large: ${manifestSize} bytes`);
  }

  console.log(`Polished blog images written to ${toPosixRelative(outputDir)}`);
  console.log(`Manifest: ${toPosixRelative(manifestPath)}`);
}

main().catch((error) => {
  console.error(`polish-blog-image: ${error.message}`);
  process.exitCode = 1;
});
