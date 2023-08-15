import bcrypt from 'bcrypt'

export const hasher = {
  hash (password) {
    const rounds = 10
    return bcrypt.hashSync(password, rounds)
  },
  
  compare (data, hash) {
    return bcrypt.compareSync(data, hash)
  }
}