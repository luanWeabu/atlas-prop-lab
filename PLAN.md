# Delivery Plan

## Goal

Prove the complete path from a physical action on an ESP32 prop to a game event that Project Atlas can consume, before buying a full set of hardware.

## Phases

1. **Vertical slice:** one Hero Spell Orb Controller, Wokwi circuit, firmware, browser field simulation, and build guide.
2. **Hardware proof:** assemble one real unit and record power, input, feedback, range, heat, and disconnect results.
3. **Unity bridge:** translate the serial or network event envelope into the existing Atlas command layer.
4. **Wireless proof:** test WiFi/WebSocket first, then test ESP-NOW if direct prop to hub communication is valuable.
5. **Role design packs:** Guardian shield, Warrior sword, Archer bow, Assassin daggers, Mage staff, and Titan Warden boss hammer/armour.
6. **Role hardware proofs:** build and verify each prop from the shared USB-first electronics contract.
7. **Event kit:** enclosures, charging, spare parts, pairing workflow, operator dashboard, and recovery procedures.

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
- A Vietnamese or English reader can inspect every role and follow its eight-step drawing-linked assembly workflow.
- The bill of materials separates required and optional items.

## Decisions held for real hardware testing

- ESP-NOW versus WiFi/WebSocket for the event venue.
- Battery capacity and charging architecture.
- Final enclosure, switches, connectors, and physical safety.
- Reliable radio range around people, costumes, props, and nearby WiFi networks.
