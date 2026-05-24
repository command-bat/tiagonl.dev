"use client";
import { useEffect, useState } from 'react'

import styles from "./Loader.module.css";

export default function Loader({ loading }) {
  
  const [isloading, setIsLoading] = useState(true)

    useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
    }, [])
  
  if (!isloading && !loading) return null;


  return (
    <div className={styles.loader}>
      <h1>tiagonl.dev.br</h1>
    </div>
  );
}