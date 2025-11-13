import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGamepad } from 'react-icons/fa'
import { SnakeGame } from './games/SnakeGame'

export const GameButton: React.FC = () => {
  const [isGameOpen, setIsGameOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setIsGameOpen(true)}
        whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 z-40 w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full shadow-2xl flex items-center justify-center text-white"
        title="Play Snake Game!"
      >
        <FaGamepad className="text-2xl" />
      </motion.button>

      <AnimatePresence>
        {isGameOpen && <SnakeGame onClose={() => setIsGameOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
