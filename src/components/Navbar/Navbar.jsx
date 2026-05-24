"use client";

import styles from "./Navbar.module.css";

import Image from "next/image";

import { useState } from "react";

import ThemeToggle from "../ThemeToggle/ThemeToggle";

import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ hasProjects }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <Image
          src="/icon_tiagonl.png"
          width={42}
          height={42}
          alt="Logo"
          style={{ borderRadius: "16px" }}
        />

        <span>tiagonl.dev.br</span>
      </div>

      <nav className={open ? styles.open : ""}>
        <a href="#about">Sobre</a>
        <a href="#skills">Skills</a>
        {hasProjects && (
        <a href="#projects">Projetos</a>
        )}
        <a href="#experience">Formação</a>
        <a href="#contact">Contato</a>
        <div className={styles.mobileSocials}>
          <a href="https://github.com/command-bat" target="_blank">
            <FaGithub />
          </a>

          <a href="https://linkedin.com/tiagonlaureano" target="_blank">
            <FaLinkedin />
          </a>
        </div>
      </nav>

      <div className={styles.actions}>
        <a href="https://github.com/command-bat" target="_blank">
          <FaGithub />
        </a>

        <a href="https://linkedin.com/in/tiagonlaureano" target="_blank">
          <FaLinkedin />
        </a>

        <ThemeToggle />

        <button className={styles.mobileButton} onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}