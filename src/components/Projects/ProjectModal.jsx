"use client";

import styles from "./ProjectModal.module.css";

import { FaGithub, FaGlobe, FaTimes, FaStar } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

export default function ProjectModal({ project, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          <FaTimes />
        </button>

        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className={styles.image}
          />
        )}

        <div className={styles.content}>
          <div className={styles.top}>
            <h2>{project.title}</h2>

            {project.stars > 0 && (
              <div className={styles.stars}>
                <FaStar />

                <span>{project.stars}</span>
              </div>
            )}
          </div>


            {console.log(project.readme)}

            {typeof project.readme === "string" && project.readme.trim() ? (
              <div className={styles.readme}>
                <ReactMarkdown>{project.readme}</ReactMarkdown>
              </div>
            ) : (
              <p>{project.fullDescription}</p>
            )}


          <div className={styles.tags}>
            {project.tags?.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className={styles.buttons}>
            {project.site && (
              <a href={project.site} target="_blank">
                <FaGlobe />
                Ver Site
              </a>
            )}

            {project.github && (
              <a href={project.github} target="_blank">
                <FaGithub />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
