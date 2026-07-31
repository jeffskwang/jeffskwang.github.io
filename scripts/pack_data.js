// pack_data.js — run once locally: node pack_data.js path/to/assets/data
//
// Reads the 7 CSV layers, validates every value, and writes a single
// self-describing binary file (terrain.bin). "Self-describing" means the
// file stores each layer's actual rows/cols in a header instead of the
// browser assuming a size — that's what avoids the truncation bug (fdir is
// M x N, but render_R/G/B and aerial_R/G/B are canvas.width x canvas.height,
// a totally different size, and hardcoding one size for all seven corrupts
// the six pixel layers).
'use strict';
const fs = require('fs');
const path = require('path');

const dataDir = process.argv[2] || './assets/data';

// Order matters: the browser reads layers back out in this exact order.
const LAYERS = [
  'flow_dir_8bit.csv',
  'render_R_8bit.csv',
  'render_G_8bit.csv',
  'render_B_8bit.csv',
  'aerial_R_8bit.csv',
  'aerial_G_8bit.csv',
  'aerial_B_8bit.csv',
];

const MAGIC = 'TRN1'; // lets the loader sanity-check the file before trusting it

function parseCsvLayer(filePath) {
  const text = fs.readFileSync(filePath, 'utf8').trim();
  const rows = text.split('\n').filter(r => r.length > 0);
  const rowCount = rows.length;
  const colCount = rows[0].split(',').length;

  const values = new Uint8Array(rowCount * colCount);
  for (let r = 0; r < rowCount; r++) {
    const cells = rows[r].split(',');
    if (cells.length !== colCount) {
      throw new Error(
        `${path.basename(filePath)}: row ${r} has ${cells.length} columns, ` +
        `expected ${colCount} (ragged CSV — fix the source file)`
      );
    }
    for (let c = 0; c < colCount; c++) {
      const v = parseInt(cells[c], 10);
      if (Number.isNaN(v) || v < 0 || v > 255) {
        throw new Error(
          `${path.basename(filePath)}: bad value "${cells[c]}" at row ${r}, col ${c} ` +
          `(expected an integer 0-255)`
        );
      }
      values[r * colCount + c] = v;
    }
  }
  return { rows: rowCount, cols: colCount, values };
}

// --- read + validate every layer BEFORE writing anything, so a bad file
//     fails here instead of shipping a broken terrain.bin ---
const layers = LAYERS.map(name => {
  const layer = parseCsvLayer(path.join(dataDir, name));
  console.log(`${name}: ${layer.rows} rows x ${layer.cols} cols (${layer.values.length} bytes)`);
  return layer;
});

// Extra check: the three render_* layers must share one shape, and the
// three aerial_* layers must share one shape (they're R/G/B of the same
// image). Catches "forgot to re-export one channel" mistakes early.
function assertSameShape(names, layerSubset) {
  const [first, ...rest] = layerSubset;
  rest.forEach((l, idx) => {
    if (l.rows !== first.rows || l.cols !== first.cols) {
      throw new Error(
        `${names[idx + 1]} is ${l.rows}x${l.cols} but ${names[0]} is ${first.rows}x${first.cols} — ` +
        `all channels of the same image must match`
      );
    }
  });
}
assertSameShape(LAYERS.slice(1, 4), layers.slice(1, 4)); // render R/G/B
assertSameShape(LAYERS.slice(4, 7), layers.slice(4, 7)); // aerial R/G/B

// --- build the binary file ---
// Header: 4 bytes magic, 1 byte version, 1 byte layer count,
//         then per layer: uint16 rows, uint16 cols  (little-endian)
const HEADER_BASE = 4 + 1 + 1;
const HEADER_PER_LAYER = 4;
const headerSize = HEADER_BASE + HEADER_PER_LAYER * layers.length;
const dataSize = layers.reduce((sum, l) => sum + l.values.length, 0);

const buffer = Buffer.alloc(headerSize + dataSize);
let offset = 0;
buffer.write(MAGIC, offset, 'ascii'); offset += 4;
buffer.writeUInt8(1, offset); offset += 1;             // version
buffer.writeUInt8(layers.length, offset); offset += 1; // layer count

for (const layer of layers) {
  buffer.writeUInt16LE(layer.rows, offset); offset += 2;
  buffer.writeUInt16LE(layer.cols, offset); offset += 2;
}
for (const layer of layers) {
  Buffer.from(layer.values.buffer).copy(buffer, offset);
  offset += layer.values.length;
}

const outPath = path.join(dataDir, 'terrain.bin');
fs.writeFileSync(outPath, buffer);

const oldSize = layers.reduce((sum, l) => sum + fs.statSync(path.join(dataDir, LAYERS[layers.indexOf(l)])).size, 0);
console.log(`\nWrote ${outPath}`);
console.log(`  binary: ${buffer.length} bytes (header ${headerSize} bytes + ${dataSize} bytes data)`);
console.log(`  csv total was: ${oldSize} bytes`);
console.log(`  reduction: ${((1 - buffer.length / oldSize) * 100).toFixed(1)}%`);
