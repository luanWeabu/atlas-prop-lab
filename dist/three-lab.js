const THREE_VERSION = "0.180.0";
const THREE_URL = `https://cdn.jsdelivr.net/npm/three@${THREE_VERSION}/build/three.module.js`;
const CONTROLS_URL = `https://cdn.jsdelivr.net/npm/three@${THREE_VERSION}/examples/jsm/controls/OrbitControls.js`;

Promise.all([import(THREE_URL), import(CONTROLS_URL)])
  .then(([THREE, controls]) => startThreeLab(THREE, controls.OrbitControls))
  .catch(() => {
    document.querySelectorAll(".three-loading").forEach(node => {
      node.classList.add("is-error");
      node.textContent = document.documentElement.lang === "vi"
        ? "Không tải được không gian 3D. Bản vẽ 2D và hướng dẫn lắp vẫn hoạt động bên dưới."
        : "The 3D workspace could not load. The 2D drawing and assembly guide remain available below.";
    });
  });

function startThreeLab(THREE, OrbitControls) {
  const $ = selector => document.querySelector(selector);
  const isVi = () => document.documentElement.lang === "vi";
  const palette = { guardian: 0xf0b44d, warrior: 0x16a6c9, archer: 0x16a6c9, assassin: 0x7057d9, mage: 0x39cc93, boss: 0xef6b68 };
  const names = {
    guardian: ["Aegis Shield", "Khiên Aegis"], warrior: ["Pulse Sword", "Kiếm Pulse"], archer: ["Arc Bow", "Cung Arc"],
    assassin: ["Shade Daggers", "Dao găm Shade"], mage: ["Lumen Staff", "Gậy Lumen"], boss: ["Titan Warden", "Titan Warden"]
  };
  const copy = {
    shell: ["Safe outer shell", "Lớp vỏ an toàn", "Main EVA structure and protected contact surface.", "Kết cấu EVA chính và bề mặt tiếp xúc được bảo vệ.", "Verify size and all rounded edges on a full-scale foam mock-up.", "Kiểm tra kích thước và bo tròn mọi cạnh trên mẫu foam đúng tỉ lệ."],
    light: ["LED feedback", "Phản hồi LED", "Protected visual feedback visible to the player and audience.", "Phản hồi ánh sáng được bảo vệ để người chơi và khán giả cùng nhìn thấy.", "Diffuse the LEDs and strain-relieve every cable before closing the shell.", "Tán sáng LED và chống kéo mọi dây trước khi đóng vỏ."],
    sensor: ["Role sensor", "Cảm biến role", "Motion or draw input aligned to the prop's local axes.", "Input chuyển động hoặc lực kéo được căn theo trục cục bộ của đạo cụ.", "Fix the sensor rigidly, label its axes, then calibrate on real hardware.", "Cố định cảm biến, dán nhãn trục rồi cân chỉnh trên phần cứng thật."],
    core: ["ESP32 service core", "Lõi bảo trì ESP32", "Removable controller, connectors, and USB-first power path.", "Bộ điều khiển tháo rời, đầu nối và đường nguồn ưu tiên USB.", "Keep the service cover accessible and prevent hard parts from touching the wearer.", "Giữ nắp bảo trì dễ mở và không để phần cứng chạm trực tiếp người mặc."],
    control: ["Player control", "Điều khiển người chơi", "Deliberate trigger or button that gates the gameplay intent.", "Cò hoặc nút chủ động dùng để xác nhận ý định gameplay.", "Place it within reach but protect it from accidental activation.", "Đặt trong tầm tay nhưng tránh vị trí dễ bấm nhầm."],
    wearable: ["Wearable mounting", "Kết cấu đeo", "Adjustable straps or armour mounting shared across player sizes.", "Quai hoặc kết cấu áo giáp điều chỉnh theo nhiều cỡ người.", "Fit-test the smallest and largest intended player before field use.", "Thử với người nhỏ nhất và lớn nhất dự kiến trước khi dùng thực địa."]
  };

  function material(color, metalness = .1, opacity = 1) {
    return new THREE.MeshStandardMaterial({ color, metalness, roughness: .62, transparent: opacity < 1, opacity, side: THREE.DoubleSide });
  }
  function addPart(group, geometry, color, key, position, rotation = [0, 0, 0], scale = [1, 1, 1], options = {}) {
    const mesh = new THREE.Mesh(geometry, material(color, options.metalness || .05, options.opacity ?? 1));
    mesh.position.set(...position); mesh.rotation.set(...rotation); mesh.scale.set(...scale);
    mesh.castShadow = true; mesh.receiveShadow = true;
    mesh.userData = { partKey: key, electronic: Boolean(options.electronic), explode: options.explode || [0, 0, 0] };
    group.add(mesh); return mesh;
  }
  function linePart(group, points, color, key, options = {}) {
    const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)));
    return addPart(group, new THREE.TubeGeometry(curve, 28, options.radius || .08, 8, false), color, key, [0, 0, 0], [0, 0, 0], [1, 1, 1], options);
  }
  function finishModel(group) {
    group.traverse(object => {
      if (!object.isMesh) return;
      object.userData.basePosition = object.position.clone();
      object.userData.baseEmissive = object.material.emissive?.getHex() || 0;
    });
    return group;
  }

  function buildGuardian(accent) {
    const group = new THREE.Group();
    addPart(group, new THREE.CylinderGeometry(2.25, 2.25, .34, 48), 0x1a3137, "shell", [0, 0, 0], [Math.PI / 2, 0, 0], [1, 1.12, 1], { explode: [0, 0, -.8] });
    addPart(group, new THREE.TorusGeometry(2.25, .13, 12, 64), accent, "light", [0, 0, .23], [0, 0, 0], [1, 1.12, 1], { electronic: true, explode: [0, 0, 1.1] });
    addPart(group, new THREE.BoxGeometry(.8, .32, .48), 0x283b42, "sensor", [0, .1, -.42], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [-1.4, .5, -.6] });
    addPart(group, new THREE.BoxGeometry(1.05, .75, .32), 0x175b55, "core", [0, -.75, -.5], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [1.3, -.4, -.7] });
    addPart(group, new THREE.CylinderGeometry(.18, .18, .35, 20), accent, "control", [.92, -.22, -.45], [Math.PI / 2, 0, 0], [1, 1, 1], { electronic: true, explode: [1.4, .4, -.5] });
    addPart(group, new THREE.TorusGeometry(.85, .12, 10, 36, Math.PI * 1.3), 0x52666c, "wearable", [-.65, 0, -.56], [Math.PI / 2, 0, .2], [1, 1, 1], { explode: [-1.2, -.4, -.8] });
    return finishModel(group);
  }
  function buildSword(accent) {
    const group = new THREE.Group();
    addPart(group, new THREE.BoxGeometry(.72, 4.4, .18), 0x264047, "shell", [0, .65, 0], [0, 0, 0], [1, 1, 1], { explode: [0, 1.2, 0] });
    addPart(group, new THREE.BoxGeometry(.16, 3.9, .23), accent, "light", [0, .75, .14], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [.8, .7, .8] });
    addPart(group, new THREE.BoxGeometry(2.1, .25, .34), 0x52666c, "sensor", [0, -1.65, 0], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [-1.1, -.5, 0] });
    addPart(group, new THREE.CylinderGeometry(.28, .34, 1.45, 20), 0x18343d, "core", [0, -2.5, 0], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [1.1, -.8, 0] });
    addPart(group, new THREE.SphereGeometry(.18, 16, 12), accent, "control", [.22, -2.15, .22], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [.8, 0, .8] });
    addPart(group, new THREE.TorusGeometry(.46, .07, 8, 24), 0x789198, "wearable", [0, -3.25, 0], [Math.PI / 2, 0, 0], [1, 1, 1], { explode: [0, -1.2, 0] });
    return finishModel(group);
  }
  function buildBow(accent) {
    const group = new THREE.Group();
    linePart(group, [[-1.2, 2.5, 0], [-2, 0, 0], [-1.2, -2.5, 0]], 0x264047, "shell", { radius: .18, explode: [-.8, 0, 0] });
    linePart(group, [[1.2, 2.5, 0], [2, 0, 0], [1.2, -2.5, 0]], 0x264047, "shell", { radius: .18, explode: [.8, 0, 0] });
    linePart(group, [[-1.2, 2.5, 0], [0, 0, 0], [-1.2, -2.5, 0]], accent, "light", { radius: .035, electronic: true, explode: [0, 0, .8] });
    linePart(group, [[1.2, 2.5, 0], [0, 0, 0], [1.2, -2.5, 0]], 0xc8d9dd, "wearable", { radius: .035, explode: [0, 0, -.8] });
    addPart(group, new THREE.BoxGeometry(.55, 1.75, .5), 0x18343d, "core", [0, 0, 0], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [1.2, 0, 0] });
    addPart(group, new THREE.SphereGeometry(.2, 16, 12), accent, "sensor", [0, .55, .35], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [-1.2, .6, .5] });
    addPart(group, new THREE.CylinderGeometry(.14, .14, .34, 18), 0x7057d9, "control", [0, -.45, .38], [Math.PI / 2, 0, 0], [1, 1, 1], { electronic: true, explode: [.8, -.6, .8] });
    return finishModel(group);
  }
  function buildDaggers(accent) {
    const group = new THREE.Group();
    [-1, 1].forEach(side => {
      addPart(group, new THREE.BoxGeometry(.58, 3.2, .16), 0x2b3942, "shell", [side * .85, .65, 0], [0, 0, side * .08], [1, 1, 1], { explode: [side * 1.1, .6, 0] });
      addPart(group, new THREE.BoxGeometry(.12, 2.7, .22), accent, "light", [side * .85, .72, .14], [0, 0, side * .08], [1, 1, 1], { electronic: true, explode: [side * 1.5, .8, .7] });
      addPart(group, new THREE.CylinderGeometry(.24, .28, 1.35, 18), 0x18343d, side < 0 ? "core" : "sensor", [side * .85, -1.72, 0], [0, 0, side * .08], [1, 1, 1], { electronic: true, explode: [side * 1.3, -.8, 0] });
    });
    addPart(group, new THREE.SphereGeometry(.17, 16, 12), accent, "control", [-.62, -1.5, .3], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [0, -.5, 1] });
    addPart(group, new THREE.TorusGeometry(.42, .06, 8, 24), 0x789198, "wearable", [.85, -2.45, 0], [Math.PI / 2, 0, 0], [1, 1, 1], { explode: [0, -1.2, 0] });
    return finishModel(group);
  }
  function buildStaff(accent) {
    const group = new THREE.Group();
    addPart(group, new THREE.CylinderGeometry(.18, .22, 5.5, 18), 0x294249, "shell", [0, -.3, 0], [0, 0, 0], [1, 1, 1], { explode: [0, -1, 0] });
    addPart(group, new THREE.IcosahedronGeometry(.85, 2), accent, "light", [0, 2.75, 0], [0, 0, 0], [1, 1, 1], { electronic: true, opacity: .72, explode: [0, 1.2, 0] });
    addPart(group, new THREE.TorusGeometry(1.05, .1, 10, 36), 0x789198, "sensor", [0, 2.75, 0], [Math.PI / 2, 0, 0], [1, 1, 1], { electronic: true, explode: [-1, .5, 0] });
    addPart(group, new THREE.BoxGeometry(.55, 1.25, .45), 0x175b55, "core", [0, -.9, 0], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [1.2, 0, 0] });
    addPart(group, new THREE.SphereGeometry(.16, 16, 12), accent, "control", [.23, .2, .24], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [.8, .5, .8] });
    addPart(group, new THREE.TorusGeometry(.38, .08, 8, 24), 0x52666c, "wearable", [0, -3.2, 0], [Math.PI / 2, 0, 0], [1, 1, 1], { explode: [0, -1, 0] });
    return finishModel(group);
  }
  function buildBoss(accent) {
    const group = new THREE.Group();
    addPart(group, new THREE.BoxGeometry(3.15, 1.55, 1.2), 0x3a2c30, "shell", [0, 1.45, 0], [0, 0, 0], [1, 1, 1], { explode: [0, 1.2, 0] });
    addPart(group, new THREE.CylinderGeometry(.25, .3, 4.7, 18), 0x293b40, "wearable", [0, -1.3, 0], [0, 0, 0], [1, 1, 1], { explode: [0, -1.1, 0] });
    addPart(group, new THREE.BoxGeometry(2.6, .2, 1.0), accent, "light", [0, 1.45, .68], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [0, .4, 1.1] });
    addPart(group, new THREE.BoxGeometry(.7, .55, .45), 0x175b55, "core", [0, -2.25, 0], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [1.2, -.6, 0] });
    addPart(group, new THREE.SphereGeometry(.22, 16, 12), accent, "sensor", [0, -.15, .4], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [-1.2, 0, .6] });
    addPart(group, new THREE.CylinderGeometry(.15, .15, .35, 18), 0x7057d9, "control", [.28, -1.45, .32], [Math.PI / 2, 0, 0], [1, 1, 1], { electronic: true, explode: [.8, -.5, .8] });
    return finishModel(group);
  }
  const builders = { guardian: buildGuardian, warrior: buildSword, archer: buildBow, assassin: buildDaggers, mage: buildStaff, boss: buildBoss };

  function setupRenderer(root, cameraPosition, target) {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x061219, .035);
    const camera = new THREE.PerspectiveCamera(36, 1, .1, 100);
    camera.position.set(...cameraPosition);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.shadowMap.enabled = true;
    root.prepend(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.enablePan = false; controls.minDistance = 6; controls.maxDistance = 16; controls.target.set(...target);
    scene.add(new THREE.HemisphereLight(0xbdefff, 0x102028, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 3); key.position.set(5, 8, 7); key.castShadow = true; scene.add(key);
    const rim = new THREE.PointLight(0x16a6c9, 28, 16); rim.position.set(-5, 2, 4); scene.add(rim);
    const resize = () => { const rect = root.getBoundingClientRect(); if (!rect.width || !rect.height) return; camera.aspect = rect.width / rect.height; camera.updateProjectionMatrix(); renderer.setSize(rect.width, rect.height, false); };
    new ResizeObserver(resize).observe(root); resize();
    return { scene, camera, renderer, controls, resize };
  }

  const propRoot = $("#threePropStage");
  const propWorld = setupRenderer(propRoot, [0, 1, 10], [0, 0, 0]);
  const propPlatform = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.9, .25, 64), material(0x0c2027, .2));
  propPlatform.position.y = -3.35; propPlatform.receiveShadow = true; propWorld.scene.add(propPlatform);
  const propGrid = new THREE.GridHelper(8, 16, 0x16a6c9, 0x17303a); propGrid.position.y = -3.21; propWorld.scene.add(propGrid);
  let currentProp = "guardian", propModel, selectedKey = null;

  function partLabel(key) { return copy[key]?.[isVi() ? 1 : 0] || key; }
  function selectPart(key) {
    selectedKey = key;
    if (!propModel) return;
    propModel.traverse(object => {
      if (!object.isMesh || !object.material.emissive) return;
      object.material.emissive.setHex(object.userData.partKey === key ? palette[currentProp] : object.userData.baseEmissive || 0);
      object.material.emissiveIntensity = object.userData.partKey === key ? .32 : 0;
    });
    document.querySelectorAll("#twinPartButtons button").forEach(button => button.classList.toggle("is-active", button.dataset.twinPart === key));
    const entry = copy[key];
    $("#twinPartInfo").innerHTML = `<strong>${entry[isVi() ? 1 : 0]}</strong><p>${entry[isVi() ? 3 : 2]}</p><p><b>${isVi() ? "Cần kiểm tra:" : "Build check:"}</b> ${entry[isVi() ? 5 : 4]}</p>`;
  }
  function updateExplode() {
    if (!propModel) return;
    const amount = Number($("#explodeRange").value) / 100;
    $("#explodeValue").textContent = `${Math.round(amount * 100)}%`;
    propModel.traverse(object => {
      if (!object.isMesh || !object.userData.basePosition) return;
      const vector = object.userData.explode || [0, 0, 0];
      object.position.copy(object.userData.basePosition).add(new THREE.Vector3(...vector).multiplyScalar(amount));
    });
  }
  function updateElectronicLayer() {
    const show = $("#electronicsLayerToggle").checked;
    propModel?.traverse(object => { if (object.isMesh && object.userData.electronic) object.visible = show; });
  }
  function rebuildProp(prop = currentProp) {
    if (!builders[prop]) return;
    currentProp = prop;
    if (propModel) propWorld.scene.remove(propModel);
    propModel = builders[prop](palette[prop]); propWorld.scene.add(propModel);
    const keys = [...new Set(propModel.children.map(child => child.userData.partKey).filter(Boolean))];
    $("#twinPartButtons").innerHTML = keys.map(key => `<button type="button" data-twin-part="${key}">${partLabel(key)}</button>`).join("");
    $("#twin-title").textContent = `${names[prop][isVi() ? 1 : 0]} · ${isVi() ? "mô hình lắp 3D" : "3D assembly model"}`;
    $("#twinPropName").textContent = names[prop][isVi() ? 1 : 0];
    $("#explodeRange").value = "0"; updateExplode(); updateElectronicLayer(); selectPart(keys[0]);
  }
  $("#explodeRange").addEventListener("input", updateExplode);
  $("#electronicsLayerToggle").addEventListener("change", updateElectronicLayer);
  $("#twinPartButtons").addEventListener("click", event => { const button = event.target.closest("[data-twin-part]"); if (button) selectPart(button.dataset.twinPart); });
  const propRaycaster = new THREE.Raycaster(); const propPointer = new THREE.Vector2();
  propWorld.renderer.domElement.addEventListener("pointerup", event => {
    const rect = propWorld.renderer.domElement.getBoundingClientRect();
    propPointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    propRaycaster.setFromCamera(propPointer, propWorld.camera);
    const hit = propRaycaster.intersectObject(propModel, true).find(item => item.object.userData.partKey);
    if (hit) selectPart(hit.object.userData.partKey);
  });
  $("#threePropLoading")?.remove(); rebuildProp($("#roleSelect")?.value || "guardian");

  const arenaRoot = $("#threeArenaStage");
  const arenaWorld = setupRenderer(arenaRoot, [0, 9.5, 10.5], [0, 0, 0]);
  arenaWorld.controls.minPolarAngle = .45; arenaWorld.controls.maxPolarAngle = 1.2; arenaWorld.controls.minDistance = 9; arenaWorld.controls.maxDistance = 18;
  const floor = new THREE.Mesh(new THREE.CircleGeometry(6.2, 64), material(0x081920, .1)); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; arenaWorld.scene.add(floor);
  const grid = new THREE.GridHelper(12, 12, 0x16a6c9, 0x17303a); grid.position.y = .015; arenaWorld.scene.add(grid);
  [2.2, 4.2, 5.8].forEach((radius, index) => { const ring = new THREE.Mesh(new THREE.RingGeometry(radius - .025, radius + .025, 64), material(index === 0 ? 0xef6b68 : 0xf0b44d, 0, .38)); ring.rotation.x = -Math.PI / 2; ring.position.y = .03; arenaWorld.scene.add(ring); });
  const boss = new THREE.Group();
  addPart(boss, new THREE.CylinderGeometry(.65, .85, 1.8, 16), 0x4a2227, "boss", [0, .9, 0]);
  addPart(boss, new THREE.BoxGeometry(1.5, .45, .65), 0xef6b68, "boss", [0, 1.75, 0]); boss.position.set(0, 0, 0); arenaWorld.scene.add(boss);
  const rolePositions = { guardian: [-3.4, 0, -2.2], archer: [3.5, 0, -2.4], assassin: [3.2, 0, 3], support: [-3.3, 0, 2.9] };
  const roleColors = { guardian: 0xf0b44d, archer: 0x16a6c9, assassin: 0x7057d9, support: 0x39cc93 };
  const heroes = {};
  Object.entries(rolePositions).forEach(([role, position]) => {
    const hero = new THREE.Group();
    addPart(hero, new THREE.CylinderGeometry(.38, .5, 1.15, 16), roleColors[role], role, [0, .58, 0]);
    addPart(hero, new THREE.SphereGeometry(.34, 16, 12), 0xc5d7db, role, [0, 1.42, 0]);
    hero.position.set(...position); hero.userData.role = role; heroes[role] = hero; arenaWorld.scene.add(hero);
  });
  let fieldRole = "archer", bossHp = 520, attackTweens = [], arenaClock = new THREE.Clock();
  function selectFieldRole(role) {
    fieldRole = role;
    Object.entries(heroes).forEach(([key, hero]) => hero.scale.setScalar(key === role ? 1.18 : 1));
    document.querySelectorAll("[data-field-role]").forEach(button => button.classList.toggle("is-active", button.dataset.fieldRole === role));
  }
  function launchEvent(detail) {
    const role = detail.role || fieldRole; const origin = heroes[role]?.position.clone() || heroes[fieldRole].position.clone();
    origin.y = 1.1; const destination = new THREE.Vector3(0, 1.1, 0); const lost = Boolean(detail.lost);
    if (lost) destination.lerpVectors(origin, destination, .55);
    const orb = new THREE.Mesh(new THREE.SphereGeometry(.14, 12, 10), material(lost ? 0xef6b68 : roleColors[role] || 0x16a6c9, .2));
    orb.position.copy(origin); arenaWorld.scene.add(orb);
    attackTweens.push({ orb, start: origin, end: destination, elapsed: 0, duration: Math.max(.35, Number(detail.duration || 500) / 1000), lost });
  }
  function setBossHp(value) {
    bossHp = value; const ratio = Math.max(.25, bossHp / 520);
    boss.scale.y = .8 + ratio * .2;
    boss.children.forEach(child => { if (child.material?.emissive) { child.material.emissive.setHex(bossHp < 175 ? 0xef6b68 : 0); child.material.emissiveIntensity = bossHp < 175 ? .4 : 0; } });
  }
  $("#arenaRoleChips").addEventListener("click", event => { const button = event.target.closest("[data-field-role]"); if (button) { selectFieldRole(button.dataset.fieldRole); window.dispatchEvent(new CustomEvent("atlas-select-field-role", { detail: { role: button.dataset.fieldRole } })); } });
  document.querySelectorAll("[data-arena-view]").forEach(button => button.addEventListener("click", () => {
    const mode = button.dataset.arenaView;
    document.querySelectorAll("[data-arena-view]").forEach(item => item.classList.toggle("is-active", item === button));
    arenaRoot.classList.toggle("is-hidden", mode !== "three"); $("#arena").classList.toggle("is-hidden", mode !== "logic");
    $("#arenaViewStatus").textContent = mode === "three" ? "3D EVENT REPLAY" : "LOGIC / PACKET MAP";
  }));
  $("#threeArenaLoading")?.remove(); selectFieldRole("archer");

  window.addEventListener("atlas-prop-change", event => rebuildProp(event.detail?.prop));
  window.addEventListener("atlas-language-change", () => rebuildProp(currentProp));
  window.addEventListener("atlas-field-action", event => launchEvent(event.detail || {}));
  window.addEventListener("atlas-field-state", event => setBossHp(Number(event.detail?.bossHp ?? 520)));
  window.addEventListener("atlas-field-reset", () => { attackTweens.forEach(item => arenaWorld.scene.remove(item.orb)); attackTweens = []; setBossHp(520); });

  function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(arenaClock.getDelta(), .05);
    propModel?.rotateY(.0012);
    attackTweens = attackTweens.filter(tween => {
      tween.elapsed += delta; const progress = Math.min(1, tween.elapsed / tween.duration); const eased = 1 - Math.pow(1 - progress, 3);
      tween.orb.position.lerpVectors(tween.start, tween.end, eased); tween.orb.position.y += Math.sin(progress * Math.PI) * 1.4;
      if (progress < 1) return true;
      arenaWorld.scene.remove(tween.orb); return false;
    });
    propWorld.controls.update(); arenaWorld.controls.update();
    propWorld.renderer.render(propWorld.scene, propWorld.camera); arenaWorld.renderer.render(arenaWorld.scene, arenaWorld.camera);
  }
  animate();
}
