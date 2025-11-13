import { create } from 'zustand'

interface StoreState {
  // Theme
  isDarkMode: boolean
  toggleDarkMode: () => void

  // Easter eggs
  easterEggsFound: string[]
  addEasterEgg: (egg: string) => void
}

export const useStore = create<StoreState>((set) => ({
  // Theme
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // Easter eggs
  easterEggsFound: [],
  addEasterEgg: (egg) => set((state) => {
    if (state.easterEggsFound.includes(egg)) {
      return state
    }
    return { easterEggsFound: [...state.easterEggsFound, egg] }
  }),
}))
