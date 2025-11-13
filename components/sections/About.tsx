import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'
import { FiHeart, FiZap, FiAward } from 'react-icons/fi'
import { timeline } from '../../data/portfolio'

export const About: React.FC = () => {
  const { t } = useTranslation('common')

  const features = [
    { icon: FiHeart, title: t('about.passion'), desc: t('about.passionDesc') },
    { icon: FiZap, title: t('about.creativity'), desc: t('about.creativityDesc') },
    { icon: FiAward, title: t('about.dedication'), desc: t('about.dedicationDesc') },
  ]

  const stats = [
    { label: t('about.experience'), value: t('about.experienceYears') },
    { label: t('about.projects'), value: t('about.projectsCount') },
    { label: t('about.clients'), value: t('about.clientsCount') },
  ]

  return (
    <Section id="about" title={t('about.title')} subtitle={t('about.subtitle')}>
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            {t('about.description')}
          </p>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          {features.map((feature, index) => (
            <Card key={feature.title} gradient>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 to-secondary-500"></div>
        {timeline.map((item, index) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
              <Card hover gradient>
                <div className="text-primary-500 font-bold text-xl mb-2">{item.year}</div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-200">
                  {item.title}
                </h3>
                <div className="text-secondary-500 mb-2">{item.company}</div>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </Card>
            </div>
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 z-10"></div>
            <div className="w-1/2"></div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
