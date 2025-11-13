import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython } from 'react-icons/fa'
import { SiNextdotjs, SiMongodb, SiTailwindcss, SiTypescript, SiFirebase } from 'react-icons/si'
import { useLanguage } from '../../contexts/LanguageContext'

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
    descriptionFr: 'Plateforme e-commerce full-stack avec gestion des stocks en temps réel, traitement des paiements et tableau de bord admin.',
    image: '🛒',
    tags: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Tailwind', icon: SiTailwindcss },
    ],
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-blue-500 to-purple-500'
  },
  {
    title: 'AI Chat Application',
    description: 'Real-time chat application with AI-powered features, file sharing, and video calls.',
    descriptionFr: 'Application de chat en temps réel avec fonctionnalités IA, partage de fichiers et appels vidéo.',
    image: '💬',
    tags: [
      { name: 'React', icon: FaReact },
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'TypeScript', icon: SiTypescript },
    ],
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'Task Management System',
    description: 'Collaborative task management tool with kanban boards, time tracking, and team analytics.',
    descriptionFr: 'Outil de gestion de tâches collaboratif avec tableaux kanban, suivi du temps et analyses d\'équipe.',
    image: '📋',
    tags: [
      { name: 'React', icon: FaReact },
      { name: 'Python', icon: FaPython },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Tailwind', icon: SiTailwindcss },
    ],
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Portfolio CMS',
    description: 'Content management system for creative professionals with drag-and-drop builder and SEO optimization.',
    descriptionFr: 'Système de gestion de contenu pour professionnels créatifs avec constructeur drag-and-drop et optimisation SEO.',
    image: '🎨',
    tags: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Node.js', icon: FaNodeJs },
    ],
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-pink-500 to-purple-500'
  },
  {
    title: 'Fitness Tracking App',
    description: 'Mobile-first fitness app with workout plans, progress tracking, and social features.',
    descriptionFr: 'Application fitness mobile avec plans d\'entraînement, suivi des progrès et fonctionnalités sociales.',
    image: '💪',
    tags: [
      { name: 'React', icon: FaReact },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind', icon: SiTailwindcss },
    ],
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather dashboard with forecasts, maps, and weather alerts using multiple APIs.',
    descriptionFr: 'Tableau de bord météo en temps réel avec prévisions, cartes et alertes météo utilisant plusieurs APIs.',
    image: '🌤️',
    tags: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind', icon: SiTailwindcss },
    ],
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-cyan-500 to-blue-500'
  },
]

export const Projects: React.FC = () => {
  const { t, locale } = useLanguage()

  return (
    <section id="projects" className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
            {t.projects.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            {t.projects.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Project image placeholder */}
              <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="text-7xl">{project.image}</div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <FaGithub className="text-2xl" />
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <FaExternalLinkAlt className="text-2xl" />
                  </motion.a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-3">
                  {locale === 'fr' ? project.descriptionFr : project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <div
                      key={tagIndex}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300"
                    >
                      <tag.icon className="text-sm" />
                      {tag.name}
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold hover:border-primary-500 hover:text-primary-500 transition-colors"
                  >
                    <FaGithub />
                    {t.projects.viewCode}
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-shadow"
                  >
                    <FaExternalLinkAlt />
                    {t.projects.viewProject}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
