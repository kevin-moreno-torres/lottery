import { Router } from 'express'
import { LoginController } from '../controllers/login-controller.js'

export const createLoginRouter = ({ loginModel }) => {
  const loginRouter = Router()
  const loginController = new LoginController({ loginModel })

  loginRouter.post('/login', loginController.login)
  loginRouter.post('/logout', loginController.logout)

  return loginRouter
}
