import express, { json } from 'express'
import 'dotenv/config'
import { createLotteryRouter } from './routes/lottery-routes.js'
import { LotteryModel } from './models/postgresql/lottery-model.js'

const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('Backend')
})

app.use('/lottery', createLotteryRouter({ lotteryModel: LotteryModel }))

app.use('/users', (req, res) => {
  res.send('Backend for Users')
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
