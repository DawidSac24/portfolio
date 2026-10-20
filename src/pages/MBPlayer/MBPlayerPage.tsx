import { useEffect } from "react";
import { SkillBadges } from "../../components/ui/SkillBadges";
import { useNav } from "../../components/Navigation/nav.context";
import { StickyScroller } from "../layouts/StickyScroller";
import styles from "./MBPlayerPage.module.css";
import pageStyles from "../layouts/PageLayout.module.css";

const skills = [
  "C",
  "STM32H723ZG",
  "STM32 HAL",
  "I2S",
  "DMA",
  "SDMMC",
  "FatFs",
  "PCM5102A",
  "STM32CubeIDE",
  "STM32CubeMX",
  "KiCad",
];

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className={pageStyles.scrollSection}>
    <div className={`${pageStyles.textContent} ${styles.sectionContent}`}>
      <h2 className={pageStyles.sectionHeading}>{title}</h2>
      {children}
    </div>
  </section>
);

const MBPlayerPage = () => {
  const { setNavItems } = useNav();

  useEffect(() => {
    setNavItems([
      { id: "overview", label: "Overview" },
      { id: "architecture", label: "System Architecture" },
      { id: "firmware", label: "Firmware" },
      { id: "challenges", label: "Prototype Challenges" },
      { id: "roadmap", label: "Next Steps" },
      { id: "annexes", label: "Source & Notes" },
    ]);

    return () => setNavItems([]);
  }, [setNavItems]);

  return (
    <StickyScroller
      stickySide="left"
      stickyContent={
        <aside className={styles.projectStatus}>
          <span className={styles.statusLabel}>[ PROJECT STATUS ]</span>
          <strong>WORK IN PROGRESS</strong>
          <p>
            Firmware bring-up is running on an STM32 NUCLEO-H723ZG with
            breadboard-connected audio and storage hardware.
          </p>
          <span className={styles.statusFootnote}>
            No finished portable device or custom PCB yet.
          </span>
        </aside>
      }
    >
      <Section id="overview" title="+-- MBPlayer --+">
        <p className={pageStyles.bioText}>
          MBPlayer is an ongoing project to build a portable digital audio
          player with a modular, replaceable DAC. I am developing and testing
          the firmware on an STM32 NUCLEO-H723ZG evaluation board while
          exploring the hardware in stages.
        </p>
        <p className={pageStyles.bioText}>
          The current breadboard prototype can read audio data from a microSD
          card and play it through I2S at the same time. This is a working
          firmware milestone, not yet a finished portable player.
        </p>
        <SkillBadges skills={skills} />
      </Section>

      <Section id="architecture" title="+-- System Architecture --+">
        <div className={styles.architecture}>
          <div className={styles.architectureNode}>
            <strong>microSD card</strong>
            <span>Audio files</span>
          </div>
          <span className={styles.connection}>SDMMC · 1-bit</span>
          <div className={styles.architectureNode}>
            <strong>STM32H723ZG</strong>
            <span>FatFs · firmware · DMA</span>
          </div>
          <span className={styles.connection}>I2S</span>
          <div className={styles.architectureNode}>
            <strong>PCM5102A</strong>
            <span>DAC breakout · audio output</span>
          </div>
        </div>
        <p className={pageStyles.bioText}>
          The MCU reads audio from the card through SDMMC and streams it to the
          PCM5102A over I2S. The prototype uses FatFs for filesystem access and
          DMA-based peripheral transfers.
        </p>
        <p className={pageStyles.bioText}>
          A replaceable DAC daughterboard is a design goal. An M.2 connector is
          being explored for the module interface, but its pinout and electrical
          design are not final.
        </p>
        <div className={styles.detailCard}>
          <h3>DAC options under exploration</h3>
          <p className={pageStyles.bioText}>
            The PCM5102A breakout is used for current audio-output testing.
            PCM5242 and WM8960 are candidates for future modules; the WM8960
            could also provide audio input. No final module or connector design
            has been selected.
          </p>
        </div>
      </Section>

      <Section id="firmware" title="+-- Firmware & Bring-up --+">
        <p className={pageStyles.bioText}>
          Firmware is configured with STM32CubeMX and developed in
          STM32CubeIDE using the STM32 HAL. Current work covers peripheral
          initialization, I2S audio output, SDMMC access, and FatFs integration.
        </p>
        <div className={styles.detailCard}>
          <h3>Verified together on the breadboard</h3>
          <p className={pageStyles.bioText}>
            Audio is read from the SD card and output through the I2S-connected
            DAC at the same time. The current limitation is the physical
            prototype wiring and its effect on signal quality—not that the two
            firmware paths are disconnected.
          </p>
        </div>
        <p className={pageStyles.bioText}>
          Logging, memory allocation helpers, and allocator-backed containers
          are also part of the firmware foundation.
        </p>
      </Section>

      <Section id="challenges" title="+-- Prototype Challenges --+">
        <div className={styles.detailCard}>
          <h3>SD bus wiring and audio quality</h3>
          <p className={pageStyles.bioText}>
            On the breadboard, longer jumper wires pick up interference and
            behave like antennas. To get reliable SD-card operation, I had to
            use the one-bit SD bus instead of four-bit mode. The breadboard
            setup also produces noticeably worse audio quality than intended.
          </p>
        </div>
        <p className={pageStyles.bioText}>
          The current setup is useful for validating the firmware flow, but it
          is not representative of the final board layout. The schematics and
          PCB design are still in progress; four-bit operation and improved
          audio quality remain to be validated on better hardware.
        </p>
      </Section>

      <Section id="roadmap" title="+-- Next Steps --+">
        <ul className={styles.roadmap}>
          <li>Complete the electrical schematics and custom PCB design.</li>
          <li>Move the SD and I2S paths from long jumper wires to a PCB.</li>
          <li>Validate SDMMC four-bit mode and reassess audio quality.</li>
          <li>Develop the player firmware beyond the current bring-up flow.</li>
          <li>
            Finalize the modular DAC interface and evaluate candidate modules.
          </li>
          <li>Integrate power and battery management into the portable design.</li>
        </ul>
        <p className={pageStyles.bioText}>
          These are active design goals, not completed features. Component
          choices and the module connector may change as the design develops.
        </p>
      </Section>

      <Section id="annexes" title="+-- Source & Project Notes --+">
        <p className={pageStyles.bioText}>
          Firmware, STM32CubeMX configuration, project planning, component
          research, and bring-up notes are maintained in the project
          repository.
        </p>
        <a
          className={styles.repositoryLink}
          href="https://github.com/DawidSac24/MBPlayer"
          target="_blank"
          rel="noreferrer"
        >
          {">"} View MBPlayer repository
        </a>
        <p className={styles.disclaimer}>
          Project notes may include experiments and proposals that are not yet
          reflected in the firmware or finalized hardware.
        </p>
      </Section>
    </StickyScroller>
  );
};

export default MBPlayerPage;
