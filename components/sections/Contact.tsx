import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'
import toast, { Toaster } from 'react-hot-toast'

export const Contact: React.FC = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast.success(t.contact.success, {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#10B981',
        color: '#fff',
      },
    })

    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'contact@example.com',
      link: 'mailto:contact@example.com'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      value: '+33 6 12 34 56 78',
      link: 'tel:+33612345678'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'Paris, France',
      link: 'https://maps.google.com'
    }
  ]

  return (
    <section id="contact" className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
            {t.contact.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            {t.contact.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Get in Touch
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              N&apos;hésitez pas à me contacter pour discuter de vos projets, poser des questions
              ou simplement dire bonjour. Je réponds généralement dans les 24 heures.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition-all"
                >
                  <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                    <info.icon className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {info.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                Follow Me
              </h4>
              <div className="flex gap-4">
                {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((platform, index) => (
                  <motion.a
                    key={platform}
                    href={`https://${platform.toLowerCase()}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {platform[0]}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary-500 focus:outline-none transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t.contact.form.sending}
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    {t.contact.form.send}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
