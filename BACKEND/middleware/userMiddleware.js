import { getUserByEmailModel } from '../src/models/usersModels.js'

import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const userExistMiddleware = async (req, res, next) => {
  const { email } = req.body
  const user = await getUserByEmailModel(email)
  if (user) {
    return res.status(400).json({ message: 'El usuario ya existe' })
  }
  next()
}

export const getToken = (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).send('Token no proporcionado o malformado')
    }

    const verifyToken = token.split(' ')[1]

    const data = jwt.verify(verifyToken, process.env.JWT_SECRET)
    req.user = { email: data.email, rol: data.rol, lenguage: data.lenguage }

    next()
  } catch (error) {
    res.status(401).send(error.message || 'Error al verificar token')
  }
}
