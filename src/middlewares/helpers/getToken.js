export function getToken (authHeader) {
  if (!authHeader || !(typeof authHeader == 'string')) {
    return null
  }

  const regexp = /Bearer ([\w\.]+)/
  const match = authHeader.match(regexp)

  if (!match) {
    return null
  }

  return match[1]
}