import { create } from 'zustand'

interface StoreState {
  // Theme
  isDarkMode: boolean
  toggleDarkMode: () => void

  // Language
  language: 'en' | 'fr'
  setLanguage: (lang: 'en' | 'fr') => void

  // Chatbot
  isChatOpen: boolean
  toggleChat: () => void

  // Games
  isGameOpen: boolean
  currentGame: 'snake' | 'tetris' | null
  openGame: (game: 'snake' | 'tetris') => void
  closeGame: () => void

  // Navigation
  activeSection: string
  setActiveSection: (section: string) => void

  // Easter eggs
  easterEggsFound: string[]
  addEasterEgg: (egg: string) => void

  // Contact form
  isFormSubmitting: boolean
  setFormSubmitting: (value: boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  // Theme
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // Language
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),

  // Chatbot
  isChatOpen: false,
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

  // Games
  isGameOpen: false,
  currentGame: null,
  openGame: (game) => set({ isGameOpen: true, currentGame: game }),
  closeGame: () => set({ isGameOpen: false, currentGame: null }),

  // Navigation
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),

  // Easter eggs
  easterEggsFound: [],
  addEasterEgg: (egg) => set((state) => ({
    easterEggsFound: [...new Set([...state.easterEggsFound, egg])]
  })),

  // Contact form
  isFormSubmitting: false,
  setFormSubmitting: (value) => set({ isFormSubmitting: value }),
}))
