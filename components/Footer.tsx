import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart, FaCoffee } from 'react-icons/fa'
import { useStore } from '../store/useStore'
import { useLanguage } from '../contexts/LanguageContext'

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FaEnvelope, href: 'mailto:contact@example.com', label: 'Email' },
]

export const Footer: React.FC = () => {
  const { easterEggsFound, addEasterEgg } = useStore()
  const { t } = useLanguage()

  const handleSecretClick = () => {
    addEasterEgg('footer-secret')
  }

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              {t.footer.about}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t.footer.aboutText}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              {t.footer.connect}
            </h3>
            <div className="flex justify-center md:justify-end gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-2xl text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-300 dark:border-gray-700 pt-8"
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <span>{t.footer.madeWith}</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>{t.footer.and}</span>
              <FaCoffee className="text-amber-600 dark:text-amber-500" />
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-500">
              © 2024 {t.footer.rights}
            </p>

            <motion.div
              onClick={handleSecretClick}
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer text-2xl"
              title="Click me for a surprise!"
            >
              🎮
            </motion.div>

            {easterEggsFound.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-sm text-primary-500 dark:text-primary-400 font-semibold"
              >
                🎉 Easter Eggs Found: {easterEggsFound.length}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
