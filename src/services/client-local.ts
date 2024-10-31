export type ClientLocal = string | null

const CLIENT_ID_KEY = 'pogovorimClientId'

export const getClientLocal = (): ClientLocal => {
  const clientLocal = localStorage.getItem(CLIENT_ID_KEY)

  return clientLocal || null
}

export const setClientLocal = (state: string | undefined) => {
  if (state) localStorage.setItem(CLIENT_ID_KEY, state)
}

export const dropClientLocal = () => {
  localStorage.removeItem(CLIENT_ID_KEY)
}
