import styles from "./Timeline.module.css";

const items = [
  {
    year: "2021",
    text: "HTML e CSS",
  },
  {
    year: "2022",
    text: "JavaScript",
  },
  {
    year: "2023",
    text: "Node.js e APIs",
  },
  {
    year: "2024",
    text: "Firebase e sistemas web",
  },
  {
    year: "2025",
    text: "React, Next.js e projetos multiplayer",
  },
];

export default function Timeline() {
  return (
    <section className={styles.timeline}>
      <h2>Minha Jornada</h2>

      <div className={styles.container}>
        {items.map((item, index) => (
          <div className={styles.card} key={index}>
            <span>{item.year}</span>

            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
