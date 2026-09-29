# Delivery Plan

## Goal

Prove the complete path from a physical action on an ESP32 prop to a game event that Project Atlas can consume, before buying a full set of hardware.

## Phases

1. **Vertical slice:** one Hero Spell Orb Controller, Wokwi circuit, firmware, browser field simulation, and build guide.
2. **Hardware proof:** assemble one real unit and record power, input, feedback, range, heat, and disconnect results.
3. **Unity bridge:** translate the serial or network event envelope into the existing Atlas command layer.
4. **Wireless proof:** test WiFi/WebSocket first, then test ESP-NOW if direct prop to hub communication is valuable.
5. **Role variants:** Guardian shield, Archer trigger, Assassin trap, and Support heal prop.
6. **Event kit:** enclosures, charging, spare parts, pairing workflow, operator dashboard, and recovery procedures.

## Exit criteria for the vertical slice

- CAST and SPECIAL generate stable, versioned JSON events.
- LED and buzzer feedback match cooldown state.
- Wokwi automation can exercise both buttons and assert serial output.
- The browser simulator demonstrates latency and packet loss effects.
- A first time builder can follow the 32 step guide.
- The bill of materials separates required and optional items.

## Decisions held for real hardware testing

- ESP-NOW versus WiFi/WebSocket for the event venue.
- Battery capacity and charging architecture.
- Final enclosure, switches, connectors, and physical safety.
- Reliable radio range around people, costumes, props, and nearby WiFi networks.

