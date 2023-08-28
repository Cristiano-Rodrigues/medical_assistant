export class InvalidEntry extends Error {
  constructor (field) {
    super(`Invalid Entry ${field}`)
    this.name = 'InvalidEntry'
  }
}