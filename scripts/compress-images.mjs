import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, '../src/assets/images');
const publicDir = path.resolve(__dirname, '../public');

const jobs = [
  {
    match: (name) => /^BEAN LIGHT_.*\.JPG$/i.test(name) || name.toLowerCase() === 'hero-bg.jpg',
    maxWidth: 1920,
    jpegQuality: 80,
  },
  {
    match: (name) => name.toLowerCase() === 'madam.jpg',
    maxWidth: 1200,
    jpegQuality: 82,
  },
  {
    match: (name) => name.toLowerCase() === 'logo.png',
    maxWidth: 512,
    png: true,
  },
  {
    match: (name) => name.toLowerCase() === 'img_4342.png',
    maxWidth: 512,
    png: true,
  },
  {
    match: (name) => /^(urio|robison|sunday)\.png$/i.test(name),
    maxWidth: 600,
    jpegQuality: 85,
    outputExt: '.jpg',
  },
];

async function compressFile(filePath, job) {
  const ext = path.extname(filePath);
  const base = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  const outputPath =
    job.outputExt && job.outputExt !== ext.toLowerCase()
      ? path.join(dir, `${base}${job.outputExt}`)
      : filePath;

  const inputStats = fs.statSync(filePath);
  let pipeline = sharp(filePath).rotate();

  if (job.png) {
    pipeline = pipeline.resize({ width: job.maxWidth, withoutEnlargement: true }).png({
      compressionLevel: 9,
      palette: true,
    });
  } else {
    pipeline = pipeline
      .resize({ width: job.maxWidth, withoutEnlargement: true })
      .jpeg({ quality: job.jpegQuality, mozjpeg: true });
  }

  await pipeline.toFile(`${outputPath}.tmp`);
  fs.renameSync(`${outputPath}.tmp`, outputPath);

  if (outputPath !== filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  const outputStats = fs.statSync(outputPath);
  const saved = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

  console.log(
    `${path.basename(filePath)} -> ${path.basename(outputPath)}: ${formatMb(inputStats.size)} -> ${formatMb(outputStats.size)} (${saved}% smaller)`
  );

  return { input: inputStats.size, output: outputStats.size };
}

function formatMb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function regenerateFavicons(logoPath) {
  const sizes = [
    { name: 'favicon.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'logo192.png', size: 192 },
    { name: 'logo512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    await sharp(logoPath)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, name));
  }

  console.log('Regenerated public favicon assets from compressed logo.');
}

async function main() {
  const files = fs.readdirSync(imagesDir);
  let totalIn = 0;
  let totalOut = 0;

  for (const file of files) {
    const job = jobs.find((entry) => entry.match(file));
    if (!job) continue;

    const filePath = path.join(imagesDir, file);
    const result = await compressFile(filePath, job);
    totalIn += result.input;
    totalOut += result.output;
  }

  const logoPath = path.join(imagesDir, 'logo.png');
  if (fs.existsSync(logoPath)) {
    await regenerateFavicons(logoPath);
  }

  console.log(
    `\nTotal: ${formatMb(totalIn)} -> ${formatMb(totalOut)} (${((1 - totalOut / totalIn) * 100).toFixed(1)}% reduction)`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
