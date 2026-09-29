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
      execute() { return { role: state.role, transport: state.transport, led: state.led, buzzer: state.buzzer, simulation: { bossHp: state.bossHp, sent: state.sent, delivered: state.delivered, lost: state.lost } }; }
    }
  ];
  tools.forEach(tool => { try { Promise.resolve(context.registerTool(tool)).catch(() => {}); } catch {} });
}

function init() {
  buildRingDots(); renderConfig(); renderBuildPack(); updateMetrics();
  $$(".tab").forEach(tab => tab.addEventListener("click", () => showView(tab.dataset.view)));
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

