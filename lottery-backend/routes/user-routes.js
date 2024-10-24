import { Router } from 'express'
import { UserController } from '../controllers/user-controller.js'

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router()
  const userController = new UserController({ userModel })

  userRouter.post('/userLogin', userController.userLogin)
  userRouter.post('/userLogout', userController.userLogout)

  return userRouter
}
