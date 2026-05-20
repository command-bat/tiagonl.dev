import styles from './Skills.module.css'

import {
  FaJs,
  FaNodeJs,
  FaReact,
  FaPython,
  FaGitAlt,
  FaBootstrap,
  FaPlus
} from 'react-icons/fa'

import { TbBrandOffice } from 'react-icons/tb'

const skills = [
  {
    icon: <FaJs />,
    name: 'JavaScript'
  },
  {
    icon: <FaNodeJs />,
    name: 'Node.js'
  },
  {
    icon: <FaReact />,
    name: 'React'
  },
  {
    icon: <FaPython />,
    name: 'Python'
  },
  {
    icon: <FaGitAlt />,
    name: 'Git/GitHub'
  },
  {
    icon: <FaBootstrap />,
    name: 'Bootstrap'
  },
  {
    icon: <TbBrandOffice />,
    name: 'Pacote Office'
  },
  {
    icon: <FaPlus />,
    name: 'Aprendendo coisas novas'
  }
]

export default function Skills() {
  return (
    <section id="skills">
      <h2 className={styles.title}>
        Skills & Tecnologias
      </h2>

      <div className={styles.grid}>
        {skills.map((skill, index) => (
          <div
            className={styles.card}
            key={index}
          >
            {skill.icon}

            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}