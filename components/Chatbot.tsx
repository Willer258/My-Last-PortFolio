import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'

interface Message {
  text: string
  isBot: boolean
  timestamp: Date
}

const getAIResponse = (userMessage: string, t: any): string => {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes('bonjour') || lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('salut')) {
    return t.chatbot.responses.greeting
  }
  if (lowerMessage.includes('compétence') || lowerMessage.includes('skill') || lowerMessage.includes('technolog')) {
    return t.chatbot.responses.skills
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('joindre')) {
    return t.chatbot.responses.contact
  }
  if (lowerMessage.includes('aide') || lowerMessage.includes('help')) {
    return t.chatbot.responses.help
  }
  if (lowerMessage.includes('projet') || lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
    return "J'ai réalisé de nombreux projets variés : e-commerce, applications de chat, systèmes de gestion de tâches, CMS personnalisés et bien plus. N'hésitez pas à consulter la section Projets pour en savoir plus !"
  }
  if (lowerMessage.includes('expérience') || lowerMessage.includes('experience') || lowerMessage.includes('travail')) {
    return "J'ai plus de 5 ans d'expérience en développement web, ayant travaillé dans diverses entreprises allant des startups aux agences digitales. Mon expertise couvre le développement frontend et backend."
  }

  return t.chatbot.responses.default
}

export const Chatbot: React.FC = () => {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: t.chatbot.responses.greeting,
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const botResponse: Message = {
      text: getAIResponse(input, t),
      isBot: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, botResponse])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-2xl flex items-center justify-center text-white"
      >
        <AnimatePresence exitBeforeEnter>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FaTimes className="text-2xl" />
            </motion.div>
          ) : (
            <motion.div
              key="robot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <FaRobot className="text-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <FaRobot className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold">{t.chatbot.title}</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>En ligne</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                        : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.1
                          }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t.chatbot.placeholder}
                  className="flex-1 px-4 py-2 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:outline-none"
                />
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <FaPaperPlane />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
