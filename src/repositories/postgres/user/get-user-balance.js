import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserBalanceRepository {
  async execute(userId) {
    const totalExpenses = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: 'EXPENSE',
      },
      _sum: {
        value: true,
      },
    })

    const totalEarnings = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: 'EARNING',
      },
      _sum: {
        value: true,
      },
    })
    const totalInvestments = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: 'INVESTMENT',
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
