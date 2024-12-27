import { createStore } from '@/lib/store/createStore'

interface AdminState {
  selectedDevelopers: string[]
  isLoading: boolean
  error: string | null
}

const initialState: AdminState = {
  selectedDevelopers: [],
  isLoading: false,
  error: null
}

export const useAdminStore = createStore(initialState, 'admin')