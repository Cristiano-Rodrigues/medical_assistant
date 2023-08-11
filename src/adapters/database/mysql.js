import mysql from 'mysql'
import { promisify } from 'util'
import dotenv from 'dotenv'

dotenv.config()

const createConnection = () => {
  const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.ENV === 'test' ?
      process.env.TEST_DB : process.env.DB,
    password: process.env.PASS,
    multipleStatements: true
  })

  return {
    query: promisify(conn.query).bind(conn),
    close () {
      conn.destroy()
    }
  }
}

export const connection = createConnection()