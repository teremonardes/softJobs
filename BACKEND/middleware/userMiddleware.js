import { getUserByEmailModel } from '../src/models/usersModels.js'

export const userExistMiddleware = async (req, res, next) => {
  const { email } = req.body
  const user = await getUserByEmailModel(email)
  if (user) {
    return res.status(400).json({ message: 'El usuario ya existe' })
  }
  next()
}
