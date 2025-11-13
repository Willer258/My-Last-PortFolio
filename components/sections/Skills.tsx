import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'
import { skills } from '../../data/portfolio'
import * as SiIcons from 'react-icons/si'

export const Skills: React.FC = () => {
  const { t } = useTranslation('common')

  const categories = [
    { title: t('skills.frontend'), data: skills.frontend, color: 'from-primary-500 to-blue-500' },
    { title: t('skills.backend'), data: skills.backend, color: 'from-secondary-500 to-purple-500' },
    { title: t('skills.tools'), data: skills.tools, color: 'from-accent-500 to-orange-500' },
    { title: t('skills.learning'), data: skills.learning, color: 'from-green-500 to-teal-500' },
  ]

  return (
    <Section id="skills" title={t('skills.title')} subtitle={t('skills.subtitle')}>
      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((category, catIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.1, duration: 0.5 }}
          >
            <Card gradient>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.data.map((skill, index) => {
                  const Icon = (SiIcons as any)[skill.icon] || SiIcons.SiReact
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-primary-500" />
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 + 0.2, duration: 1, ease: 'easeOut' }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
