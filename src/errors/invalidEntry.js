export class InvalidEntry extends Error {
  constructor (field) {
    const message = `Invalid Entry ${field}`
    super(message)
    this.message = message
    this.name = 'InvalidEntry'
  }
}