import { motion } from 'framer-motion'
import {
  FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaFigma,
  FaHtml5, FaCss3Alt, FaJs, FaDatabase
} from 'react-icons/fa'
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb,
  SiPostgresql, SiRedis, SiGraphql, SiFirebase
} from 'react-icons/si'
import { useLanguage } from '../../contexts/LanguageContext'

const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', icon: FaReact, level: 95, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, level: 90, color: '#000000' },
      { name: 'TypeScript', icon: SiTypescript, level: 88, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92, color: '#06B6D4' },
      { name: 'JavaScript', icon: FaJs, level: 95, color: '#F7DF1E' },
      { name: 'HTML5', icon: FaHtml5, level: 98, color: '#E34F26' },
      { name: 'CSS3', icon: FaCss3Alt, level: 95, color: '#1572B6' },
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', icon: FaNodeJs, level: 90, color: '#339933' },
      { name: 'Python', icon: FaPython, level: 85, color: '#3776AB' },
      { name: 'GraphQL', icon: SiGraphql, level: 82, color: '#E10098' },
      { name: 'MongoDB', icon: SiMongodb, level: 88, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 85, color: '#4169E1' },
      { name: 'Redis', icon: SiRedis, level: 80, color: '#DC382D' },
    ]
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', icon: FaGitAlt, level: 92, color: '#F05032' },
      { name: 'Docker', icon: FaDocker, level: 85, color: '#2496ED' },
      { name: 'Figma', icon: FaFigma, level: 88, color: '#F24E1E' },
      { name: 'Firebase', icon: SiFirebase, level: 86, color: '#FFCA28' },
    ]
  }
]

export const Skills: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
            {t.skills.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            {t.skills.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                {t.skills.categories[category.category.toLowerCase() as 'frontend' | 'backend' | 'tools']}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon
                          className="text-2xl"
                          style={{ color: skill.color }}
                        />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-primary-500">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional skills badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Other Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['AWS', 'Vercel', 'Jest', 'Cypress', 'Webpack', 'Vite', 'REST API', 'WebSocket', 'CI/CD', 'Agile'].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-semibold shadow-lg cursor-pointer"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
