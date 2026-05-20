import styles from './Contact.module.css'
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp 
} from 'react-icons/fa'

export default function Contact() {
  return (
    <section
      id="contact"
      className={styles.contact}>
      <h2>Contato</h2>

      <div className={styles.grid}>
        <a
          href="mailto:tiagolaure@gmail.com"
          className={styles.card}
        >
          <FaEnvelope />

          <span>Email</span>
        </a>

        <a
          href="https://github.com/command-bat"
          target="_blank"
          className={styles.card}
        >
          <FaGithub />

          <span>GitHub</span>
        </a>

        <a
          href="https://linkedin.com/in/tiagonlaureano"
          target="_blank"
          className={styles.card}
        >
          <FaLinkedin />

          <span>LinkedIn</span>
        </a>

        <a
          href="https://wa.me/5517997329942?text=Ola%2C%20Tiago."
          target="_blank"
          className={styles.card}
        >
          <FaWhatsapp  />

          <span>Whatsapp</span>
        </a>
      </div>
    </section>
  )
}