import { Router } from 'express'
import { createUserController, loginController, getUsersController } from '../src/controller/usersControllers.js'
import { userExistMiddleware, getToken } from '../middleware/userMiddleware.js'

const router = Router()

router.post('/usuarios', userExistMiddleware, createUserController)
router.post('/login', loginController)
router.get('/usuarios', getToken, getUsersController)

export default router
