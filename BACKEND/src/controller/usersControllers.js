import { createUserModel, getUserByEmailModel } from '../models/usersModels.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

export const createUserController = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body
    const user = await createUserModel(email, password, rol, lenguage)
    res.status(201).json({ message: 'Usuario creado con éxito', user })
  } catch (error) {
    res.status(500).json({ message: 'Error en crear usuario', error })
  }
}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await getUserByEmailModel(email)
    if (!user) {
      return res.status(404).json({ message: 'Error en contraseña o email' })
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })
    const { password: _, ...userWithoutPass } = user
    res.status(200).json({ token, userWithoutPass })
  } catch (error) {
    res.status(500).json({ message: 'Error al ingresar', error })
  }
}

export const getUsersController = async (req, res) => {
  try {
    const { email, rol } = req.user
    res.status(200).json({ email, rol })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error })
  }
}
