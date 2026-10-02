(function () {
  const manifests = {
    guardian: {
      revision: "0.1", status: "reference", dimensionsMm: { width: 500, height: 500, depth: 55 },
      assets: [
        { id: "face-template", href: "downloads/guardian-template-500mm.svg" },
        { id: "rear-layout", href: "downloads/guardian-rear-layout.svg" }
      ],
      modules: [
        { callout: 1, id: "shield-face", modelKey: "shell" },
        { callout: 2, id: "esp32-service-box", modelKey: "core" },
        { callout: 3, id: "imu-centre", modelKey: "sensor" },
        { callout: 4, id: "thumb-trigger", modelKey: "control" },
        { callout: 5, id: "led-rim", modelKey: "light" },
        { callout: 6, id: "arm-straps", modelKey: "wearable" }
      ],
      procurement: [
        { id: "double-wall-cardboard", gate: "fit", state: "reference", priceVnd: [20000, 60000] },
        { id: "paper-tape-marker", gate: "fit", state: "reference", priceVnd: [30000, 80000] },
        { id: "nylon-webbing-25mm", gate: "fit", state: "reference", priceVnd: [20000, 50000] },
        { id: "adjustable-buckles-25mm", gate: "fit", state: "reference", priceVnd: [10000, 40000] },
        { id: "eva-offcut", gate: "fit", state: "reference", priceVnd: [0, 50000] },
        { id: "mke-k01-esp32-s3", gate: "after-fit", state: "reference", priceVnd: [255000, 255000], checkedAt: "2026-10-02", supplier: "Hshop", supplierUrl: "https://hshop.vn/mach-phat-trien-mke-k01-esp32-s3-dev-kit" },
        { id: "gy-521-mpu6050", gate: "after-fit", state: "reference", priceVnd: [85000, 85000], checkedAt: "2026-10-02", supplier: "Hshop", supplierUrl: "https://hshop.vn/cam-bien-6-dof-bac-tu-do-gy-521-mpu6050" },
        { id: "pbs-11b-12mm", gate: "after-fit", state: "reference", priceVnd: [10000, 10000], checkedAt: "2026-10-02", supplier: "Hshop", supplierUrl: "https://hshop.vn/nut-nhan-nha-tron-pbs-11b-12mm-kem-cap" },
        { id: "ws2812b-strip-1m", gate: "after-fit", state: "reference", priceVnd: [60000, 180000] },
        { id: "wire-connectors", gate: "after-fit", state: "reference", priceVnd: [50000, 150000] }
      ],
      assemblyCallouts: [[1], [2, 3, 4, 5], [1], [3], [4], [5], [2, 6], [1, 2, 3, 4, 5, 6]]
    },
    warrior: {
      revision: "0.1", status: "reference", dimensionsMm: { width: 110, height: 650, depth: 45 },
      modules: [
        { callout: 1, id: "eva-blade", modelKey: "shell" },
        { callout: 2, id: "led-spine", modelKey: "light" },
        { callout: 3, id: "guard-imu", modelKey: "sensor" },
        { callout: 4, id: "index-trigger", modelKey: "control" },
        { callout: 5, id: "esp32-hilt", modelKey: "core" },
        { callout: 6, id: "wrist-loop", modelKey: "wearable" }
      ],
      assemblyCallouts: [[1, 6], [3, 4, 5], [1], [2], [3], [4, 5], [6], [1, 2, 3, 4, 5, 6]]
    },
    archer: {
      revision: "0.2", status: "reference", dimensionsMm: { width: 430, height: 900, depth: 60 },
      assets: [
        { id: "bow-template", href: "downloads/arc-bow-template-900mm.svg" },
        { id: "riser-layout", href: "downloads/arc-bow-riser-layout.svg" }
      ],
      modules: [
        { callout: 1, id: "recurve-limbs", modelKey: "shell" },
        { callout: 2, id: "cosmetic-cord", modelKey: "wearable" },
        { callout: 3, id: "draw-magnet", modelKey: "control" },
        { callout: 4, id: "hall-sensor", modelKey: "sensor" },
        { callout: 5, id: "esp32-riser", modelKey: "core" },
        { callout: 6, id: "limb-led", modelKey: "light" }
      ],
      assemblyCallouts: [[1, 2], [3, 4, 5], [2], [3, 4], [5], [1, 6], [3, 4], [1, 2, 3, 4, 5, 6]]
    },
    assassin: {
      revision: "0.1", status: "reference", dimensionsMm: { width: 75, height: 320, depth: 40 },
      modules: [
        { callout: 1, id: "active-dagger", modelKey: "shell" },
        { callout: 2, id: "passive-dagger", modelKey: "shell" },
        { callout: 3, id: "active-imu", modelKey: "sensor" },
        { callout: 4, id: "grip-trigger", modelKey: "control" },
        { callout: 5, id: "esp32-active-hilt", modelKey: "core" },
        { callout: 6, id: "wrist-trap-pad", modelKey: "wearable" }
      ],
      assemblyCallouts: [[1, 2], [3, 4, 5, 6], [1, 2], [3], [4, 5], [2], [6], [1, 2, 3, 4, 5, 6]]
    },
    mage: {
      revision: "0.1", status: "reference", dimensionsMm: { width: 140, height: 1100, depth: 140 },
      modules: [
        { callout: 1, id: "diffused-orb", modelKey: "light" },
        { callout: 2, id: "padded-head", modelKey: "shell" },
        { callout: 3, id: "cast-button", modelKey: "control" },
        { callout: 4, id: "grip-imu", modelKey: "sensor" },
        { callout: 5, id: "esp32-lower-grip", modelKey: "core" },
        { callout: 6, id: "padded-end", modelKey: "wearable" }
      ],
      assemblyCallouts: [[1, 2, 6], [1, 3, 4, 5], [2, 6], [1], [4], [5], [3, 4], [1, 2, 3, 4, 5, 6]]
    },
    boss: {
      revision: "0.1", status: "reference", dimensionsMm: { width: 360, height: 1150, depth: 180 },
      modules: [
        { callout: 1, id: "hollow-hammer-head", modelKey: "shell" },
        { callout: 2, id: "head-led", modelKey: "light" },
        { callout: 3, id: "primary-trigger", modelKey: "control" },
        { callout: 4, id: "balance-imu", modelKey: "sensor" },
        { callout: 5, id: "esp32-lower-grip", modelKey: "core" },
        { callout: 6, id: "three-zone-armour", modelKey: "wearable" }
      ],
      assemblyCallouts: [[1], [2, 3, 4, 5], [1], [4, 5], [6], [2, 5, 6], [3, 4], [1, 2, 3, 4, 5, 6]]
    }
  };

  Object.freeze(manifests);
  window.ATLAS_PROP_MANIFESTS = manifests;
})();
