import { Router } from 'express'
import { createUserController, loginController } from '../src/controller/usersControllers.js'
import { userExistMiddleware } from '../middleware/userMiddleware.js'

const router = Router()

router.post('/usuarios', userExistMiddleware, createUserController)
router.post('/login', loginController)

export default router
