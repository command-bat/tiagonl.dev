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
  return (
    <>
      <Loader />

      <CursorGlow />

      <Background />

      <Navbar />

      <main>
        <Hero />

        <About />

        <Skills />

        <Projects />

        <Experience />

        <Contact />

        <Footer />

        <Terminal />
      </main>
    </>
  )
}