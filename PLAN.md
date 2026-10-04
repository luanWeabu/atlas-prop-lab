# Delivery Plan

## Goal

Prove the complete path from a physical action on an ESP32 prop to a game event that Project Atlas can consume, before buying a full set of hardware.

## Phases

1. **Affordable feedback proof:** validate `CHARGE → FIRE → HIT` with bow LEDs, Unity screen feedback, sound, and three-zone Boss armour without a projector or camera.
2. **Role digital-twin lab:** six synchronized, silhouette-correct 3D prop profiles with PBR detail, exploded assembly layers, GPIO diagrams, event tests, Wokwi proxy, firmware baseline, browser arena replay, and build guide.
3. **Guardian production readiness:** fit-derived cardboard dimensions, five physical layers, staged purchases, 3D step synchronization, and evidence-gated release before final material spend.
4. **Hardware proof:** assemble one real unit and record power, input, feedback, range, heat, and disconnect results.
5. **Unity bridge:** translate the serial or network event envelope into the existing Atlas command layer.
6. **Wireless proof:** test WiFi/WebSocket first, then test ESP-NOW if direct prop to hub communication is valuable.
7. **Role design packs:** Guardian shield, Warrior sword, Archer bow, Assassin daggers, Mage staff, and Titan Warden boss hammer/armour. Completed at concept and wiring-contract level; physical proof remains.
8. **Role hardware proofs:** build and verify each prop from the shared USB-first electronics contract.
9. **Event kit:** enclosures, charging, spare parts, pairing workflow, operator dashboard, and recovery procedures.

## Event Kit v1 target

- Roster: five available Hero kits, with any four loaded into a match, plus one Boss kit.
- MVP topology: one player core per active player plus one arena hub.
- Target arena: 6 × 8 m minimum play zone; 8 × 8 m preferred.
- Match target: 5–7 minutes.
- Safety boundary: no projectile and no physical strike; Unity remains authoritative.
- Build evidence: concept drawing, dimensions, BOM, supplier references, wiring, firmware profile, three-view guided assembly with PASS gates, simulator profile, and field QA.

## Exit criteria for the vertical slice

- CAST and SPECIAL generate stable, versioned JSON events.
- LED and buzzer feedback match cooldown state.
- Wokwi automation can exercise both buttons and assert serial output.
- The browser simulator demonstrates latency and packet loss effects.
- A first time builder can follow the 32 step guide.
- Selecting a role on Page 1 loads its exact parts, GPIO contract, and event names on Page 2.
- The browser can inspect every role as a lightweight 3D digital twin and replay the same field event envelope without becoming a second game engine.
- A Vietnamese or English reader can inspect every role and follow its eight-step drawing-linked assembly workflow.
- The bill of materials separates required and optional items.
- A first-time visitor can simulate draw, release, Unity validation, and one-zone Boss armour feedback without assuming a projector or camera.
- The planner clearly blocks stage-equipment spending until the physical feedback loop passes a real playtest.

## Decisions held for real hardware testing

- ESP-NOW versus WiFi/WebSocket for the event venue.
- Battery capacity and charging architecture.
- Final enclosure, switches, connectors, and physical safety.
- Reliable radio range around people, costumes, props, and nearby WiFi networks.
