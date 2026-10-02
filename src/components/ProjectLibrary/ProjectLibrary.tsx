import * as Tabs from '@radix-ui/react-tabs';
import styles from './ProjectLibrary.module.css';

export const ProjectLibrary = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>Selected Works</h2>

      <Tabs.Root defaultValue="smartframe">
        <Tabs.List className={styles.tabsList} aria-label="Project categories">
          <Tabs.Trigger className={styles.tabTrigger} value="smartframe">
            Smartframe
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tabTrigger} value="mbplayer">
            MBPlayer
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tabTrigger} value="automate">
            Automate v2
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tabTrigger} value="engine">
            3D Engine
          </Tabs.Trigger>
        </Tabs.List>

        {/* Smartframe Tab */}
        <Tabs.Content className={styles.tabContent} value="smartframe">
          <div className={styles.projectCard}>
            <div className={styles.canvasPlaceholder}>
              [ 3D Smartframe Canvas Will Go Here ]
            </div>
            <h3 className={styles.projectTitle}>Smartframe Matrix</h3>
            <p className={styles.projectDesc}>
              A 64x64 LED matrix frame that acts as a smart dashboard. It dynamically fetches and displays the time, local weather conditions, and the currently playing Spotify track.
            </p>
            <div className={styles.tagContainer}>
              <span className={styles.tag}>Embedded</span>
              <span className={styles.tag}>C++</span>
              <span className={styles.tag}>API Integration</span>
            </div>
          </div>
        </Tabs.Content>

        {/* MBPlayer Tab */}
        <Tabs.Content className={styles.tabContent} value="mbplayer">
          <div className={styles.projectCard}>
            <div className={styles.canvasPlaceholder}>
              [ 3D Gameboy DAC Canvas Will Go Here ]
            </div>
            <h3 className={styles.projectTitle}>MBPlayer (DAP)</h3>
            <p className={styles.projectDesc}>
              A digital audio player built into a Gameboy Color shell. Features modular hardware with a swappable DAC in the cartridge slot via M.2, and stationary Spotify streaming via 3.5mm jack.
            </p>
            <div className={styles.tagContainer}>
              <span className={styles.tag}>Audio Hardware</span>
              <span className={styles.tag}>PCB Design</span>
              <span className={styles.tag}>Spotify API</span>
            </div>
          </div>
        </Tabs.Content>

        {/* Automate Tab */}
        <Tabs.Content className={styles.tabContent} value="automate">
          <div className={styles.projectCard}>
             <div className={styles.canvasPlaceholder}>
              [ 3D Chessboard Canvas Will Go Here ]
            </div>
            <h3 className={styles.projectTitle}>Automate v2</h3>
            <p className={styles.projectDesc}>
              An automated, self-playing chessboard. Pieces are physically moved using a 2-axis electromagnetic gantry system hidden beneath the board. A total rewrite and hardware upgrade from my final year project.
            </p>
            <div className={styles.tagContainer}>
              <span className={styles.tag}>Robotics</span>
              <span className={styles.tag}>Electromagnetics</span>
              <span className={styles.tag}>C++</span>
            </div>
          </div>
        </Tabs.Content>

        {/* 3D Engine Tab */}
        <Tabs.Content className={styles.tabContent} value="engine">
          <div className={styles.projectCard}>
            <h3 className={styles.projectTitle}>Custom OpenGL 3D Engine</h3>
            <p className={styles.projectDesc}>
              A basic, from-scratch 3D game engine written in OpenGL. It serves as a foundational project for understanding rendering pipelines, shaders, and low-level graphics programming.
            </p>
            <div className={styles.tagContainer}>
              <span className={styles.tag}>OpenGL</span>
              <span className={styles.tag}>Graphics</span>
              <span className={styles.tag}>C++</span>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
};