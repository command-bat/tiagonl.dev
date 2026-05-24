'use client'

import { useState } from 'react'

import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Skills from '@/components/Skills/Skills'
import Projects from '@/components/Projects/Projects'
import Experience from '@/components/Experience/Experience'
import Terminal from '@/components/Terminal/Terminal'
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer/Footer'
import Background from '@/components/Background/Background'
import CursorGlow from '@/components/CursorGlow/CursorGlow'
import Loader from '@/components/Loader/Loader'

export default function Home() {
  const [loading, setLoading] =
    useState(true)

  const [hasProjects, setHasProjects] =
    useState(false)

  return (
    <>
      <Loader loading={loading} />

      <CursorGlow />

      <Background />

      <Navbar
        hasProjects={hasProjects}
      />

      <main>
        <Hero />

        <About />

        <Skills />

        <Projects
          onLoaded={() =>
            setLoading(false)
          }

          onProjectsChange={
            setHasProjects
          }
        />

        <Experience />

        <Contact />

        <Footer />

        <Terminal />
      </main>
    </>
  )
}