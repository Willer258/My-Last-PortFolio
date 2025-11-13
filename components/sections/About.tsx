import { motion } from 'framer-motion'
import { FaDownload, FaCode, FaRocket, FaLightbulb } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

const timeline = [
  { year: '2024', title: 'Senior Developer', company: 'Tech Startup' },
  { year: '2022', title: 'Full Stack Developer', company: 'Digital Agency' },
  { year: '2020', title: 'Junior Developer', company: 'Tech Company' },
  { year: '2019', title: 'Internship', company: 'Web Studio' },
]

const stats = [
  { icon: FaCode, value: '50+', label: 'Projects Completed' },
  { icon: FaRocket, value: '5+', label: 'Years Experience' },
  { icon: FaLightbulb, value: '100+', label: 'Happy Clients' },
]

export const About: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
            {t.about.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image placeholder with gradient */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 p-1">
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">👨‍💻</div>
                  <p className="text-gray-600 dark:text-gray-400">Profile Image</p>
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg"
            >
              <span className="text-2xl">🚀</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg"
            >
              <span className="text-2xl">💡</span>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {t.about.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {t.about.description}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Passionné par l&apos;innovation et les technologies modernes, je transforme des idées en
              solutions numériques élégantes et performantes. Mon expertise couvre le développement
              frontend et backend, avec une attention particulière portée à l&apos;expérience utilisateur.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="text-3xl text-primary-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <FaDownload />
              {t.about.download}
            </motion.button>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t.about.experience}
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 to-secondary-500 hidden md:block" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <span className="text-primary-500 font-bold text-lg">{item.year}</span>
                    <h4 className="text-xl font-bold mt-2 text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{item.company}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-2/12 justify-center">
                  <div className="w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-gray-900" />
                </div>

                <div className="hidden md:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
