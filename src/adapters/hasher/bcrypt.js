import bcrypt from 'bcrypt'

export default hasher = {
  hash (password) {
    const rounds = 10
    return bcrypt.hashSync(password, rounds)
  }
}