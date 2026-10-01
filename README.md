# Atlas Prop Lab

Atlas Prop Lab is a mobile friendly design and simulation workspace for the physical ESP32 props used by Project Atlas.

Revision 0.4 adds the target **Atlas Event Kit v1** visual guided build planner:

- five selectable hero builds: Guardian shield, Warrior sword, Archer bow, Assassin daggers, and Mage staff
- one Titan Warden boss build with a two-handed foam hammer and three-zone LED armour
- Vietnamese and English UI with a remembered language choice
- numbered concept drawings, sensor and core placement, role BOMs, supplier reference links, and ordered assembly paths
- an eight-step guided assembly mode for every role, with drawing highlights, required parts, expected result, PASS gate, and saved per-role progress
- three technical images per step: whole-prop location, numbered close-up, and expected post-step state
- downloadable Markdown build packs for every role
- an explicit evidence boundary between design-ready work and physical field verification

The executable electronics vertical slice remains a **Hero Spell Orb Controller**:

- ESP32 DevKit V1
- CAST and SPECIAL buttons
- 16 pixel WS2812B LED ring
- passive buzzer feedback
- serial JSON event contract ready for a Unity bridge
- Wokwi circuit files and automated scenarios
- a browser field simulator for latency, packet loss, cooldowns, damage, and support healing

## Repository map

| Path | Purpose |
| --- | --- |
| `dist/` | Bilingual static mobile web lab and downloadable build packs |
| `firmware/spell-orb/` | PlatformIO firmware for ESP32 |
| `wokwi/` | Circuit diagram, simulator configuration, and scenarios |
| `docs/` | Architecture, bill of materials, event contract, and 32 step assembly guide |
| `docs/event-kit-v1.md` | Full event-kit target, role roster, Boss contract, and verification gates |
| `docs/role-build-contract.md` | Required output contract for every role-specific build pack |
| `scripts/validate-project.mjs` | Fast repository consistency checks |
| `.github/workflows/` | Firmware build, web validation, and optional Wokwi CI |

## Quick checks

```bash
node scripts/validate-project.mjs
```

To compile firmware with PlatformIO:

```bash
cd firmware/spell-orb
pio run
```

To run the Wokwi simulation from the repository root:

```bash
wokwi-cli . --scenario wokwi/scenarios/cast-and-special.yaml
```

Wokwi CI requires a repository secret named `WOKWI_CLI_TOKEN`.
