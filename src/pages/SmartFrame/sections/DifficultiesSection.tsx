import styles from "../../layouts/PageLayout.module.css";
import { ProblemSolutionCard } from "../../../components/ui/Problem-SolutionCard";

export const DifficultiesSection = () => (
  <section id="difficulties" className={styles.scrollSection}>
    <div className={styles.textContent}>
      <h2 className={styles.sectionHeading}>
        +-- Encountered Difficulties --+
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          marginTop: "1rem",
        }}
      >
        <ProblemSolutionCard
          problemTitle="VRAM Heap Fragmentation"
          problemDesc="Parsing large JSON payloads from the Spotify API while simultaneously allocating memory to decode JPEG album art frequently exhausted the ESP32's contiguous free heap."
          solutionDesc="Engineered custom memory allocators utilizing C-based inheritance patterns. This allowed data structures to dynamically manage SRAM efficiently during heavy decoding phases."
        />

        <ProblemSolutionCard
          problemTitle="Spotify Authentication"
          problemDesc="The Spotify authentication process involves a significant number of steps and edge cases, heavily increasing the overall API complexity."
          solutionDesc="Designed a Spotify authentication state machine that abstracts the complexity into a simple 'is authenticated' check. I also built a `spotify_manager` to handle the authentication flow, client, storage, and state, creating a clean abstraction layer for the main Spotify FreeRTOS task."
        />

        {/* <ProblemSolutionCard
          problemTitle="DMA Starvation"
          problemDesc="Heavy Wi-Fi interrupts occasionally stalled the parallel DMA pushing data to the HUB75 matrix, resulting in aggressive screen flickering."
          solutionDesc="Strictly separated task priorities and core-affinities. Wi-Fi and HTTP polling were locked to Core 0, while the display rendering and DMA interrupts were isolated entirely on Core 1."
        /> */}
      </div>
    </div>
  </section>
);
