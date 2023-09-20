import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'
import { join, relative } from 'path'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

function getRouteFiles (src) {
  const find = (originPath, state) => {
    const files = fs.readdirSync(originPath)
    for (const file of files) {
      const currentPath = join(originPath, file)
      const isFile = fs.statSync(currentPath).isFile()
      if (isFile) {
        const relativePath = './' + relative('.', currentPath)
        state.push(relativePath)
      } else {
        find(currentPath, state)
      }
    }
    return state
  }

  return find(src, [])
}


async function load (path) {
  const exported = (await import(path)).default
  const router = express.Router()
  
  return exported(router)
}

function registerRoute (route) {
  app.use('/api/v1', route)
}

const src = join(process.cwd(), '/src/routes/')

Promise
  .all(getRouteFiles(src).map(load))
  .then(result => result.forEach(registerRoute))

export default app