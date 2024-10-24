import express from 'express'
import 'dotenv/config'
import { createLotteryRouter } from './routes/lottery-routes.js'
import { createUserRouter } from './routes/user-routes.js'
import { LotteryModel } from './models/postgresql/lottery-model.js'
import { UserModel } from './models/postgresql/user-model.js'

const app = express()
app.use(express.json())
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
