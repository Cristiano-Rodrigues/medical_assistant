import mysql from 'mysql'
import { promisify } from 'util'

const createConnection = () => {
  return mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.ENV === 'test' ?
      process.env.DB : process.env.TEST_DB,
    password: process.env.PASS,
    multipleStatements: true
  })
}

const conn = createConnection()

export const connection = {
  query: promisify(conn.query).bind(conn),
  close () {
    conn.destroy()
  }
}