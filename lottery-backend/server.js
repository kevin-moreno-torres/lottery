import express from 'express'
import 'dotenv/config'
import { createLotteryRouter } from './routes/lottery-routes.js'
import { createLoginRouter } from './routes/login-routes.js'
import { LotteryModel } from './models/postgresql/lottery-model.js'
import { LoginModel } from './models/postgresql/login-model.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express()
app.use(express.json())

const originHost = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_HOST : process.env.DEV_HOST
app.use(cors({ origin: originHost, credentials: true, exposedHeaders: ['Set-Cookie'] }))
app.use(cookieParser())

app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const accessToken = jwt.verify(token, process.env.SECRET_JWT_KEY)
    req.session.user = accessToken
  } catch {}

  next()
})

app.disable('x-powered-by')

const userValidationToken = async (req, res, next) => {
  const token = req.cookies['access-token']

  if (token) {
    try {
      next()
    } catch (error) {
      res.status(401).send({ error: 'Invalid token, please login again.' })
    }
  } else {
    res.status(401).send({ error: 'Unauthorized, please login.' })
  }
}

app.get('/validationToken', userValidationToken, (req, res) => {
  res.send({ validated: true })
})

app.use('/lottery', userValidationToken, createLotteryRouter({ lotteryModel: LotteryModel }))

app.use('/authentication', createLoginRouter({ loginModel: LoginModel }))

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
