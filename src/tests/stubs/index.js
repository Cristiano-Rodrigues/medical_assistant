export class Mailer {
  async send () {}
}

export class Connection {
  close () {}
}

export class Hasher {
  hash (password) { return password }
}

export const patientRepository = () => ({
  create: () => {},
  getByEmail: () => {}
})