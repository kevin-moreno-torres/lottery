import { Router } from 'express'
import { LotteryController } from '../controllers/lottery-controller.js'

export const createLotteryRouter = ({ lotteryModel }) => {
  const lotteryRouter = Router()
  const lotteryController = new LotteryController({ lotteryModel })

  lotteryRouter.get('/getBoards', lotteryController.getBoards)
  lotteryRouter.get('/getDeck', lotteryController.getDeck)

  return lotteryRouter
}
