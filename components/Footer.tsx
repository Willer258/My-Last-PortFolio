import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'

export const Footer: React.FC = () => {
  const { addEasterEgg, easterEggsFound } = useStore()

  const handleEasterEgg = () => {
    addEasterEgg('footer_click')
    if (!easterEggsFound.includes('footer_click')) {
      alert('🎉 You found an Easter egg! Keep exploring!')
    }
  }

  return (
    <footer className="bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              © {new Date().getFullYear()} Portfolio. All rights reserved.
            </p>
            <p
              onClick={handleEasterEgg}
              className="text-gray-500 dark:text-gray-500 cursor-pointer hover:text-primary-500 transition-colors"
            >
              Made with ❤️ and lots of ☕
            </p>
          </motion.div>

          {easterEggsFound.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-sm text-primary-500"
            >
              🎉 Easter Eggs Found: {easterEggsFound.length}
            </motion.div>
          )}
        </div>
      </div>
    </footer>
  )
}
