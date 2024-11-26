export function getDomain(): string | null {
  const hostname = window.location.hostname
  const hostnameParts = hostname.split('.')

  if (hostnameParts.length > 2) {
    return hostnameParts[0]
  }

  return null
}
