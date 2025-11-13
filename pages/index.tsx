import type { NextPage, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Skills } from '../components/sections/Skills'
import { Projects } from '../components/sections/Projects'
import { Contact } from '../components/sections/Contact'
import { Footer } from '../components/Footer'
import { Chatbot } from '../components/Chatbot'
import { SnakeGame } from '../components/games/SnakeGame'
import { GameButton } from '../components/GameButton'
import { useStore } from '../store/useStore'

const Home: NextPage = () => {
  const { isGameOpen, isDarkMode } = useStore()

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Head>
        <title>Portfolio | Full Stack Developer</title>
        <meta name="description" content="Modern portfolio with 3D effects, animations, and interactive features" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <Footer />
        <Chatbot />
        <GameButton />

        {isGameOpen && <SnakeGame />}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}

export default Home
