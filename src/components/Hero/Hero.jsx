'use client'

import styles from './Hero.module.css'

import {
  useEffect,
  useState
} from 'react'

import { motion } from 'framer-motion'

const words = [
  '     Nascimento',
  '     Laureano'
]

export default function Hero() {
  const [wordIndex, setWordIndex] =
    useState(0)

  const [displayed, setDisplayed] =
    useState('')

  const [isDeleting, setIsDeleting] =
    useState(false)

  const [isMobile, setIsMobile] =
    useState(false)

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 900)
    }

    check()

    window.addEventListener(
      'resize',
      check
    )

    return () =>
      window.removeEventListener(
        'resize',
        check
      )
  }, [])

  useEffect(() => {
    if (isMobile) return

    const current = words[wordIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(
          current.substring(
            0,
            displayed.length + 1
          )
        )

        if (displayed === current) {
          setTimeout(() => {
            setIsDeleting(true)
          }, 1200)
        }
      } else {
        setDisplayed(
          current.substring(
            0,
            displayed.length - 1
          )
        )

        if (displayed === '') {
          setIsDeleting(false)

          setWordIndex((prev) =>
            prev === words.length - 1
              ? 0
              : prev + 1
          )
        }
      }
    }, isDeleting ? 60 : 120)

    return () => clearTimeout(timeout)
  }, [
    displayed,
    isDeleting,
    wordIndex,
    isMobile
  ])

  return (
    <section className={styles.hero}>
      <motion.div
        initial={{
          opacity: 0,
          y: 40
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        style={{overflow: "hidden"}}
      >
        <span className={styles.badge}>
          Full Stack Developer
        </span>

        <h1>
          Tiago 

          <br />

          <span>
            {isMobile
              ? 'NL'
              : displayed}

            {!isMobile && <b>|</b>}
          </span>
        </h1>

        <p>
          Desenvolvendo sistemas modernos,
          experiências interativas e
          aplicações realtime.
        </p>

        <div className={styles.buttons}>
          <a href="#projects" style={{ color: "white" }}>
            Ver Projetos
          </a>

          <a
            href="https://cv.tiagonl.dev.br"
            target="_blank"
            className={styles.cv}
          >
            Currículo
          </a>
        </div>
      </motion.div>
    </section>
  )
}