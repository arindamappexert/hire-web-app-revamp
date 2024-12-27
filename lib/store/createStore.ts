import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const createStore = <T extends object>(
  initialState: T,
  name?: string
) => {
  return create<T>()(
    devtools(
      (set) => ({
        ...initialState,
        set: (newState: Partial<T>) => set((state) => ({ ...state, ...newState })),
        reset: () => set(initialState),
      }),
      { name }
    )
  )
}