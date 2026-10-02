import { readFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const required = [
  "dist/index.html", "dist/styles.css", "dist/app.js", "dist/three-lab.js", "dist/favicon.svg",
  "wokwi/diagram.json", "wokwi/scenarios/cast-and-special.yaml", "wokwi.toml",
  "firmware/spell-orb/platformio.ini", "firmware/spell-orb/src/main.cpp",
  "docs/event-contract.md", "docs/bom.md", "docs/assembly-32-steps.md",
  "docs/event-kit-v1.md", "docs/role-build-contract.md"
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
for (const role of ["guardian", "warrior", "archer", "assassin", "mage", "boss"]) {
  if (!app.includes("  " + role + ": {")) throw new Error("Missing role build pack: " + role);
}
const guideMatch = app.match(/const guideSteps = \[([\s\S]*?)\n\];/);
const guideCount = guideMatch?.[1].match(/"(?:[^"\\]|\\.)*"/g)?.length ?? 0;
if (guideCount !== 32) throw new Error(`Expected 32 browser guide steps, found ${guideCount}`);
const viGuideMatch = app.match(/const guideStepsVi = \[([\s\S]*?)\n\];/);
const viGuideCount = viGuideMatch?.[1].match(/"(?:[^"\\]|\\.)*"/g)?.length ?? 0;
if (viGuideCount !== 32) throw new Error(`Expected 32 Vietnamese browser guide steps, found ${viGuideCount}`);
for (const token of ["const propKitVi", "const guidedCallouts", "function renderGuidedAssembly", "function renderGuidedVisual", "const blueprintFocus", "atlas-language"]) {
  if (!app.includes(token)) throw new Error(`Missing bilingual guided-build feature: ${token}`);
}
for (const token of ["const electronicsProfiles", "function electronicsDiagramSvg", "function testElectronicsEvent", "roleCircuitGraphic", "electronicsEventButtons"]) {
  if (!app.includes(token)) throw new Error(`Missing role electronics feature: ${token}`);
}

const html = await readFile(resolve(root, "dist/index.html"), "utf8");
for (const asset of ["styles.css", "app.js", "favicon.svg"]) {
  if (!html.includes(asset)) throw new Error(`HTML is missing ${asset}`);
}
for (const id of ["partsReadyCheck", "guidedStepNav", "guidedVisualTabs", "guidedVisualFrame", "guidedStepAction", "guidedStepPass"]) {
  if (!html.includes(`id="${id}"`)) throw new Error(`HTML is missing guided assembly control: ${id}`);
}
for (const id of ["roleCircuitGraphic", "electronicsEventButtons", "electronicsTestLog", "core-build-title", "guideList"]) {
  if (!html.includes(`id="${id}"`)) throw new Error(`HTML is missing electronics lab control: ${id}`);
}
for (const id of ["threePropStage", "explodeRange", "electronicsLayerToggle", "twinPartButtons", "threeArenaStage", "arenaRoleChips"]) {
  if (!html.includes(`id="${id}"`)) throw new Error(`HTML is missing Three.js digital-twin control: ${id}`);
}
for (const id of ["guardianProductionPack", "playerHeight", "forearmLength", "shieldDiameterResult", "guardianPurchaseList", "guardianGateList", "downloadGuardianProductionPack"]) {
  if (!html.includes(`id="${id}"`)) throw new Error(`HTML is missing Guardian production control: ${id}`);
}
for (const token of ["const guardianProduction", "function renderGuardianProduction", "function updateGuardianFit", "function downloadGuardianProductionPack", "atlas-guided-step-change"]) {
  if (!app.includes(token)) throw new Error(`Missing Guardian production feature: ${token}`);
}
const threeLab = await readFile(resolve(root, "dist/three-lab.js"), "utf8");
for (const token of ["buildGuardian", "buildSword", "buildBow", "buildDaggers", "buildStaff", "buildBoss", "atlas-field-action", "atlas-prop-change"]) {
  if (!threeLab.includes(token)) throw new Error(`Missing Three.js digital-twin feature: ${token}`);
}
if (html.includes('data-view="build"')) throw new Error("Legacy disconnected build tab still exists");

console.log("Atlas Prop Lab validation passed: Guardian production pack, 6 bilingual role packs, 6 Three.js digital twins, synchronized role electronics and arena replay, " + diagram.parts.length + " Wokwi proxy parts, " + diagram.connections.length + " wires, " + guideCount + " English + " + viGuideCount + " Vietnamese bench steps.");
