"use client";

import styles from "./Skills.module.css";

import {
  FaJs,
  FaNodeJs,
  FaReact,
  FaPython,
  FaGitAlt,
  FaBootstrap,
  FaPlus,
} from "react-icons/fa";

import { TbBrandOffice } from "react-icons/tb";

const skills = [
  {
    icon: <FaJs />,
    name: "JavaScript",
    filter: "JavaScript",
  },
  {
    icon: <FaNodeJs />,
    name: "Node.js",
    filter: "Node.js",
  },
  {
    icon: <FaReact />,
    name: "React",
    filter: "React",
  },
  {
    icon: <FaPython />,
    name: "Python",
    filter: "Python",
  },
  {
    icon: <FaGitAlt />,
    name: "Git/GitHub",
    filter: null,
  },
  {
    icon: <FaBootstrap />,
    name: "Bootstrap",
    filter: "Bootstrap",
  },
  {
    icon: <TbBrandOffice />,
    name: "Pacote Office",
    filter: null,
  },
  {
    icon: <FaPlus />,
    name: "Aprendendo coisas novas",
    filter: null,
  },
];

export default function Skills() {
  function handleFilter(skill) {
    if (!skill.filter) return;

window.dispatchEvent(
  new CustomEvent("filter-projects", {
    detail: {
      type: "replace",
      filters: [skill.filter],
    },
  }),
);
  }

  return (
    <section id="skills">
      <h2 className={styles.title}>Skills & Tecnologias</h2>

      <div className={styles.grid}>
        {skills.map((skill, index) => (
          <div
            className={styles.card}
            key={index}
            onClick={() => handleFilter(skill)}
          >
            {skill.icon}

            <span>{skill.name}</span>

            {/* {skill.filter && <small>filtrar projetos</small>} */}
          </div>
        ))}
      </div>
    </section>
  );
}
