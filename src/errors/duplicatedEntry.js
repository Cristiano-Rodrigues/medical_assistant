export class DuplicatedEntry extends Error {
  constructor (field) {
    super(`Duplicated Entry ${field}`)
    this.name = 'DuplicatedEntry'
  }
}