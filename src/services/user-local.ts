export type UserLocal = string | null

const USER_ID_KEY = 'pogovorimUserId'

export const getUserLocal = (): UserLocal => {
  const userLocal = localStorage.getItem(USER_ID_KEY)

  return userLocal || null
}

export const setUserLocal = (state: string | undefined) => {
  if (state) localStorage.setItem(USER_ID_KEY, state)
}

export const dropUserLocal = () => {
  localStorage.removeItem(USER_ID_KEY)
}
