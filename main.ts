import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The entry: a one-line fortune for a houseplant on the windowsill.
// 116 Unicode code points, inside the 1-120 gate.
// Why this line: it names one specific plant (a pothos, which trails),
// gives it a future in this window (past the sill by summer), lands a
// small joke a plant lover laughs at (the cat admitting defeat), stays
// warm about plant and keeper alike, and opens with the cadence of a
// prediction ("By summer you will..."). No pun, no doom, no care
// instruction, and no word that could be cut without losing meaning.
const TEXT =
  "By summer you will trail past the sill, little pothos, and the cat " +
  "will finally admit defeat and nap somewhere else.";

// Fail closed: never write a text the gate would refuse (1-120 code
// points, not only whitespace). The count is in Unicode code points,
// not bytes and not UTF-16 units.
const points = [...TEXT].length;
if (points < 1 || points > 120 || /^\s*$/.test(TEXT)) {
  throw new Error(`entry text is ${points} code points, outside the 1-120 gate`);
}

const out = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");
mkdirSync(out, { recursive: true });
writeFileSync(resolve(out, "entry.txt"), TEXT, "utf8");
