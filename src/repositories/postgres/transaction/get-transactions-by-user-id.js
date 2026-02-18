import { prisma } from '../../../../prisma/prisma.js'
import { PostgresHelper } from '../../../db/postgres/client.js'

export class PostgresGetTransactionsByUserIdRepository{
    async execute(userId) {
        return await prisma.transaction
        const transactions = await PostgresHelper.query('SELECT * FROM transactions WHERE user_id = $1',
            [userId]
        )

        return transactions
    }
}