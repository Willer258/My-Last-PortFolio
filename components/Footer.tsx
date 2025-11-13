import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiCoffee } from 'react-icons/fi'
import { socialLinks } from '../data/portfolio'
import { useStore } from '../store/useStore'

export const Footer: React.FC = () => {
  const { t } = useTranslation('common')
  const { addEasterEgg, easterEggsFound } = useStore()

  const socials = [
    { icon: FiGithub, href: socialLinks.github, name: 'GitHub' },
    { icon: FiLinkedin, href: socialLinks.linkedin, name: 'LinkedIn' },
    { icon: FiTwitter, href: socialLinks.twitter, name: 'Twitter' },
    { icon: FiMail, href: `mailto:${socialLinks.email}`, name: 'Email' },
  ]

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
          {/* Social Links */}
          <div className="flex gap-6">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg transition-shadow"
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              © {new Date().getFullYear()} Portfolio. {t('footer.rights')}.
            </p>
            <p
              onClick={handleEasterEgg}
              className="text-gray-500 dark:text-gray-500 flex items-center justify-center gap-2 cursor-pointer hover:text-primary-500 transition-colors"
            >
              {t('footer.madeWith')} <FiHeart className="text-red-500 animate-pulse" /> {t('footer.and')} <FiCoffee className="animate-bounce-slow" /> {t('footer.coffee')}
            </p>
          </motion.div>

          {/* Easter Egg Counter */}
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
