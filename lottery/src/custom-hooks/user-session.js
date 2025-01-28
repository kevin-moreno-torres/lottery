import { create } from 'zustand'
import { persist } from 'zustand/middleware';


const userSessionStore = create(
    persist((set) => ({ 
    user: {
        "id": "",
        "user_name": "",
        "name": "",
        "last_name": "",
        "email": ""
      },
    setUser: (userData) => set(() => ({
        user: {...userData}
    })),
    logout: () => set({ user: null })
})))

export { userSessionStore }

