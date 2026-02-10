import { PostgresHelper } from '../../../db/postgres/client.js'

export class PostgresGetUserBalanceRepository {
  async execute(userId) {
    const balance = await PostgresHelper.query(
      `select
	        sum(case when type = 'EARNING' then value else 0 end) as earnings,
	        sum(case when type = 'EXPENSE' then value else 0 end) as expenses,
	        sum(case when type = 'INVESTMENT' then value else 0 end) as investments,
		    (sum(case when type = 'EARNING' then value else 0 end)
		    - sum(case when type = 'EXPENSE' then value else 0 end)
		    - sum(case when type = 'INVESTMENT' then value else 0 end)) as balance
        from transactions
        where user_id = $1;`,
      [userId],
    )
    return balance[0]
  }
}
