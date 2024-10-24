import express from 'express'
import 'dotenv/config'
import { createLotteryRouter } from './routes/lottery-routes.js'
import { createUserRouter } from './routes/user-routes.js'
import { LotteryModel } from './models/postgresql/lottery-model.js'
import { UserModel } from './models/postgresql/user-model.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())
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

app.get('/', (req, res) => {
  res.send('Backend')
})

app.use('/lottery', createLotteryRouter({ lotteryModel: LotteryModel }))

app.use('/user', createUserRouter({ userModel: UserModel }))

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
