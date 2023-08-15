export class DuplicatedEntry extends Error {
  constructor (field) {
    const message = `Duplicated Entry ${field}`
    super(message)
    this.message = message
    this.name = 'DuplicatedEntry'
  }
}