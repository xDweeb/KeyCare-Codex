import { mkdirSync, writeFileSync } from "node:fs";
import { PNG } from "pngjs";

mkdirSync(new URL("../public/icons/", import.meta.url), { recursive: true });
for (const size of [16, 32, 48, 128]) {
  const png = new PNG({ width: size, height: size });
  for (let y = 0; y < size; y += 1) for (let x = 0; x < size; x += 1) {
    const index = (y * size + x) * 4;
    const inside = (x - size / 2) ** 2 + (y - size / 2) ** 2 < (size * 0.46) ** 2;
    png.data[index] = inside ? 15 : 0;
    png.data[index + 1] = inside ? 118 : 0;
    png.data[index + 2] = inside ? 110 : 0;
    png.data[index + 3] = inside ? 255 : 0;
  }
  writeFileSync(new URL(`../public/icons/icon${size}.png`, import.meta.url), PNG.sync.write(png));
}
