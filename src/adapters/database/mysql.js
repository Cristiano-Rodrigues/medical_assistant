import mysql from 'mysql'
import { promisify } from 'util'
import dotenv from 'dotenv'

dotenv.config()

const getEnvVars = () => ([
  'HOST',
  'USER',
  'PASS',
  'DB',
]).map(envVar => process.env[ envVar ])

export class Connection {
  constructor () {
    const [ host, user, password, dbname ] = getEnvVars()
    const conn = mysql.createConnection({
      host,
      user,
      password,
      database: process.env.ENV === 'test' ?
        process.env.TEST_DB : dbname,
      multipleStatements: true
    })

    this.conn = conn
    this.query = promisify(conn.query).bind(conn)
  }

  close () {
    this.conn.destroy()
  }
}