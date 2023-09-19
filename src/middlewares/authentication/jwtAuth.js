import { getToken, unauthorized, success } from '../helpers'

export function auth (req, { jwt }) {
  try {
    const token = getToken(req.headers.authorization)
  
    if (!token) {
      return unauthorized()
    }

    const payload = jwt.verify(token)

    if (!payload) {
      return unauthorized()
    }
  } catch (error) {
    return unauthorized()
  }

  return success()
}