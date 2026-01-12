import dotenv from 'dotenv'
import fs from 'fs'
import { pool } from '../client.js'
import { fileURLToPath } from 'url'
import path from 'node:path';

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const execMigrations = async () => {
  const client = await pool.connect()
  try {
    const filePath =  path.join(__dirname, '01-init.sql')
    const script = fs.readFileSync(filePath, 'utf-8')

    await client.query(script)
    console.log('Migrations executed successfully!')
  } catch (error) {
    console.error(error)
  } finally {
    await client.release()
  }
}

execMigrations()
