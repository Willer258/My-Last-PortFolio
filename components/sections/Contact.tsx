import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { useStore } from '../../store/useStore'
import toast, { Toaster } from 'react-hot-toast'
import { FiMail, FiUser, FiMessageSquare } from 'react-icons/fi'

export const Contact: React.FC = () => {
  const { t } = useTranslation('common')
  const { isFormSubmitting, setFormSubmitting } = useStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast.success(t('contact.success'))
      setFormSubmitting(false)
      setFormData({ name: '', email: '', message: '' })
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Section id="contact" title={t('contact.title')} subtitle={t('contact.subtitle')}>
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto">
        <Card gradient>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 dark:text-gray-400 mb-8"
          >
            {t('contact.info')}
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                <FiUser className="w-5 h-5" />
                {t('contact.name')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                placeholder={t('contact.name')}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                <FiMail className="w-5 h-5" />
                {t('contact.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                placeholder={t('contact.email')}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                <FiMessageSquare className="w-5 h-5" />
                {t('contact.message')}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none resize-none"
                placeholder={t('contact.message')}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isFormSubmitting}
              >
                {isFormSubmitting ? t('contact.sending') : t('contact.send')}
              </Button>
            </motion.div>
          </form>
        </Card>
      </div>
    </Section>
  )
}
