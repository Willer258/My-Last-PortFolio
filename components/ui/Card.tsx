import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  gradient = false,
}) => {
  const baseClasses = 'rounded-xl p-6 backdrop-blur-sm transition-all duration-300'
  const bgClasses = gradient
    ? 'bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20'
    : 'bg-white/5 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'
  const hoverClasses = hover ? 'hover:shadow-2xl hover:scale-105' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${baseClasses} ${bgClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </motion.div>
  )
}
