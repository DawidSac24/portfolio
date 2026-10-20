import { Link } from "react-router-dom";
import { Badge } from "../../../components/ui/Badge";
import styles from "./MyProjectsSection.module.css";
import pageStyles from "../../layouts/PageLayout.module.css";

const projects = [
  {
    name: "SmartFrame",
    subtitle: "Connected LED Matrix Display",
    date: "Sep. 2026",
    to: "/smartframe",
    description:
      "Engineered a multithreaded ESP32 application in FreeRTOS driving a 64-LED matrix to display real-time Spotify tracks, weather data, and custom animations; hosted an embedded web server for live device configuration and implemented custom memory allocators to optimize RAM.",
    skills: [
      "C",
      "ESP-IDF",
      "FreeRTOS",
      "ESP32",
      "HTTP Server",
      "Spotify API",
      "OpenWeather API",
    ],
  },
  {
    name: "Auto-Mate",
    subtitle: "Automated Chessboard",
    date: "Jun. 2025",
    to: "/automate",
    description:
      "Co-developed an automated chessboard from scratch—designing the electrical schematic and custom PCB, soldering and debugging hardware, and programming the piece-movement engine in C++. Awarded the Jury Prize for Best Final-Year Project.",
    skills: ["C++", "Arduino", "KiCad", "PCB Design", "Hardware Debugging"],
  },
  {
    name: "MBPlayer",
    subtitle: "Portable Digital Audio Player",
    date: "In Progress",
    description:
      "Developing a custom hardware digital audio player powered by an STM32 microcontroller; currently designing the multi-layer PCB and writing low-level firmware for audio decoding and peripheral control.",
    skills: ["C", "STM32", "CubeIDE", "CubeMX", "KiCad"],
  },
  {
    name: "Portfolio",
    subtitle: "3D Event-Driven Web Platform",
    date: "In Progress",
    description:
      "Developing an engine-like 3D architecture and event-handling system with custom shaders, allowing users to interactively explore showcased projects and detailed engineering breakdowns.",
    skills: ["TypeScript", "Three.js", "React", "HTML/CSS"],
  },
];

const MyProjectsSection = () => (
  <section id="projects" className={pageStyles.snapSection}>
    <div className={styles.container}>
      <h2 className={pageStyles.sectionHeading}>+-- My Projects --+</h2>
      <div className={styles.projectGrid}>
        {projects.map((project) => {
          const card = (
            <article className={styles.projectCard} key={project.name}>
              <div className={styles.projectHeading}>
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.subtitle}</p>
                </div>
                <span className={styles.projectDate}>[{project.date}]</span>
              </div>
              <p className={styles.description}>{project.description}</p>
              <div
                className={styles.skills}
                aria-label={`${project.name} skills`}
              >
                {project.skills.map((skill) => (
                  <Badge key={skill} name={skill} />
                ))}
              </div>
              {project.to && (
                <span className={styles.projectLinkHint}>
                  [OPEN PROJECT &gt;]
                </span>
              )}
            </article>
          );

          return project.to ? (
            <Link
              className={styles.projectLink}
              key={project.name}
              to={project.to}
              aria-label={`Open ${project.name} project page`}
            >
              {card}
            </Link>
          ) : (
            card
          );
        })}
      </div>
    </div>
  </section>
);

export default MyProjectsSection;
