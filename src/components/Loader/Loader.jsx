'use client'

import styles from './Loader.module.css'
import { useEffect, useState } from 'react'

export default function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className={styles.loader}>
      <h1>tiagonl.dev.br</h1>
    </div>
  )
}