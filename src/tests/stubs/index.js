export class Mailer {
  async send () {}
}

export class Connection {
  close () {}
}

export class Hasher {
  compare () { return true }
  hash (password) { return password }
}

export class JWT {
  generate (payload) { return payload }
}

export const patientRepository = () => ({
  create: () => {},
  getByEmail: () => {}
})