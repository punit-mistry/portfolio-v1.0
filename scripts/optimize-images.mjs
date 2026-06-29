import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join, extname } from 'path';

const srcDir = 'public';
const files = readdirSync(srcDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

for (const file of files) {
  const input = join(srcDir, file);
  const name = file.replace(extname(file), '');
  const output = join(srcDir, `${name}.webp`);

  await sharp(input)
    .webp({ quality: 80 })
    .toFile(output);

  console.log(`✓ ${file} → ${name}.webp`);
}

console.log('Done!');
