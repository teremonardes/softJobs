import pool from '../../database/config.js'
import bcrypt from 'bcryptjs'

export const createUserModel = async (email, password, rol, lenguage) => {
  const hashedPassword = bcrypt.hashSync(password)
  const query = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING email, rol, lenguage'
  const values = [email, hashedPassword, rol, lenguage]
  const result = await pool.query(query, values)
  return result.rows[0]
}

export const getUserByEmailModel = async (email) => {
  const query = 'SELECT * FROM usuarios WHERE email = $1'
  const values = [email]
  const result = await pool.query(query, values)
  return result.rows[0]
}
