import { PostgresHelper } from '../../../db/postgres/client.js'

export class PostgresCreateTransictionRepository {
  async execute(createTransactionsParams) {
    const createdTransaction = await PostgresHelper.query(
      `
        INSERT INTO
        transactions (id, user_id, name, date, value, type)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *
       `,
      [
        createTransactionsParams.id,
        createTransactionsParams.user_id,
        createTransactionsParams.name,
        createTransactionsParams.date,
        createTransactionsParams.value,
        createTransactionsParams.type,
      ],
    )
    return createdTransaction[0]
  }
}
