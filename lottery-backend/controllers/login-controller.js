import { userLoginSchema, userLogoutSchema } from '../schemas/login-schema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class LoginController {
  constructor ({ loginModel }) {
    this.loginModel = loginModel
  }

  login = async (req, res) => {
    const { email, password: plainPassword } = req.body
    const validation = userLoginSchema.safeParse({ email, password: plainPassword })

    if (validation.success) {
      const { password, ...rest } = await this.loginModel.postLogin(email)
      if (!password) {
        res.status(200).send({
          error: 'Invalid user email, please check your email and try again.'
        })
      } else if (bcrypt.compareSync(plainPassword, password)) {
        const token = jwt.sign({
          name: rest.name,
          last_name: rest.last_name,
          email: rest.email
        }, process.env.SECRET_JWT_KEY,
        {
          expiresIn: '1h'
        })

        await this.loginModel.patchLogin(email)

        res.status(200).cookie('access-token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60
        }).send(rest)
      } else {
        res.status(200).send({
          error: 'Invalid password, please check your password and try again.'
        })
      }
    } else {
      res
        .status(200)
        .send({
          error: 'Invalid user credentials, please check email and password.'
        })
    }
  }

  logout = async (req, res) => {
    const { email } = req.body
    const validation = userLogoutSchema.safeParse({ email })
    if (validation.success) {
      res
        .clearCookie('access-token')
        .send({ success: 'User logged out successfully' })
    } else {
      res.status(200).send({
        error: 'Error, please try again.'
      })
    }
  }
}
