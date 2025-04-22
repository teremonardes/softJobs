import pg from 'pg'
import 'dotenv/config'

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env

const pool = new pg.Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  allowExitOnIdle: true
})

const getDate = async () => {
  const result = await pool.query('SELECT * FROM usuarios')
  console.log(result)
}

getDate()

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Error connecting to DB:', err)
  } else {
    console.log('🔋 Db-Connected', res.rows[0])
  }
})
export default pool
