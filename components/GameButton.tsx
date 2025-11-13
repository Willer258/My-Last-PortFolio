import { motion } from 'framer-motion'
import { FiPlay } from 'react-icons/fi'
import { useStore } from '../store/useStore'

export const GameButton: React.FC = () => {
  const { openGame } = useStore()

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => openGame('snake')}
      className="fixed bottom-6 left-6 z-40 p-4 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-2xl hover:shadow-accent-500/50 transition-shadow"
      title="Play Snake Game!"
    >
      <FiPlay className="w-6 h-6" />
    </motion.button>
  )
}
