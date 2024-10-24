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

export class UserModel {
  static getPool () {
    return new Pool(DEFAULT_CONFIG)
  }

  static async postUserLogin (email) {
    const pool = this.getPool()

    try {
      const connection = await pool.connect()
      const query =
        'SELECT id, password, user_name, name, last_name, email FROM users WHERE email = $1 AND active = true AND locked = false;'
      const res = await connection.query(query, [email])

      connection.release()

      return res.rows.length > 0 ? res.rows[0] : []
    } catch (error) {
      console.error('Post User Login error:', error)
    } finally {
      await pool.end()
    }
  }

  static async patchUserLogin (email) {
    const pool = this.getPool()

    try {
      const connection = await pool.connect()
      const query =
        'UPDATE users SET last_login = NOW() WHERE email = $1 AND active = true AND locked = false;'
      const res = await connection.query(query, [email])

      connection.release()

      const userFound = res.rows.length > 0

      return { updateUser: userFound }
    } catch (error) {
      console.error('Patch User Login error:', error)
    } finally {
      await pool.end()
    }
  }
}
