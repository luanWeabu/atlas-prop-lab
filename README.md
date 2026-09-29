# Atlas Prop Lab

Atlas Prop Lab is a mobile friendly design and simulation workspace for the physical ESP32 props used by Project Atlas.

The first vertical slice is a **Hero Spell Orb Controller**:

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
| `dist/` | Static mobile web lab and downloadable build pack |
| `firmware/spell-orb/` | PlatformIO firmware for ESP32 |
| `wokwi/` | Circuit diagram, simulator configuration, and scenarios |
| `docs/` | Architecture, bill of materials, event contract, and 32 step assembly guide |
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

