import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div>
        <h2>Sobre Mim</h2>

        <p>
          Tecnólogo em Análise e Desenvolvimento de Sistemas
          pela FATEC Rio Preto.
        </p>

        <p>
          Focado em desenvolvimento web moderno,
          automações, interfaces interativas,
          APIs e aplicações em tempo real.
        </p>

        <p>
          Experiência com Node.js, JavaScript,
          Firebase, React e integração de APIs.
        </p>
      </div>
    </section>
  )
}