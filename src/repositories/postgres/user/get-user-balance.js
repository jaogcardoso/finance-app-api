import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserBalanceRepository {
  async execute(userId, from, to) {
    const dateFilter = {
      date: {
        gte: new Date(from),
        lte: new Date(to),
      },
    }
    const totalExpenses = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: 'EXPENSE',
        ...dateFilter,
      },
      _sum: {
        value: true,
      },
    })

    const totalEarnings = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: 'EARNING',
        ...dateFilter,
      },
      _sum: {
        value: true,
      },
    })
    const totalInvestments = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: 'INVESTMENT',
        ...dateFilter,
      },
      _sum: {
        value: true,
      },
    })

    const balance =
      totalEarnings._sum.value -
      totalExpenses._sum.value -
      totalInvestments._sum.value

    return {
      earnings: totalEarnings._sum.value,
      expenses: totalExpenses._sum.value,
      investements: totalInvestments._sum.value,
      balance,
    }
  }
}
