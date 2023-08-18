import _jwt from 'jsonwebtoken'

const saltKey = process.env.SALT_KEY
const options = {
  expiresIn: '1d'
}

export const jwt = {
  generate (payload) {
    return _jwt.sign(payload, saltKey, options)
  },

  verify (token) {
    return _jwt.verify(token, saltKey)
  }
}