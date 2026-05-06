import { create } from 'zustand'

type AppState = {
  test: string
  setTest: (value: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  test: '',
  setTest: (value) => set({ test: value })
}))