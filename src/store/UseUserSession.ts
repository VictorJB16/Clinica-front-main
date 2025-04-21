import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserSession = {
    token?: string,
    setSession: (token: string) => Promise<void>,
    logOut: VoidFunction
}

export const useUserSessionStore = create<UserSession>()(
  persist(
    (set) => ({
      token: undefined,
      setSession: async (token: string) => {
        set(state => ({
            ...state,
            token,
        }));
      },
      logOut: () => {
        set(state => ({
          ...state,
          token: undefined
        }))
      }
    }),
    {name: 'session-storage'}
  )
)
