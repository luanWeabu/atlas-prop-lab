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
  const propManifests = window.ATLAS_PROP_MANIFESTS || {};
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

  function material(color, metalnessOrOptions = .1, opacity = 1) {
    const options = typeof metalnessOrOptions === "object" ? metalnessOrOptions : { metalness: metalnessOrOptions, opacity };
    const alpha = options.opacity ?? 1;
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: options.metalness ?? .08,
      roughness: options.roughness ?? .56,
      clearcoat: options.clearcoat ?? .08,
      clearcoatRoughness: .34,
      transparent: alpha < 1,
      opacity: alpha,
      transmission: options.transmission ?? 0,
      thickness: options.thickness ?? 0,
      emissive: options.emissive ? color : 0x000000,
      emissiveIntensity: options.emissive ? (options.emissiveIntensity ?? 1.4) : 0,
      side: THREE.DoubleSide
    });
  }
  function addPart(group, geometry, color, key, position, rotation = [0, 0, 0], scale = [1, 1, 1], options = {}) {
    const mesh = new THREE.Mesh(geometry, material(color, options));
    mesh.position.set(...position); mesh.rotation.set(...rotation); mesh.scale.set(...scale);
    mesh.castShadow = true; mesh.receiveShadow = true;
    mesh.userData = { partKey: key, electronic: Boolean(options.electronic), explode: options.explode || [0, 0, 0] };
    group.add(mesh); return mesh;
  }
  function linePart(group, points, color, key, options = {}) {
    const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)), false, "catmullrom", .42);
    return addPart(group, new THREE.TubeGeometry(curve, options.segments || 48, options.radius || .08, options.radialSegments || 10, false), color, key, [0, 0, 0], [0, 0, 0], [1, 1, 1], options);
  }
  function plateGeometry(points, depth = .16, bevel = .045) {
    const shape = new THREE.Shape();
    points.forEach(([x, y], index) => index ? shape.lineTo(x, y) : shape.moveTo(x, y));
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: bevel, bevelThickness: bevel });
    geometry.translate(0, 0, -depth / 2);
    geometry.computeVertexNormals();
    return geometry;
  }
  function addRivet(group, position, key = "shell", color = 0x8ea4aa, options = {}) {
    return addPart(group, new THREE.CylinderGeometry(.055, .055, .045, 16), color, key, position, [Math.PI / 2, 0, 0], [1, 1, 1], { metalness: .72, roughness: .27, ...options });
  }
  function finishModel(group) {
    group.traverse(object => {
      if (!object.isMesh) return;
      object.userData.basePosition = object.position.clone();
      object.userData.baseEmissive = object.material.emissive?.getHex() || 0;
      object.userData.baseEmissiveIntensity = object.material.emissiveIntensity || 0;
      object.userData.baseOpacity = object.material.opacity;
      object.userData.baseTransparent = object.material.transparent;
      object.userData.baseDepthWrite = object.material.depthWrite;
    });
    return group;
  }

  function buildGuardian(accent) {
    const group = new THREE.Group();
    addPart(group, new THREE.CylinderGeometry(2.18, 2.18, .30, 64), 0x13282f, "shell", [0, 0, 0], [Math.PI / 2, 0, 0], [1, 1.08, 1], { roughness: .78, explode: [0, 0, -.72] });
    addPart(group, new THREE.CylinderGeometry(1.86, 1.86, .16, 64), 0x203e46, "shell", [0, 0, .20], [Math.PI / 2, 0, 0], [1, 1.08, 1], { metalness: .2, roughness: .42, explode: [0, 0, .38] });
    addPart(group, new THREE.TorusGeometry(2.16, .13, 14, 72), 0x788e93, "shell", [0, 0, .17], [0, 0, 0], [1, 1.08, 1], { metalness: .62, roughness: .3, explode: [0, 0, .6] });
    addPart(group, new THREE.TorusGeometry(1.72, .055, 10, 72), accent, "light", [0, 0, .32], [0, 0, 0], [1, 1.08, 1], { electronic: true, emissive: true, explode: [0, 0, 1.05] });
    addPart(group, new THREE.SphereGeometry(.56, 32, 18), 0x34555d, "shell", [0, 0, .28], [0, 0, 0], [1, 1, .32], { metalness: .48, roughness: .32, explode: [0, 0, .72] });
    for (let i = 0; i < 8; i++) {
      const angle = i * Math.PI / 4;
      addRivet(group, [Math.cos(angle) * 1.96, Math.sin(angle) * 2.10, .34]);
    }
    addPart(group, new THREE.BoxGeometry(.68, .3, .38), 0x24393f, "sensor", [0, .2, -.37], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [-1.3, .55, -.75] });
    addPart(group, new THREE.BoxGeometry(.92, .7, .28), 0x146258, "core", [0, -.65, -.4], [0, 0, 0], [1, 1, 1], { electronic: true, roughness: .4, explode: [1.35, -.45, -.75] });
    addPart(group, new THREE.CylinderGeometry(.15, .15, .3, 20), accent, "control", [.74, -.2, -.38], [Math.PI / 2, 0, 0], [1, 1, 1], { electronic: true, emissive: true, explode: [1.25, .35, -.65] });
    linePart(group, [[-.68, .92, -.46], [-.98, .15, -.54], [-.7, -.82, -.46]], 0x53666a, "wearable", { radius: .105, explode: [-1.05, 0, -.75] });
    linePart(group, [[.7, .76, -.46], [.98, .05, -.54], [.72, -.72, -.46]], 0x53666a, "wearable", { radius: .105, explode: [1.05, 0, -.75] });
    return finishModel(group);
  }
  function buildSword(accent) {
    const group = new THREE.Group();
    const blade = plateGeometry([[-.42, -1.75], [-.32, 1.7], [0, 2.42], [.32, 1.7], [.42, -1.75]], .18, .035);
    addPart(group, blade, 0x7e9298, "shell", [0, .55, 0], [0, 0, 0], [1, 1, 1], { metalness: .72, roughness: .27, clearcoat: .25, explode: [0, 1.0, 0] });
    linePart(group, [[0, -.98, .13], [0, .35, .13], [0, 2.24, .13]], accent, "light", { radius: .055, electronic: true, emissive: true, explode: [.7, .65, .7] });
    linePart(group, [[-1.2, -1.2, 0], [-.58, -1.05, 0], [0, -.92, 0], [.58, -1.05, 0], [1.2, -1.2, 0]], 0x52666c, "sensor", { radius: .13, metalness: .48, explode: [-1.05, -.4, 0] });
    addPart(group, new THREE.CylinderGeometry(.27, .31, 1.55, 24), 0x172d34, "core", [0, -2.05, 0], [0, 0, 0], [1, 1, 1], { roughness: .76, electronic: true, explode: [1.0, -.72, 0] });
    for (let y = -2.65; y < -1.4; y += .22) linePart(group, [[-.28, y, -.02], [.28, y + .12, .02]], 0x65777a, "wearable", { radius: .035, explode: [0, -1.0, 0] });
    addPart(group, new THREE.SphereGeometry(.14, 20, 14), accent, "control", [.24, -1.68, .25], [0, 0, 0], [1, 1, 1], { electronic: true, emissive: true, explode: [.75, 0, .75] });
    addPart(group, new THREE.OctahedronGeometry(.38, 1), 0x435960, "wearable", [0, -3.02, 0], [0, 0, Math.PI / 4], [1, 1, .65], { metalness: .42, explode: [0, -1.15, 0] });
    return finishModel(group);
  }
  function buildBow(accent) {
    const group = new THREE.Group();
    const upper = [[1.05, 3.05, 0], [.55, 2.92, 0], [-.52, 2.05, 0], [-.78, 1.25, 0], [-.35, .62, 0]];
    const lower = [[-.35, -.62, 0], [-.78, -1.25, 0], [-.52, -2.05, 0], [.55, -2.92, 0], [1.05, -3.05, 0]];
    linePart(group, upper, 0x2d4249, "shell", { radius: .16, segments: 64, metalness: .34, roughness: .44, explode: [-.58, .42, 0] });
    linePart(group, lower, 0x2d4249, "shell", { radius: .16, segments: 64, metalness: .34, roughness: .44, explode: [-.58, -.42, 0] });
    linePart(group, [[.98, 2.95, .08], [.18, 2.58, .12], [-.62, 1.55, .12], [-.36, .74, .12]], accent, "light", { radius: .045, electronic: true, emissive: true, explode: [-.25, .2, .85] });
    linePart(group, [[-.36, -.74, .12], [-.62, -1.55, .12], [.18, -2.58, .12], [.98, -2.95, .08]], accent, "light", { radius: .045, electronic: true, emissive: true, explode: [-.25, -.2, .85] });
    linePart(group, [[1.05, 3.05, 0], [1.12, 0, 0], [1.05, -3.05, 0]], 0xd7e2e2, "wearable", { radius: .025, segments: 28, roughness: .35, explode: [.88, 0, 0] });
    addPart(group, plateGeometry([[-.38, -.78], [-.62, -.35], [-.55, .52], [-.22, .82], [.18, .62], [.13, -.64]], .42, .08), 0x172d34, "core", [-.1, 0, 0], [0, 0, 0], [1, 1, 1], { electronic: true, roughness: .72, explode: [.75, 0, -.45] });
    addPart(group, new THREE.CylinderGeometry(.19, .22, .84, 24), 0x58696c, "wearable", [-.25, -.06, .05], [0, 0, .08], [1, 1, 1], { roughness: .88, explode: [-.5, 0, -.5] });
    addPart(group, new THREE.BoxGeometry(.34, .28, .32), 0x31525a, "sensor", [-.32, .46, .28], [0, 0, .1], [1, 1, 1], { electronic: true, explode: [-1.0, .6, .6] });
    addPart(group, new THREE.CylinderGeometry(.12, .12, .24, 18), 0x7057d9, "control", [-.03, -.34, .32], [Math.PI / 2, 0, 0], [1, 1, 1], { electronic: true, emissive: true, explode: [.7, -.55, .75] });
    addRivet(group, [-.43, .71, .24]); addRivet(group, [-.38, -.68, .24]);
    return finishModel(group);
  }
  function buildDaggers(accent) {
    const group = new THREE.Group();
    [-1, 1].forEach(side => {
      const blade = plateGeometry([[-.33, -1.1], [-.45, .72], [-.18, 1.7], [0, 2.15], [.24, 1.48], [.38, .55], [.3, -1.1]], .15, .035);
      addPart(group, blade, 0x657a81, "shell", [side * .78, .42, 0], [0, 0, side * .16], [1, 1, 1], { metalness: .68, roughness: .3, explode: [side * 1.0, .55, 0] });
      linePart(group, [[side * .78, -.5, .12], [side * .78, .72, .12], [side * .78, 1.85, .08]], accent, "light", { radius: .04, electronic: true, emissive: true, explode: [side * 1.35, .75, .65] });
      linePart(group, [[side * .4, -.7, 0], [side * .78, -.58, 0], [side * 1.15, -.7, 0]], 0x4e6267, "sensor", { radius: .11, metalness: .45, explode: [side * 1.1, -.3, 0] });
      addPart(group, new THREE.CylinderGeometry(.22, .26, 1.25, 20), 0x172d34, side < 0 ? "core" : "sensor", [side * .78, -1.35, 0], [0, 0, side * .16], [1, 1, 1], { electronic: true, roughness: .78, explode: [side * 1.25, -.78, 0] });
      addPart(group, new THREE.OctahedronGeometry(.24, 1), 0x4a5d62, "wearable", [side * .96, -2.03, 0], [0, 0, side * .16], [1, 1, .7], { metalness: .42, explode: [side * 1.2, -1.1, 0] });
    });
    addPart(group, new THREE.SphereGeometry(.13, 18, 12), accent, "control", [-.61, -1.08, .25], [0, 0, 0], [1, 1, 1], { electronic: true, emissive: true, explode: [0, -.45, .9] });
    return finishModel(group);
  }
  function buildStaff(accent) {
    const group = new THREE.Group();
    addPart(group, new THREE.CylinderGeometry(.15, .22, 5.05, 24), 0x293f45, "shell", [0, -.48, 0], [0, 0, 0], [1, 1, 1], { metalness: .25, roughness: .55, explode: [0, -1, 0] });
    for (let y = -2.35; y < .65; y += .42) addPart(group, new THREE.TorusGeometry(.22, .035, 8, 20), 0x5b6f72, "wearable", [0, y, 0], [Math.PI / 2, 0, 0], [1, 1, 1], { metalness: .35, explode: [0, -.75, 0] });
    linePart(group, [[0, .55, 0], [-.78, 1.25, 0], [-.82, 2.2, 0], [-.45, 2.72, 0]], 0x425960, "shell", { radius: .13, metalness: .42, explode: [-.8, .42, 0] });
    linePart(group, [[0, .55, 0], [.78, 1.25, 0], [.82, 2.2, 0], [.45, 2.72, 0]], 0x425960, "shell", { radius: .13, metalness: .42, explode: [.8, .42, 0] });
    addPart(group, new THREE.IcosahedronGeometry(.65, 2), accent, "light", [0, 2.32, 0], [0, 0, 0], [1, 1, 1], { electronic: true, opacity: .68, transmission: .16, emissive: true, explode: [0, 1.15, .45] });
    [[Math.PI / 2, 0, 0], [0, Math.PI / 2, 0], [Math.PI / 3, Math.PI / 4, 0]].forEach((rotation, index) => addPart(group, new THREE.TorusGeometry(.83 + index * .05, .055, 10, 42), 0x74898e, "sensor", [0, 2.32, 0], rotation, [1, 1, 1], { electronic: true, metalness: .6, explode: [index - 1, .45, 0] }));
    addPart(group, new THREE.BoxGeometry(.45, .92, .4), 0x146258, "core", [0, -.65, 0], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [1.08, 0, 0] });
    addPart(group, new THREE.SphereGeometry(.13, 18, 12), accent, "control", [.2, .05, .2], [0, 0, 0], [1, 1, 1], { electronic: true, emissive: true, explode: [.7, .45, .7] });
    addPart(group, new THREE.ConeGeometry(.28, .7, 24), 0x4e6267, "wearable", [0, -3.35, 0], [0, 0, 0], [1, 1, 1], { metalness: .42, explode: [0, -1.0, 0] });
    return finishModel(group);
  }
  function buildBoss(accent) {
    const group = new THREE.Group();
    addPart(group, new THREE.BoxGeometry(3.35, 1.34, 1.22, 4, 2, 2), 0x3d2d32, "shell", [0, 1.48, 0], [0, 0, 0], [1, 1, 1], { metalness: .46, roughness: .38, explode: [0, 1.08, 0] });
    addPart(group, new THREE.CylinderGeometry(.72, .72, 1.36, 8), 0x596c70, "shell", [-1.72, 1.48, 0], [Math.PI / 2, 0, 0], [1, 1, 1], { metalness: .58, explode: [-1.1, .5, 0] });
    addPart(group, new THREE.CylinderGeometry(.72, .72, 1.36, 8), 0x596c70, "shell", [1.72, 1.48, 0], [Math.PI / 2, 0, 0], [1, 1, 1], { metalness: .58, explode: [1.1, .5, 0] });
    addPart(group, new THREE.CylinderGeometry(.23, .31, 4.65, 24), 0x273b40, "wearable", [0, -1.35, 0], [0, 0, 0], [1, 1, 1], { roughness: .76, explode: [0, -1.08, 0] });
    for (let y = -2.65; y < -.15; y += .4) addPart(group, new THREE.TorusGeometry(.29, .035, 8, 20), 0x6a797b, "wearable", [0, y, 0], [Math.PI / 2, 0, 0], [1, 1, 1], { explode: [0, -.85, 0] });
    addPart(group, new THREE.BoxGeometry(2.55, .16, 1.27), accent, "light", [0, 1.48, .68], [0, 0, 0], [1, 1, 1], { electronic: true, emissive: true, explode: [0, .36, 1.04] });
    addPart(group, new THREE.CylinderGeometry(.48, .48, .22, 28), accent, "sensor", [0, 1.48, .72], [Math.PI / 2, 0, 0], [1, 1, 1], { electronic: true, emissive: true, explode: [-1.0, .15, .72] });
    addPart(group, new THREE.BoxGeometry(.62, .52, .4), 0x146258, "core", [0, -2.36, 0], [0, 0, 0], [1, 1, 1], { electronic: true, explode: [1.1, -.55, 0] });
    addPart(group, new THREE.CylinderGeometry(.13, .13, .3, 18), 0x7057d9, "control", [.27, -1.55, .29], [Math.PI / 2, 0, 0], [1, 1, 1], { electronic: true, emissive: true, explode: [.72, -.45, .75] });
    for (const x of [-1.35, 1.35]) for (const y of [1.08, 1.88]) addRivet(group, [x, y, .64], "shell", 0x9badb1);
    return finishModel(group);
  }
  const builders = { guardian: buildGuardian, warrior: buildSword, archer: buildBow, assassin: buildDaggers, mage: buildStaff, boss: buildBoss };

  function setupRenderer(root, cameraPosition, target) {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x061219, .027);
    const camera = new THREE.PerspectiveCamera(36, 1, .1, 100);
    camera.position.set(...cameraPosition);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    root.prepend(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.enablePan = false; controls.minDistance = 6; controls.maxDistance = 16; controls.target.set(...target);
    scene.add(new THREE.HemisphereLight(0xc9f3ff, 0x071015, 1.8));
    const key = new THREE.DirectionalLight(0xffffff, 4.2); key.position.set(5, 8, 7); key.castShadow = true; key.shadow.mapSize.set(1024, 1024); scene.add(key);
    const rim = new THREE.PointLight(0x16a6c9, 32, 18); rim.position.set(-5, 2, 4); scene.add(rim);
    const fill = new THREE.PointLight(0x7057d9, 18, 15); fill.position.set(4, -1, -3); scene.add(fill);
    const resize = () => { const rect = root.getBoundingClientRect(); if (!rect.width || !rect.height) return; camera.aspect = rect.width / rect.height; camera.updateProjectionMatrix(); renderer.setSize(rect.width, rect.height, false); };
    new ResizeObserver(resize).observe(root); resize();
    return { scene, camera, renderer, controls, resize };
  }

  const propRoot = $("#threePropStage");
  const propWorld = setupRenderer(propRoot, [0, .7, 10.8], [0, 0, 0]);
  const propPlatform = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.9, .25, 64), material(0x0c2027, .2));
  propPlatform.position.y = -3.35; propPlatform.receiveShadow = true; propWorld.scene.add(propPlatform);
  const propGrid = new THREE.GridHelper(8, 16, 0x16a6c9, 0x17303a); propGrid.position.y = -3.21; propWorld.scene.add(propGrid);
  const initialHeight = Number($("#playerHeight")?.value || 168);
  let currentProp = "guardian", propModel, selectedKey = null, currentAssemblyStep = 0, guardianDiameter = Math.round(Math.max(45, Math.min(55, initialHeight * .3)));
  const selectedByProp = {};

  function partLabel(key) { return copy[key]?.[isVi() ? 1 : 0] || key; }
  function modelKeys() {
    const geometryKeys = new Set((propModel?.children || []).map(child => child.userData.partKey).filter(Boolean));
    const manifestKeys = (propManifests[currentProp]?.modules || []).map(module => module.modelKey);
    return [...new Set(manifestKeys)].filter(key => geometryKeys.has(key));
  }
  function refreshPropLabels() {
    if (!propModel) return;
    const keys = modelKeys();
    $("#twinPartButtons").innerHTML = keys.map(key => `<button type="button" data-twin-part="${key}">${partLabel(key)}</button>`).join("");
    $("#twin-title").textContent = `${names[currentProp][isVi() ? 1 : 0]} · ${isVi() ? "mô hình lắp 3D" : "3D assembly model"}`;
    $("#twinPropName").textContent = names[currentProp][isVi() ? 1 : 0];
    selectPart(keys.includes(selectedKey) ? selectedKey : keys[0], { autoReveal: false });
  }
  function selectPart(key, { autoReveal = true } = {}) {
    if (!copy[key]) return;
    selectedKey = key;
    selectedByProp[currentProp] = key;
    if (!propModel) return;
    const selectingElectronics = propModel.children.some(object => object.userData.partKey === key && object.userData.electronic);
    if (autoReveal && selectingElectronics) {
      $("#electronicsLayerToggle").checked = true;
      if (Number($("#explodeRange").value) < 28) $("#explodeRange").value = "28";
    }
    propModel.traverse(object => {
      if (!object.isMesh || !object.material.emissive) return;
      const selected = object.userData.partKey === key;
      object.material.emissive.setHex(selected ? palette[currentProp] : object.userData.baseEmissive || 0);
      object.material.emissiveIntensity = selected ? Math.max(1.85, object.userData.baseEmissiveIntensity || 0) : object.userData.baseEmissiveIntensity || 0;
      object.renderOrder = selected ? 4 : 0;
    });
    updateExplode();
    updateElectronicLayer();
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
    propModel?.traverse(object => {
      if (!object.isMesh) return;
      if (object.userData.electronic) object.visible = show;
      const ghostShell = show && object.userData.partKey === "shell" && selectedKey !== "shell";
      object.material.opacity = ghostShell ? Math.min(.22, object.userData.baseOpacity ?? 1) : object.userData.baseOpacity ?? 1;
      object.material.transparent = ghostShell || object.userData.baseTransparent;
      object.material.depthWrite = ghostShell ? false : object.userData.baseDepthWrite;
    });
  }
  function rebuildProp(prop = currentProp) {
    if (!builders[prop]) return;
    if (prop === currentProp && propModel) {
      refreshPropLabels();
      applyGuidedStep(prop, currentAssemblyStep);
      return;
    }
    currentProp = prop;
    if (propModel) propWorld.scene.remove(propModel);
    propModel = builders[prop](palette[prop]);
    if (prop === "guardian") propModel.scale.setScalar(guardianDiameter / 50);
    propWorld.scene.add(propModel);
    const keys = modelKeys();
    selectedKey = keys.includes(selectedByProp[prop]) ? selectedByProp[prop] : keys[0];
    $("#explodeRange").value = "0";
    refreshPropLabels();
    if ($("#syncTwinToggle")?.checked) applyGuidedStep(prop, currentAssemblyStep);
    else selectPart(selectedKey, { autoReveal: false });
  }
  function applyGuidedStep(prop, step) {
    currentAssemblyStep = Number(step || 0);
    if (prop !== currentProp || !$("#syncTwinToggle")?.checked) return;
    const mapping = ["wearable", "core", "shell", "sensor", "control", "light", "wearable", "shell"];
    const key = mapping[Math.max(0, Math.min(7, currentAssemblyStep))];
    $("#explodeRange").value = currentAssemblyStep === 0 ? "22" : currentAssemblyStep === 7 ? "0" : "48";
    updateExplode(); selectPart(key);
  }
  $("#explodeRange").addEventListener("input", updateExplode);
  $("#electronicsLayerToggle").addEventListener("change", updateElectronicLayer);
  $("#syncTwinToggle").addEventListener("change", () => applyGuidedStep(currentProp, currentAssemblyStep));
  function selectPartManually(key) {
    $("#syncTwinToggle").checked = false;
    selectPart(key);
  }
  $("#twinPartButtons").addEventListener("click", event => { const button = event.target.closest("[data-twin-part]"); if (button) selectPartManually(button.dataset.twinPart); });
  const propRaycaster = new THREE.Raycaster(); const propPointer = new THREE.Vector2();
  let pointerStart = null;
  propWorld.renderer.domElement.addEventListener("pointerdown", event => { pointerStart = [event.clientX, event.clientY]; });
  propWorld.renderer.domElement.addEventListener("pointerup", event => {
    const moved = pointerStart ? Math.hypot(event.clientX - pointerStart[0], event.clientY - pointerStart[1]) : 0;
    pointerStart = null;
    if (moved > 6) return;
    const rect = propWorld.renderer.domElement.getBoundingClientRect();
    propPointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    propRaycaster.setFromCamera(propPointer, propWorld.camera);
    const hit = propRaycaster.intersectObject(propModel, true).find(item => item.object.userData.partKey);
    if (hit) selectPartManually(hit.object.userData.partKey);
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
  window.addEventListener("atlas-language-change", refreshPropLabels);
  window.addEventListener("atlas-guided-step-change", event => applyGuidedStep(event.detail?.prop, event.detail?.step));
  window.addEventListener("atlas-guardian-fit-change", event => {
    guardianDiameter = Number(event.detail?.diameterCm || 50);
    if (currentProp === "guardian" && propModel) propModel.scale.setScalar(guardianDiameter / 50);
  });
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
