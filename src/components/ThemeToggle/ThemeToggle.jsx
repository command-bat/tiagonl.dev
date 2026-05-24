"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { FaMoon, FaSun } from "react-icons/fa";

import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className={styles.button} />;
  }

  return (
    <button
      className={styles.button}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}
