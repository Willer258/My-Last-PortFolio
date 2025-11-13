import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { projects } from '../../data/portfolio'
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi'

export const Projects: React.FC = () => {
  const { t } = useTranslation('common')
  const [filter, setFilter] = useState<string>('all')

  const categories = [
    { id: 'all', label: t('projects.all') },
    { id: 'web', label: t('projects.web') },
    { id: 'mobile', label: t('projects.mobile') },
    { id: 'design', label: t('projects.design') },
  ]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <Section id="projects" title={t('projects.title')} subtitle={t('projects.subtitle')}>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(cat.id)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              filter === cat.id
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            layout
          >
            <Card hover gradient className="h-full flex flex-col">
              {project.featured && (
                <div className="flex items-center gap-2 mb-2 text-accent-500">
                  <FiStar className="w-4 h-4" />
                  <span className="text-sm font-semibold">{t('projects.featured')}</span>
                </div>
              )}

              <div className="h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">🚀</span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-primary-500/10 text-primary-500 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" href={project.github} className="flex-1">
                  <FiGithub className="w-4 h-4" />
                  {t('projects.viewCode')}
                </Button>
                <Button variant="primary" size="sm" href={project.demo} className="flex-1">
                  <FiExternalLink className="w-4 h-4" />
                  {t('projects.viewProject')}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
