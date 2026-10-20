# MBPlayer

MBPlayer is an ongoing personal project to build a portable digital audio player with a modular, replaceable DAC. The firmware is being developed on an STM32 NUCLEO-H723ZG evaluation board while the hardware is explored in stages.

> **Project status:** This is an ongoing project. I am currently working on the electrical schematics and PCB design. The hardware architecture and component choices are still subject to change.

## Project goals

The intended player has a main board with a microcontroller, microSD storage, USB-C, power and battery management, and an audio output. A modular version would connect a DAC daughterboard through an M.2 connector, allowing different DAC modules to be tried without redesigning the whole player.

Possible product variants include a single-board version, a closed case with an internal replaceable DAC module, and an open version with externally accessible modules. These are design possibilities, not completed products.

### DAC exploration

- **PCM5102A** is the DAC breakout currently used for audio-output experiments. It receives audio over I2S.
- **PCM5242** and **WM8960** are candidates being considered for future modules. The WM8960 could also support audio input.
- The planned module interface may include I2S, optional I2C configuration, reset and module-identification signals, power, and analog audio return. The connector pinout and electrical design are not final.

## Current development

The firmware project targets the STM32H723ZG and is configured with STM32CubeMX/STM32CubeIDE. Current code and experiments provide a foundation for:

- STM32 HAL and board peripheral initialization.
- I2S audio output and DMA for the PCM5102A breakout.
- microSD access through SDMMC and FatFs. The breadboard prototype uses a one-bit bus with DMA; four-bit operation has not yet been validated with the prototype wiring.
- Firmware support modules for logging, memory allocators, and allocator-backed containers.

The breadboard prototype reads audio from the SD card and outputs it over I2S to the PCM5102A at the same time. This validates the playback path, but it is not yet a complete portable music player. The SD-card detect function is currently a stub rather than a GPIO-backed implementation.

Breadboard wiring picks up interference and degrades audio quality. To get reliable SD-card operation with the prototype wiring, the SD interface currently uses a one-bit bus rather than four-bit mode. Four-bit operation and improved audio quality still need to be validated on a properly routed PCB.

## Firmware layout

- `Core/` — application code, shared utilities, peripheral initialization, and startup code.
- `Drivers/` — STM32 HAL, CMSIS, and NUCLEO board support.
- `FATFS/` and `Middlewares/Third_Party/` — FatFs integration and middleware.
- `MBPlayer.ioc` — STM32CubeMX configuration for the MCU and peripherals.
- `STM32H723ZGTX_FLASH.ld` and `STM32H723ZGTX_RAM.ld` — linker memory layouts.
- `Docs/` — project planning, component research, hardware notes, datasheets, and reference material.

## Build

Build with **STM32CubeIDE** and its ARM GNU toolchain:

1. Import the repository as an existing STM32CubeIDE project, or open `MBPlayer.ioc`.
2. Select the `Debug` configuration and build the project.
3. Flash and debug on compatible hardware using the STM32CubeIDE launch configuration.

The project is configured for STM32H723ZGTx / NUCLEO-H723ZG. No standalone test suite or automated hardware test runner is currently included; audio and storage behavior require the relevant board, breakout hardware, and peripherals.

## Project notes

Design and bring-up details are recorded in `Docs/Project_Log/`:

- `00_Project_Planning/Project Overview - 27.06.2026.md` — player concept and possible product variants.
- `01_DAC_tests/` — PCM5102A and microcontroller connection experiments.
- `02_MicroSD_card_implementation/` — SD-card component selection and SDMMC/FatFs bring-up.
- `03_PCB&Model_design/` — component research for the planned board and enclosure.
- `Docs/Reference/` — datasheets, schematics, and other hardware references.

The project log and component notes may describe experiments or proposals that are not reflected in the current firmware or finalized hardware.
