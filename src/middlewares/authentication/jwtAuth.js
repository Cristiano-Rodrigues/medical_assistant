import { Unauthorized } from '../../errors'

const unauthorized = {
  code: 401,
  error: new Unauthorized()
}

export function auth (req, { jwt }) {
  const token = getToken(req.headers.authorization)

  if (!token) {
    return unauthorized
  }

  try {
    const payload = jwt.verify(token)

    if (!payload) {
      return unauthorized
    }
  } catch (error) {
    return unauthorized
  }

  return {
    success: true
  }
}

function getToken (authHeader) {
  const regexp = /Bearer ([\w\.]+)/
  const [, token] = authHeader.match(regexp)

  return token
}