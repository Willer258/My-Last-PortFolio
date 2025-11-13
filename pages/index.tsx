import type { NextPage } from 'next'
import Head from 'next/head'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/sections/Hero'
import { Footer } from '../components/Footer'
import { useStore } from '../store/useStore'

const Home: NextPage = () => {
  const { isDarkMode } = useStore()

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
        </main>

        <Footer />

      </div>
    </div>
  )
}

export default Home
