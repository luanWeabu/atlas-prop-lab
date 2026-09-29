import { readFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const required = [
  "dist/index.html", "dist/styles.css", "dist/app.js", "dist/favicon.svg",
  "wokwi/diagram.json", "wokwi/scenarios/cast-and-special.yaml", "wokwi.toml",
  "firmware/spell-orb/platformio.ini", "firmware/spell-orb/src/main.cpp",
  "docs/event-contract.md", "docs/bom.md", "docs/assembly-32-steps.md"
];

for (const file of required) await access(resolve(root, file), constants.R_OK);

const diagram = JSON.parse(await readFile(resolve(root, "wokwi/diagram.json"), "utf8"));
const partIds = new Set(diagram.parts.map(part => part.id));
if (partIds.size !== diagram.parts.length) throw new Error("Duplicate Wokwi part IDs");
for (const [from, to] of diagram.connections) {
  for (const endpoint of [from, to]) {
    const id = endpoint.split(":")[0];
    if (!partIds.has(id)) throw new Error(`Connection references unknown part: ${id}`);
  }
}

const firmware = await readFile(resolve(root, "firmware/spell-orb/src/main.cpp"), "utf8");
for (const token of ["ATLAS_PROP_READY", '"PLAYER_INTENT"', '"CAST"', '"SPECIAL"']) {
  if (!firmware.includes(token.replaceAll('"', '\\"')) && !firmware.includes(token)) {
    throw new Error(`Firmware is missing ${token}`);
  }
}

const app = await readFile(resolve(root, "dist/app.js"), "utf8");
const guideMatch = app.match(/const guideSteps = \[([\s\S]*?)\n\];/);
const guideCount = guideMatch?.[1].match(/"(?:[^"\\]|\\.)*"/g)?.length ?? 0;
if (guideCount !== 32) throw new Error(`Expected 32 browser guide steps, found ${guideCount}`);

const html = await readFile(resolve(root, "dist/index.html"), "utf8");
for (const asset of ["styles.css", "app.js", "favicon.svg"]) {
  if (!html.includes(asset)) throw new Error(`HTML is missing ${asset}`);
}

console.log(`Atlas Prop Lab validation passed: ${diagram.parts.length} parts, ${diagram.connections.length} wires, ${guideCount} guide steps.`);

