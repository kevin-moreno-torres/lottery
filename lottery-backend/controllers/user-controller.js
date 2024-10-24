import { userLoginSchema, userLogoutSchema } from '../schemas/user-schema.js'
import bcrypt from 'bcrypt'

export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  userLogin = async (req, res) => {
    const { email, password: plainPassword } = req.body
    const validation = userLoginSchema.safeParse({ email, password: plainPassword })

    if (validation.success) {
      const { password, ...rest } = await this.userModel.postUserLogin(email)
      const hash = bcrypt.hashSync(
        plainPassword,
        parseInt(process.env.SALT_ROUNDS)
      )

      if (bcrypt.compareSync(plainPassword, hash)) {
        res.json(rest)
      } else {
        res.status(401).json({
          error: 'Invalid password, please check your password and try again.'
        })
      }
    } else {
      res
        .status(400)
        .json({
          error: 'Invalid user credentials, please check email and password.'
        })
    }
  }

  userLogout = async (req, res) => {
    const { email } = req.body
    const validation = userLogoutSchema.safeParse({ email })
    if (validation.success) {
      const userLogout = await this.userModel.postUserLogout()

      res.json(userLogout)
    } else {
      res.status(400).json({
        error: 'Error, please try again.'
      })
    }
  }
}
