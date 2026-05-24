'use client'

import styles from './Experience.module.css'

import Image from 'next/image'

import { useState } from 'react'

const schools = [
  {
    title: 'FATEC Rio Preto',
    date: '2025 - Atualmente',
    desc:
      'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    image: '/fatec.png'
  },
  {
    title: 'Colégio Carlos Chagas Filho',
    date: '2022 - 2024',
    desc:
      'Ensino Médio',
    image: '/ccf.jpg'
  }
]

export default function Experience() {
  const [selected, setSelected] = useState(0)

  return (
    <section id="experience" className={styles.wrapper}>
      <h2 className={styles.title}>Formação</h2>

      <div className={styles.card}>
        <div className={styles.left}>
          <Image
            src={schools[selected].image}
            width={130}
            height={130}
            alt="School"
            style={{ borderRadius: "100%" }}
          />

          <div>
            <h2>{schools[selected].title}</h2>

            <span>{schools[selected].date}</span>

            <p>{schools[selected].desc}</p>
          </div>
        </div>

        <div className={styles.selector}>
          {schools.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={selected === index ? styles.active : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}