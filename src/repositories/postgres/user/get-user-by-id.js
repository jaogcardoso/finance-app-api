import { PostgresHelper } from '../../../db/postgres/client.js'

export class postgresGetUserByIdRepository {
  async execute(userId) {
    const user = await PostgresHelper.query(
      'SELECT * FROM users where id = $1',
      [userId],
    )

    return user[0]
  }
}
