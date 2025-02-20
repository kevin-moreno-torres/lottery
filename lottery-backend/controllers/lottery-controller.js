export class LotteryController {
  constructor ({ lotteryModel }) {
    this.lotteryModel = lotteryModel
  }

  getBoards = async (req, res) => {
    const boards = await this.lotteryModel.getBoards()
    res.send(boards)
  }

  getDeck = async (req, res) => {
    const deck = await this.lotteryModel.getDeck()
    res.send(deck)
  }
}
