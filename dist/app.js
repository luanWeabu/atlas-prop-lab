const commonPropBom = [
  ["ESP32-S3 DevKit", "1", "Hshop / maker shop", "Bench"],
  ["MPU6050 IMU", "1", "Hshop / maker shop", "Bench"],
  ["Momentary button", "2", "Maker shop", "Bench"],
  ["WS2812B LED", "1 set", "Maker shop / marketplace", "Bench"],
  ["USB data cable", "1", "Computer shop", "Bench"],
  ["EVA foam sheets", "As cut plan", "Cosplay material shop", "Shell"]
];

const propKits = {
  guardian: {
    roleLabel: "GUARDIAN / DEFENCE", name: "Aegis Shield", kind: "shield", size: "Ø 500 mm",
    budget: "EST. 550K–1.2M VND",
    purpose: "A broad defensive controller that makes block direction, timing, acknowledgement, and team protection visible.",
    shell: "3-layer EVA, 45–55 cm, nylon arm straps", sensor: "MPU6050 + thumb trigger",
    core: "Removable rear-center module", events: "BLOCK_START · BLOCK_END · TAUNT",
    safety: "Rounded foam perimeter. No shield charge and no physical body contact.",
    callouts: ["10 mm EVA face", "ESP32 service box", "MPU6050 at centre", "Thumb trigger", "WS2812B rim", "Adjustable arm straps"],
    bom: [["10 mm EVA sheet", "2", "Cosplay material shop", "Shell"], ["Nylon strap + buckle", "2", "Sewing shop", "Shell"], ["Vibration motor", "1", "Maker shop", "Feedback"]],
    assembly: ["Print the 500 mm shield template and make a cardboard fit mock-up.", "Build and test ESP32, IMU, trigger, and one LED segment over USB.", "Cut and laminate the EVA layers; keep the service-box cavity open.", "Mount the IMU flat at the geometric centre with its axis arrow facing up.", "Install the thumb trigger under the dominant-hand grip.", "Route the LED rim through a protected channel and add a quick connector.", "Attach adjustable straps, close the removable rear cover, and calibrate neutral angle.", "Run 100 block raises and record false triggers before paint."]
  },
  warrior: {
    roleLabel: "WARRIOR / PRESSURE", name: "Pulse Sword", kind: "sword", size: "650 × 110 mm",
    budget: "EST. 450K–1.0M VND",
    purpose: "A short foam sword that sends deliberate swing intent only while its grip trigger is held.",
    shell: "Soft EVA blade, electronics confined to hilt", sensor: "MPU6050 + index trigger",
    core: "Hilt service cartridge", events: "STRIKE · HEAVY_STRIKE · PARRY",
    safety: "No metal or rigid full-length core. Performance gestures only; never strike another player.",
    callouts: ["Soft EVA blade", "Diffused LED spine", "IMU in guard", "Index trigger", "ESP32 hilt cartridge", "Wrist retention loop"],
    bom: [["5–10 mm EVA sheet", "2", "Cosplay material shop", "Shell"], ["Soft diffuser strip", "1", "Maker / craft shop", "Shell"], ["Wrist loop", "1", "Sewing shop", "Safety"]],
    assembly: ["Make a full-size cardboard silhouette and confirm the 650 mm length.", "Bench-test trigger-gated gesture detection over USB.", "Laminate the EVA blade without a metal or wooden core.", "Cut a protected LED channel along the spine.", "Mount the IMU in the guard, aligned with the blade direction.", "Build the removable hilt cartridge with ESP32 and connectors.", "Fit a wrist retention loop and close all hard edges under foam.", "Run 100 deliberate and 100 accidental motions; tune the gesture threshold."]
  },
  archer: {
    roleLabel: "ARCHER / RANGED", name: "Arc Bow", kind: "bow", size: "900 × 430 mm",
    budget: "EST. 650K–1.4M VND",
    purpose: "A no-projectile bow that measures draw and release, while Unity creates the virtual arrow and hit.",
    shell: "Light PVC/EVA limbs with low-tension elastic string", sensor: "Linear Hall sensor + magnet + IMU",
    core: "Central grip compartment", events: "DRAW_START · DRAW_READY · FIRE",
    safety: "No arrow, no launcher, and low string tension. The bow must never store projectile energy.",
    callouts: ["Foam-wrapped limb", "Low-tension draw cord", "Draw magnet", "Hall sensor slot", "ESP32 grip", "Limb status LEDs"],
    bom: [["Light PVC/EVA frame", "1", "Hardware + cosplay shop", "Shell"], ["Linear Hall sensor", "1", "Maker shop", "Input"], ["Small magnet", "1", "Maker shop", "Input"], ["Elastic draw cord", "1", "Craft shop", "Safety"]],
    assembly: ["Build a powerless foam/PVC bow mock-up and confirm comfortable reach.", "Bench-test the Hall sensor and magnet travel over USB.", "Set the draw cord to low tension; confirm it cannot launch any object.", "Install the Hall sensor inside the grip and the magnet on the draw slider.", "Mount the ESP32 in the central grip with a removable cover.", "Add diffused LEDs to the limbs without weakening the frame.", "Calibrate rest, ready, and release thresholds for three different users.", "Run 100 draws, including partial releases, and record missed or duplicate FIRE events."]
  },
  assassin: {
    roleLabel: "ASSASSIN / CONTROL", name: "Shade Daggers", kind: "dagger", size: "320 × 75 mm",
    budget: "EST. 450K–950K VND",
    purpose: "A paired visual set with electronics in the dominant dagger; trap placement remains virtual in the MVP.",
    shell: "Two short EVA daggers; one active and one passive", sensor: "MPU6050 + grip trigger",
    core: "Dominant-hand hilt", events: "QUICK_STRIKE · HEAVY_STRIKE · PLACE_TRAP",
    safety: "Short rounded foam blades. No thrust toward the head, torso, or another player.",
    callouts: ["Active EVA dagger", "Passive off-hand dagger", "IMU in active guard", "Grip trigger", "ESP32 active hilt", "Trap button / wrist pad"],
    bom: [["5–10 mm EVA sheet", "2", "Cosplay material shop", "Shell"], ["Wrist button pad", "1", "Maker + sewing shop", "Input"], ["Wrist retention loops", "2", "Sewing shop", "Safety"]],
    assembly: ["Make two 320 mm cardboard templates with fully rounded tips.", "Bench-test the active dagger and separate trap button over USB.", "Laminate both EVA bodies; keep only the dominant hilt serviceable.", "Align the IMU with the active blade direction.", "Install grip trigger, ESP32 cartridge, and wrist retention loop.", "Build the off-hand dagger as a passive lightweight prop.", "Map trap placement to an arena zone; do not place electronics on the floor yet.", "Test rapid combinations and verify one physical motion creates at most one event."]
  },
  mage: {
    roleLabel: "MAGE / SUPPORT", name: "Lumen Staff", kind: "staff", size: "1,100 × 140 mm",
    budget: "EST. 600K–1.3M VND",
    purpose: "A support staff with a luminous orb for healing, shielding, channeling, and revive intent.",
    shell: "Light PVC shaft fully wrapped in EVA; padded ends", sensor: "MPU6050 + CAST/SPECIAL buttons",
    core: "Lower grip for balance", events: "CAST_HEAL · CHANNEL · TEAM_SHIELD",
    safety: "Both ends padded. No spinning near other players and no ground impact.",
    callouts: ["Diffused LED orb", "Padded upper head", "CAST thumb button", "IMU below grip", "ESP32 lower grip", "Padded lower end"],
    bom: [["Light PVC tube", "1", "Hardware shop", "Shell"], ["EVA wrap + padding", "1 set", "Cosplay material shop", "Shell"], ["Diffused orb shell", "1", "Prop maker / 3D print", "Shell"], ["Vibration motor", "1", "Maker shop", "Feedback"]],
    assembly: ["Confirm 1.0–1.2 m length with the shortest expected player.", "Bench-test CAST, SPECIAL, IMU, orb LED, and haptic over USB.", "Wrap the shaft completely and pad both ends.", "Mount the orb with a removable diffuser and no exposed hard point.", "Place the IMU below the upper grip and align its forward axis.", "Install ESP32 and connectors in the lower grip to balance the orb.", "Calibrate pointing and channel posture for three users.", "Run heal, shield, and cancelled-channel scenarios before paint."]
  },
  boss: {
    roleLabel: "BOSS / RAID CONTROL", name: "Titan Warden Hammer", kind: "hammer", size: "1,150 × 360 mm",
    budget: "EST. 1.3M–3.0M VND",
    purpose: "A high-visibility two-handed boss controller paired with a three-zone LED armour vest and phase feedback.",
    shell: "Hollow EVA hammer head, foam-wrapped shaft, adjustable LED armour", sensor: "MPU6050 + two grip triggers",
    core: "Lower hammer grip + separate armour receiver", events: "SWEEP · SLAM · MARK · PHASE_SKILL",
    safety: "A hollow lightweight head, padded shaft, and zero-contact attacks. AoE exists only in Unity and arena cues.",
    callouts: ["Hollow EVA hammer head", "Head effect LEDs", "Primary trigger", "IMU at balance point", "ESP32 lower grip", "3-zone LED armour"],
    bom: [["10 mm EVA sheets", "3–4", "Cosplay material shop", "Shell"], ["Light PVC shaft", "1", "Hardware shop", "Shell"], ["Armour training bib", "1", "Sports shop", "Wearable"], ["LED armour panels", "3", "Maker + sewing shop", "Feedback"], ["Second receiver core", "1", "Maker shop", "Field"]],
    assembly: ["Build the hollow hammer head at full size and weigh it before electronics.", "Bench-test two triggers, IMU, and head LEDs over USB.", "Wrap the shaft in foam and pad both ends.", "Install the IMU at the balance point and the ESP32 in the lower grip.", "Create an open-side adjustable armour bib with removable LED panels.", "Pair hammer input and armour feedback under one boss session identity.", "Calibrate SWEEP, SLAM, and MARK without physical contact.", "Run a five-minute phase test and reject the build if heat, discomfort, or false attacks appear."]
  }
};

let activeProp = "guardian";

const roles = {
  guardian: { label: "GUARDIAN", color: "#f0b44d", cast: { damage: 8 }, special: { shield: 25 } },
  archer: { label: "ARCHER", color: "#16a6c9", cast: { damage: 18 }, special: { damage: 34 } },
  assassin: { label: "ASSASSIN", color: "#7057d9", cast: { damage: 14 }, special: { damage: 42 } },
  support: { label: "SUPPORT", color: "#39cc93", cast: { heal: 8 }, special: { heal: 22 } }
};

const pinMap = [
  { pin: "GPIO25", name: "CAST button", color: "#16a6c9", optional: false },
  { pin: "GPIO26", name: "SPECIAL button", color: "#7057d9", optional: false },
  { pin: "GPIO18", name: "LED data", color: "#f0b44d", optional: "led" },
  { pin: "GPIO27", name: "Buzzer signal", color: "#f29f4b", optional: "buzzer" },
  { pin: "VIN", name: "5V feedback power", color: "#e05858", optional: "feedback" },
  { pin: "GND", name: "Shared ground", color: "#718088", optional: false }
];

const bom = [
  ["ESP32 DevKit V1, 30 pin", "1", "Bench"], ["WS2812B 16 LED ring", "1", "Bench"],
  ["12 mm momentary button", "2", "Bench"], ["Passive piezo buzzer", "1", "Bench"],
  ["74AHCT125 level shifter", "1", "Bench"], ["330 Ω resistor", "1", "Bench"],
  ["1000 µF capacitor", "1", "Bench"], ["Half size breadboard", "1", "Bench"],
  ["Dupont jumper set", "1", "Bench"], ["USB data cable", "1", "Bench"],
  ["5V USB power bank", "1", "Field"], ["Prototype enclosure", "1", "Field"],
  ["USB power meter", "1", "Recommended"]
];

const guideSteps = [
  "Check every item against the bill of materials.", "Confirm the ESP32 is a 30 pin DevKit V1 board.",
  "Use USB power only for the first build.", "Keep the ESP32 disconnected while wiring.",
  "Place the ESP32 across the breadboard center gap.", "Identify VIN, 3V3, GND, GPIO18, GPIO25, GPIO26, and GPIO27.",
  "Mark the CAST and SPECIAL buttons.", "Place both buttons across the breadboard center gap.",
  "Connect one CAST contact to GPIO25.", "Connect the opposite CAST contact to GND.",
  "Connect one SPECIAL contact to GPIO26.", "Connect the opposite SPECIAL contact to GND.",
  "Check that neither button connects VIN to GND.", "Confirm the firmware uses INPUT_PULLUP for both buttons.",
  "Place the passive buzzer on the breadboard.", "Connect buzzer positive to GPIO27.",
  "Connect buzzer negative to GND.", "Place the 74AHCT125 level shifter across the center gap.",
  "Connect level shifter VCC to VIN and GND to GND.", "Tie the selected channel enable pin low.",
  "Connect GPIO18 to the selected level shifter input.", "Connect its matching output through 330 Ω to LED ring DIN.",
  "Connect LED ring VCC to VIN.", "Connect LED ring GND to GND.",
  "Place the 1000 µF capacitor across ring VCC and GND, matching polarity.", "Compare every wire with the pin table before connecting USB.",
  "Check for loose strands and accidental shorts.", "Connect the ESP32 with a data capable USB cable.",
  "Build and upload firmware/spell-orb with PlatformIO.", "Open serial monitor at 115200 baud and wait for ATLAS_PROP_READY.",
  "Press CAST, then SPECIAL; verify JSON, light, sound, and cooldown.", "Disconnect USB, label the revision, and record any difference before enclosure work."
];

const state = {
  role: "archer", transport: "usb", led: true, buzzer: true,
  latency: 60, loss: 5, bossHp: 520, sent: 0, delivered: 0, lost: 0,
  latencyTotal: 0, sequence: 0, cooldown: { CAST: false, SPECIAL: false }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function blueprintSvg(kind) {
  const frame = (content, label) => `<svg viewBox="0 0 620 360" role="img" aria-label="${label} numbered concept assembly drawing">
    <defs><pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#183541" stroke-width="1"/></pattern></defs>
    <rect width="620" height="360" fill="url(#bp-grid)"/>
    <g class="blueprint-object">${content}</g>
    <path class="dimension-line" d="M70 330H550 M70 322V338 M550 322V338"/>
  </svg>`;
  const dot = (n, x, y, tx, ty) => `<g class="bp-callout"><path d="M${x} ${y}L${tx} ${ty}"/><circle cx="${x}" cy="${y}" r="13"/><text x="${x}" y="${y + 4}" text-anchor="middle">${n}</text></g>`;
  if (kind === "shield") return frame(`
    <path d="M310 35C420 35 485 83 476 174C467 264 398 306 310 320C222 306 153 264 144 174C135 83 200 35 310 35Z"/>
    <path d="M310 70C388 70 435 103 430 170C424 233 376 267 310 281C244 267 196 233 190 170C185 103 232 70 310 70Z"/>
    <circle cx="310" cy="171" r="52"/><path d="M236 116Q310 76 384 116M236 228Q310 268 384 228"/>
    ${dot(1,191,72,118,32)}${dot(2,310,171,520,104)}${dot(3,310,132,94,135)}${dot(4,388,210,530,238)}${dot(5,430,170,533,163)}${dot(6,240,225,104,273)}`, "Aegis Shield");
  if (kind === "sword") return frame(`
    <path d="M282 34L338 34L353 239L326 274H294L267 239Z"/><path d="M310 62V238"/>
    <path d="M225 250H395L378 279H242Z"/><rect x="291" y="273" width="38" height="64" rx="13"/><circle cx="310" cy="337" r="18"/>
    ${dot(1,284,75,118,48)}${dot(2,310,135,500,62)}${dot(3,342,250,520,190)}${dot(4,312,289,102,242)}${dot(5,310,314,496,302)}${dot(6,310,340,116,333)}`, "Pulse Sword");
  if (kind === "bow") return frame(`
    <path d="M194 45Q88 180 194 315M426 45Q532 180 426 315"/><path d="M194 45L310 180L194 315M426 45L310 180L426 315"/>
    <rect x="291" y="126" width="38" height="108" rx="12"/><path d="M310 92V268"/><circle cx="310" cy="180" r="10"/>
    ${dot(1,178,72,74,44)}${dot(2,310,92,500,46)}${dot(3,310,151,105,135)}${dot(4,310,180,520,176)}${dot(5,310,214,100,250)}${dot(6,430,92,526,112)}`, "Arc Bow");
  if (kind === "dagger") return frame(`
    <path d="M158 56L196 56L209 216L177 248L145 216Z"/><path d="M118 239H236L221 263H133Z"/><rect x="158" y="260" width="38" height="64" rx="12"/>
    <path d="M414 56L452 56L465 216L433 248L401 216Z"/><path d="M374 239H492L477 263H389Z"/><rect x="414" y="260" width="38" height="64" rx="12"/>
    ${dot(1,177,92,74,52)}${dot(2,433,92,548,46)}${dot(3,202,239,91,195)}${dot(4,177,278,80,288)}${dot(5,177,306,278,329)}${dot(6,433,306,545,302)}`, "Shade Daggers");
  if (kind === "staff") return frame(`
    <circle cx="310" cy="64" r="45"/><path d="M281 42L310 16L339 42M282 86L310 112L338 86"/>
    <path d="M294 108H326L320 318H300Z"/><rect x="287" y="138" width="46" height="92" rx="18"/>
    ${dot(1,310,64,494,42)}${dot(2,310,108,112,86)}${dot(3,330,154,504,135)}${dot(4,306,205,104,195)}${dot(5,307,246,508,255)}${dot(6,310,316,108,324)}`, "Lumen Staff");
  return frame(`
    <rect x="198" y="38" width="224" height="104" rx="34"/><path d="M230 62H390M230 117H390"/><path d="M290 142H330L324 329H296Z"/>
    <rect x="282" y="174" width="56" height="106" rx="19"/><path d="M450 185l55-28 55 28v72l-55 35-55-35z"/><path d="M470 205h70v42h-70z"/>
    ${dot(1,220,52,86,42)}${dot(2,382,91,538,67)}${dot(3,330,181,99,148)}${dot(4,310,148,505,132)}${dot(5,308,257,102,290)}${dot(6,505,220,554,300)}`, "Titan Warden Hammer and armour");
}

function renderPropKit() {
  const kit = propKits[activeProp];
  document.documentElement.style.setProperty("--kit-accent", activeProp === "boss" ? "#ef6b68" : activeProp === "mage" ? "#39cc93" : activeProp === "guardian" ? "#f0b44d" : "#16a6c9");
  $("#propBlueprint").innerHTML = blueprintSvg(kit.kind);
  $("#propSize").textContent = kit.size;
  $("#propRoleLabel").textContent = kit.roleLabel;
  $("#propName").textContent = kit.name;
  $("#propPurpose").textContent = kit.purpose;
  $("#propShell").textContent = kit.shell;
  $("#propSensor").textContent = kit.sensor;
  $("#propCore").textContent = kit.core;
  $("#propEvents").textContent = kit.events;
  $("#propSafety").textContent = kit.safety;
  $("#propBudget").textContent = kit.budget;
  $("#propStatus").textContent = activeProp === "boss" ? "BOSS DESIGN PACK" : "HERO DESIGN PACK";
  $("#propCallouts").innerHTML = kit.callouts.map((item, index) => `<div><b>${index + 1}</b><span>${item}</span></div>`).join("");
  const rows = [...commonPropBom, ...kit.bom];
  $("#propBomBody").innerHTML = rows.map(([part, qty, source, stage]) => `<tr><td>${part}</td><td>${qty}</td><td>${source}</td><td><span class="stage-tag ${stage === "Bench" ? "" : "later"}">${stage}</span></td></tr>`).join("");
  $("#propAssembly").innerHTML = kit.assembly.map(step => `<li><span></span><p>${step}</p></li>`).join("");
  $$(".role-card").forEach(card => card.classList.toggle("is-active", card.dataset.prop === activeProp));
}

function downloadRoleBuildPack() {
  const kit = propKits[activeProp];
  const rows = [...commonPropBom, ...kit.bom];
  const markdown = [
    `# ${kit.name} — Atlas role build pack`, "", `Role: ${kit.roleLabel}`, `Concept size: ${kit.size}`, `Planning budget: ${kit.budget}`, "",
    "## Purpose", "", kit.purpose, "", "## Construction contract", "", `- Shell: ${kit.shell}`, `- Sensor: ${kit.sensor}`, `- Core: ${kit.core}`, `- Events: ${kit.events}`, `- Safety: ${kit.safety}`, "",
    "## Numbered modules", "", ...kit.callouts.map((item, index) => `${index + 1}. ${item}`), "",
    "## Bill of materials", "", "| Part | Qty | Source | Stage |", "| --- | ---: | --- | --- |", ...rows.map(row => `| ${row.join(" | ")} |`), "",
    "## Assembly path", "", ...kit.assembly.map((step, index) => `${index + 1}. ${step}`), "",
    "## Evidence boundary", "", "This is a design pack. Complete physical safety, power, comfort, radio, false-trigger, and Unity integration tests before field use.", ""
  ].join("\n");
  const blob = new Blob([markdown], { type: "text/markdown" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `atlas-${activeProp}-build-pack.md`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 500);
  toast(`${kit.name} build pack generated`);
}

function buildRingDots() {
  const root = $("#ringDots");
  root.innerHTML = Array.from({ length: 16 }, (_, index) => {
    const angle = (index / 16) * Math.PI * 2 - Math.PI / 2;
    const x = 500 + Math.cos(angle) * 50;
    const y = 276 + Math.sin(angle) * 50;
    return `<circle class="ring-dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"/>`;
  }).join("");
}

function currentDiagram() {
  const parts = [
    { type: "wokwi-esp32-devkit-v1", id: "esp", top: 38.4, left: 8.2, attrs: {} },
    { type: "wokwi-pushbutton", id: "castButton", top: 28.6, left: 258.1, attrs: { color: roles[state.role].color, label: "CAST", key: "C" } },
    { type: "wokwi-pushbutton", id: "specialButton", top: 106.8, left: 258.1, attrs: { color: "#7057d9", label: "SPECIAL", key: "S" } }
  ];
  const connections = [
    ["esp:25", "castButton:1.l", roles[state.role].color, []], ["castButton:2.l", "esp:GND.1", "#5d6672", []],
    ["esp:26", "specialButton:1.l", "#7057d9", []], ["specialButton:2.l", "esp:GND.1", "#5d6672", []]
  ];
  if (state.led) {
    parts.push({ type: "wokwi-led-ring", id: "ring", top: 190.1, left: 234.4, attrs: { pixels: "16" } });
    connections.push(["esp:18", "ring:DIN", "#f2c94c", []], ["esp:VIN", "ring:VCC", "#e05858", []], ["esp:GND.1", "ring:GND", "#5d6672", []]);
  }
  if (state.buzzer) {
    parts.push({ type: "wokwi-buzzer", id: "buzzer", top: 221.4, left: 34.7, attrs: { volume: "0.2" } });
    connections.push(["esp:27", "buzzer:2", "#f29f4b", []], ["esp:GND.1", "buzzer:1", "#5d6672", []]);
  }
  return { version: 1, author: "Atlas Prop Lab", editor: "wokwi", parts, connections, dependencies: {} };
}

function renderConfig() {
  const role = roles[state.role];
  document.documentElement.style.setProperty("--role", role.color);
  $("#roleBadge").textContent = role.label;
  $("#deviceId").textContent = `${state.role}-orb-01`;
  $("#transportBadge").textContent = { usb: "USB SERIAL", websocket: "WIFI / WEBSOCKET", espnow: "ESP-NOW" }[state.transport];
  $("#ringGraphic").classList.toggle("is-disabled", !state.led);
  $("#buzzerGraphic").classList.toggle("is-disabled", !state.buzzer);
  const diagram = currentDiagram();
  $("#partCount").textContent = `${diagram.parts.length} PARTS · ${diagram.connections.length} WIRES`;
  $("#pinList").innerHTML = pinMap.filter(item => {
    if (item.optional === "led") return state.led;
    if (item.optional === "buzzer") return state.buzzer;
    if (item.optional === "feedback") return state.led || state.buzzer;
    return true;
  }).map(item => `<div class="pin-row"><code>${item.pin}</code><span>${item.name}</span><i style="color:${item.color}"></i></div>`).join("");
  const bench = state.transport === "usb";
  $("#validationBox").innerHTML = bench
    ? `<span class="validation-icon">✓</span><div><strong>Bench safe starting point</strong><p>USB power keeps battery and radio variables out of the first proof.</p></div>`
    : `<span class="validation-icon" style="background:var(--amber)">!</span><div><strong>Field candidate</strong><p>Use the simulator now; validate reconnect, range, and interference on real hardware later.</p></div>`;
  $$(".hero-token").forEach(token => token.classList.toggle("is-selected", token.dataset.role === state.role));
}

function downloadJson(name, value) {
  const blob = new Blob([JSON.stringify(value, null, 2) + "\n"], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob); link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 500);
  toast(`${name} generated`);
}

function toast(message) {
  const el = $("#toast"); el.textContent = message; el.classList.add("is-visible");
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("is-visible"), 1800);
}

function showView(id) {
  $$(".view").forEach(view => view.classList.toggle("is-active", view.id === id));
  $$(".tab").forEach(tab => tab.classList.toggle("is-active", tab.dataset.view === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function eventPayload(action) {
  return { v: 1, deviceId: `${state.role}-orb-01`, role: roles[state.role].label, seq: ++state.sequence, type: "PLAYER_INTENT", action, atMs: Math.round(performance.now()) };
}

function addLog(status, payload, detail) {
  const item = document.createElement("li");
  const stamp = new Date().toLocaleTimeString([], { minute: "2-digit", second: "2-digit" });
  item.innerHTML = `<span>${stamp}</span><b class="${status}">${payload.action} · ${detail}</b>`;
  $("#eventLog").prepend(item);
  while ($("#eventLog").children.length > 12) $("#eventLog").lastElementChild.remove();
}

function updateMetrics() {
  $("#sentMetric").textContent = state.sent;
  $("#deliveredMetric").textContent = state.delivered;
  $("#lostMetric").textContent = state.lost;
  $("#avgMetric").textContent = state.delivered ? `${Math.round(state.latencyTotal / state.delivered)} ms` : "—";
  $("#bossHpText").textContent = `${state.bossHp} / 520`;
  $("#bossHpBar").style.width = `${(state.bossHp / 520) * 100}%`;
}

function animatePacket(isLost, duration) {
  const arena = $("#arena"); const packet = $("#packet");
  const hero = $(`.hero-token[data-role="${state.role}"]`); const boss = $(".boss-token");
  const area = arena.getBoundingClientRect(); const start = hero.getBoundingClientRect(); const end = boss.getBoundingClientRect();
  const x1 = start.left + start.width / 2 - area.left - 6; const y1 = start.top + start.height / 2 - area.top - 6;
  const x2 = end.left + end.width / 2 - area.left - 6; const y2 = end.top + end.height / 2 - area.top - 6;
  packet.classList.toggle("is-lost", isLost); packet.style.opacity = "1"; packet.style.left = `${x1}px`; packet.style.top = `${y1}px`;
  const targetX = isLost ? x1 + (x2 - x1) * .55 : x2; const targetY = isLost ? y1 + (y2 - y1) * .55 : y2;
  const animation = packet.animate([{ transform: "scale(.8)" }, { left: `${targetX}px`, top: `${targetY}px`, transform: isLost ? "scale(.25)" : "scale(1.3)" }], { duration: Math.max(180, duration), easing: "cubic-bezier(.2,.7,.2,1)" });
  animation.onfinish = () => { packet.style.opacity = "0"; packet.style.left = `${targetX}px`; packet.style.top = `${targetY}px`; };
}

function applyAction(action) {
  const profile = roles[state.role]; const effect = action === "CAST" ? profile.cast : profile.special;
  if (effect.damage) {
    state.bossHp = Math.max(0, state.bossHp - effect.damage);
    return `accepted · ${effect.damage} damage`;
  }
  if (effect.heal) return `accepted · team +${effect.heal} HP`;
  return `accepted · team shield +${effect.shield}`;
}

function triggerAction(action) {
  if (!roles[state.role] || !["CAST", "SPECIAL"].includes(action)) throw new Error("Unsupported action");
  if (state.cooldown[action]) { toast(`${action} is cooling down`); return { status: "cooldown" }; }
  state.cooldown[action] = true;
  const button = $(`.action-button[data-action="${action}"]`); button.disabled = true;
  setTimeout(() => { state.cooldown[action] = false; button.disabled = false; }, action === "CAST" ? 700 : 4000);

  const payload = eventPayload(action); const jitter = Math.round((Math.random() - .5) * state.latency * .25);
  const travel = Math.max(0, state.latency + jitter); const lost = Math.random() * 100 < state.loss;
  state.sent++; updateMetrics(); addLog("", payload, "sent"); animatePacket(lost, travel);
  setTimeout(() => {
    if (lost) { state.lost++; addLog("lost", payload, "lost"); }
    else { state.delivered++; state.latencyTotal += travel; addLog("good", payload, `${applyAction(action)} · ${travel} ms`); }
    updateMetrics();
  }, Math.max(180, travel));
  return { status: lost ? "scheduled_loss" : "scheduled_delivery", payload, latencyMs: travel };
}

function resetSimulation() {
  Object.assign(state, { bossHp: 520, sent: 0, delivered: 0, lost: 0, latencyTotal: 0, sequence: 0 });
  $("#eventLog").innerHTML = ""; updateMetrics(); toast("Simulation reset");
}

function renderBuildPack() {
  $("#bomBody").innerHTML = bom.map(([part, qty, stage]) => `<tr><td>${part}</td><td>${qty}</td><td><span class="stage-tag ${stage === "Bench" ? "" : "later"}">${stage}</span></td></tr>`).join("");
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem("atlas-guide-checks") || "[]"); } catch { saved = []; }
  $("#guideList").innerHTML = guideSteps.map((step, index) => `<li><label><input type="checkbox" data-step="${index}" ${saved.includes(index) ? "checked" : ""}/><span>${step}</span></label></li>`).join("");
  updateGuideProgress();
}

function updateGuideProgress() {
  const checked = $$("#guideList input:checked").map(input => Number(input.dataset.step));
  localStorage.setItem("atlas-guide-checks", JSON.stringify(checked));
  $("#guideCount").textContent = `${checked.length} / 32`;
  $("#guideProgress").style.width = `${checked.length / 32 * 100}%`;
}

function registerWebMcp() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const tools = [
    {
      name: "configure_atlas_prop", title: "Configure Atlas prop",
      description: "Set the active hero role, transport, LED ring, and buzzer in the visible prototype workspace.",
      inputSchema: { type: "object", properties: { role: { enum: Object.keys(roles) }, transport: { enum: ["usb", "websocket", "espnow"] }, led: { type: "boolean" }, buzzer: { type: "boolean" } }, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (input.role !== undefined && !roles[input.role]) throw new Error("Invalid role");
        if (input.transport !== undefined && !["usb", "websocket", "espnow"].includes(input.transport)) throw new Error("Invalid transport");
        if (input.role !== undefined) state.role = input.role;
        if (input.transport !== undefined) state.transport = input.transport;
        if (input.led !== undefined) state.led = Boolean(input.led);
        if (input.buzzer !== undefined) state.buzzer = Boolean(input.buzzer);
        $("#roleSelect").value = state.role; $("#transportSelect").value = state.transport; $("#ledToggle").checked = state.led; $("#buzzerToggle").checked = state.buzzer;
        renderConfig(); showView("prototype");
        return { role: state.role, transport: state.transport, led: state.led, buzzer: state.buzzer };
      }
    },
    {
      name: "select_atlas_build_pack", title: "Select Atlas build pack",
      description: "Open one role-specific prop plan with its drawing, bill of materials, sensor placement, and assembly path.",
      inputSchema: { type: "object", properties: { prop: { enum: Object.keys(propKits) } }, required: ["prop"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!propKits[input.prop]) throw new Error("Unknown prop build");
        activeProp = input.prop;
        renderPropKit();
        showView("event-kit");
        return { prop: activeProp, name: propKits[activeProp].name, status: "design_pack" };
      }
    },
    {
      name: "trigger_atlas_prop_action", title: "Trigger prop action",
      description: "Send CAST or SPECIAL through the visible Atlas field simulator with the current latency and packet loss.",
      inputSchema: { type: "object", properties: { action: { enum: ["CAST", "SPECIAL"] } }, required: ["action"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) { showView("field"); return triggerAction(input.action); }
    },
    {
      name: "read_atlas_lab_state", title: "Read Atlas lab state",
      description: "Read the active prop configuration and field simulation metrics.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() { return { activeBuildPack: activeProp, role: state.role, transport: state.transport, led: state.led, buzzer: state.buzzer, simulation: { bossHp: state.bossHp, sent: state.sent, delivered: state.delivered, lost: state.lost } }; }
    }
  ];
  tools.forEach(tool => { try { Promise.resolve(context.registerTool(tool)).catch(() => {}); } catch {} });
}

function init() {
  buildRingDots(); renderPropKit(); renderConfig(); renderBuildPack(); updateMetrics();
  $$(".tab").forEach(tab => tab.addEventListener("click", () => showView(tab.dataset.view)));
  $$(".role-card").forEach(card => card.addEventListener("click", () => { activeProp = card.dataset.prop; renderPropKit(); }));
  $("#downloadBuildPack").addEventListener("click", downloadRoleBuildPack);
  $("#roleSelect").addEventListener("change", event => { state.role = event.target.value; renderConfig(); });
  $("#transportSelect").addEventListener("change", event => { state.transport = event.target.value; renderConfig(); });
  $("#ledToggle").addEventListener("change", event => { state.led = event.target.checked; renderConfig(); });
  $("#buzzerToggle").addEventListener("change", event => { state.buzzer = event.target.checked; renderConfig(); });
  $("#downloadDiagram").addEventListener("click", () => downloadJson("diagram.json", currentDiagram()));
  $("#downloadConfig").addEventListener("click", () => downloadJson("atlas-prop-config.json", { version: 1, deviceId: `${state.role}-orb-01`, role: roles[state.role].label, transport: state.transport, features: { ledRing: state.led, buzzer: state.buzzer }, pins: { cast: 25, special: 26, led: state.led ? 18 : null, buzzer: state.buzzer ? 27 : null } }));
  $$(".hero-token").forEach(token => token.addEventListener("click", () => { state.role = token.dataset.role; $("#roleSelect").value = state.role; renderConfig(); }));
  $$(".action-button").forEach(button => button.addEventListener("click", () => triggerAction(button.dataset.action)));
  $("#resetSim").addEventListener("click", resetSimulation);
  $("#latencyRange").addEventListener("input", event => { state.latency = Number(event.target.value); $("#latencyValue").textContent = `${state.latency} ms`; });
  $("#lossRange").addEventListener("input", event => { state.loss = Number(event.target.value); $("#lossValue").textContent = `${state.loss}%`; });
  $("#guideList").addEventListener("change", updateGuideProgress);
  $("#clearChecklist").addEventListener("click", () => { $$("#guideList input").forEach(input => input.checked = false); updateGuideProgress(); });
  registerWebMcp();
}

init();
