export class LotteryController {
  constructor ({ lotteryModel }) {
    this.lotteryModel = lotteryModel
  }

  getBoards = async (req, res) => {
    const { user } = req.session

    if (!user) return res.status(403).send('Unauthorized')

    const boards = await this.lotteryModel.getBoards()
    res.send(boards)
  }

  getDeck = async (req, res) => {
    const { user } = req.session

    if (!user) return res.status(403).send('Unauthorized')

    const deck = await this.lotteryModel.getDeck()
    res.send(deck)
  }
}
