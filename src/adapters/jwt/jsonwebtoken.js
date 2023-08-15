import jwt from 'jsonwebtoken'

const saltKey = process.env.SALT_KEY
const options = {
  expiresIn: '1d'
}

export const jwt = {
  generate (payload) {
    return jwt.sign(payload, saltKey, options)
  },

  verify (token) {
    return jwt.verify(token, saltKey)
  }
}