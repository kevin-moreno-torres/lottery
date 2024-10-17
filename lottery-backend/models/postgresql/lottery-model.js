import pg from 'pg'

const { Pool } = pg
const DEFAULT_CONFIG = {
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_USER_PASSWORD ?? '',
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ?? 5334,
  database: process.env.DB_NAME ?? '',
  ssl: true
}

export class LotteryModel {
  static getPool() {
    return new Pool(DEFAULT_CONFIG)
  }
  static async getBoards() {
    const pool = this.getPool()

    try {
      const connection = await pool.connect()
      const res = await connection.query('SELECT * FROM Board')

      connection.release()

      return res.rows
    } catch (error) {
      console.error('Get Boards error:', error)
    } finally {
      await pool.end()
    }
  }

  static async getDeck() {
    const pool = this.getPool()

    try {
      const connection = await pool.connect()
      const res = await connection.query('SELECT * FROM Deck')

      connection.release()

      return res.rows
    } catch (error) {
      console.error('Get Deck error:', error)
    } finally {
      await pool.end()
    }
  }
}
