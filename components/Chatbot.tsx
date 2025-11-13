import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useStore } from '../store/useStore'
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export const Chatbot: React.FC = () => {
  const { t } = useTranslation('common')
  const { isChatOpen, toggleChat } = useStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestions = t('chatbot.suggestions', { returnObjects: true }) as string[]

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      addBotMessage(t('chatbot.greeting'))
    }
  }, [isChatOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: 'bot',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes('skill') || input.includes('compétence')) {
      return "I'm proficient in React, Next.js, TypeScript, Node.js, and many other modern technologies. Check out the Skills section to see more!"
    }
    if (input.includes('project')) {
      return "I've worked on various exciting projects including e-commerce platforms, 3D portfolios, and AI chatbots. Visit the Projects section to explore them!"
    }
    if (input.includes('contact')) {
      return "You can reach me through the Contact form below, or connect with me on GitHub, LinkedIn, or Twitter. I'd love to hear from you!"
    }
    if (input.includes('hello') || input.includes('hi') || input.includes('salut')) {
      return "Hello! 👋 I'm here to help you learn more about this portfolio. Feel free to ask me anything!"
    }
    if (input.includes('help') || input.includes('aide')) {
      return "You can ask me about:\n- Skills and technologies\n- Projects and work experience\n- How to get in touch\n- Or anything else you'd like to know!"
    }

    return "That's an interesting question! While I can answer questions about skills, projects, and contact information, I might need more context to help you with that specific query. Try one of the suggestions!"
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getBotResponse(input)
      addBotMessage(response)
      setIsTyping(false)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-2xl hover:shadow-primary-500/50 transition-shadow"
      >
        <AnimatePresence mode="wait">
          {isChatOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FiX className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FiMessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
              <h3 className="text-lg font-bold">{t('chatbot.title')}</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chatbot.placeholder')}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                >
                  <FiSend className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
