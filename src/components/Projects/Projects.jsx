import styles from './Projects.module.css'
import projects from '@/data/projects'

export default function Projects() {
    return (
        <section id="projects">
            <h2 className={styles.title}>Projetos</h2>

            <div className={styles.grid}>
                {projects.map((project, index) => (
                    <a
                        key={index}
                        href={project.url}
                        target="_blank"
                        className={styles.card}
                    >
                        <h3>{project.title}</h3>

                        <p>{project.description}</p>
                    </a>
                ))}
            </div>
        </section>
    )
}