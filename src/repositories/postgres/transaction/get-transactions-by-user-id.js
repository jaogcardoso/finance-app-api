import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetTransactionsByUserIdRepository {
  async execute(userId, from, to) {
    return await prisma.transaction.findMany({
      where: {
        user_id: userId,
        date: {
          gte: from,
          lte: to,
        },
      },
    })
  }
}
