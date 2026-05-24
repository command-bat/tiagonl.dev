'use client'

import styles from './Terminal.module.css'

import {
  useEffect,
  useRef,
  useState
} from 'react'

import {
  FaTerminal,
} from 'react-icons/fa'

export default function Terminal() {
  const [open, setOpen] =
    useState(false)

  const [history, setHistory] =
    useState([
      {
        type: 'text',
        content:
          'Digite "help" para começar.'
      }
    ])

  const [input, setInput] =
    useState('')

  const inputRef = useRef()

  const bodyRef = useRef()

  useEffect(() => {
    window.addEventListener(
      'open-terminal',
      () => setOpen(true)
    )
  }, [])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop =
        bodyRef.current.scrollHeight
    }
  }, [history])

  function renderContent(content) {
    const urlRegex =
      /(https?:\/\/[^\s]+)/g

    const parts =
      content.split(urlRegex)

    return parts.map(
      (part, index) => {
        if (
          part.match(urlRegex)
        ) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noreferrer"
              title="ctrl + click"
              onClick={(e) => {
                if (!e.ctrlKey) {
                  e.preventDefault()
                }
              }}
            >
              {part}
            </a>
          )
        }

        return part
      }
    )
  }

  function handleCommand(cmd) {
    const commands = {
      help: `
ABOUT         Exibe informacoes sobre mim
SKILLS        Exibe as skills que eu domino
CONTACT       Exibe as informacoes de contato
SOCIAL        Exibe as minhas rede sociais
CURRICULUM    Exibe meu curriculo
CLEAR         Limpa a tela
      `,

      "?": `
ABOUT         Exibe informacoes sobre mim
SKILLS        Exibe as skills que eu domino
CONTACT       Exibe as informacoes de contato
SOCIAL        Exibe as minhas rede sociais
CURRICULUM    Exibe meu curriculo
CLEAR         Limpa a tela
      `,

      about: `
Desenvolvedor Full Stack focado em:
Node.js
Next.js
Realtime Apps
Automações
Integração de APIs
      `,

      skills: `
JavaScript
Node.js
React
Firebase
Python
Git/GitHub
      `,

      contact: `
Email:
tiagolaure@gmail.com
      `,

      social: `
GitHub:
https://github.com/command-bat

LinkedIn:
https://linkedin.com/in/tiagonlaureano
      `,

      curriculo: `
https://cv.tiagonl.dev.br
      `,

      curriculum: `
https://cv.tiagonl.dev.br
      `,
    };

    if ((cmd === 'clear') || (cmd === 'cls')) {
      setHistory([
        {
          type: 'text',
          content:
            'Digite "help" para começar.'
        }
      ])

      return
    }

    
    if (cmd === 'close') {
      setHistory([
        {
          type: 'text',
          content:
            'Digite "help" para começar.'
        }
      ])
                setOpen(false)
      return
    }



    setHistory((prev) => [
      ...prev,

      {
        type: 'command',
        content: `$ ${cmd}`
      },

      {
        type: 'text',
        content:
          commands[cmd] ||
          'Comando não encontrado.'
      }
    ])
  }

  function submit(e) {
    e.preventDefault()

    if (!input.trim()) return

handleCommand(input.toLowerCase());

    setInput('')
  }

  return (
    <>
      <button
        className={styles.floating}
        onClick={() =>
          setOpen(!open)
        }
      >
        {< FaTerminal/>}
      </button>

      <div
        className={`${styles.chat} ${
          open ? styles.open : ''
        }`}
      >
        <div className={styles.header}>
          <div className={styles.dots}>
            <button
              className={styles.red}
              onClick={() =>
                setOpen(false)
              }
            />

            <button
              className={styles.yellow}
              onClick={() =>
                setHistory([
                  {
                    type: 'text',
                    content:
                      'Digite "help" para começar.'
                  }
                ])
              }
            />

            <button
              className={styles.green}
              onClick={() =>
                inputRef.current?.focus()
              }
            />
          </div>

          <span>
            terminal@tiagonl
          </span>
        </div>

        <div
          className={styles.body}
          ref={bodyRef}
        >
          {history.map(
            (item, index) => (
              <pre
                key={index}
                className={
                  item.type ===
                  'command'
                    ? styles.command
                    : ''
                }
              >
                {renderContent(
                  item.content
                )}
              </pre>
            )
          )}

          <form onSubmit={submit}>
            <span>$</span>

            <input
              ref={inputRef}
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </>
  )
}