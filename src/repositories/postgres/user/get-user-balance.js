import { Prisma } from '@prisma/client'
import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserBalanceRepository {
  async execute(userId, from, to) {
    const dateFilter = {
      date: {
        gte: from,
        lte: to,
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

    const earningsValue = totalEarnings._sum.value ?? 0
const expensesValue = totalExpenses._sum.value ?? 0
const investmentsValue = totalInvestments._sum.value ?? 0

const _totalEarnings = new Prisma.Decimal(earningsValue)
const _totalExpenses = new Prisma.Decimal(expensesValue)
const _totalInvestments = new Prisma.Decimal(investmentsValue)

const total = _totalEarnings
  .add(_totalExpenses)
  .add(_totalInvestments)

const balance = _totalEarnings
  .sub(_totalExpenses)
  .sub(_totalInvestments)

const earningsPercentage = total.isZero()
  ? new Prisma.Decimal(0)
  : _totalEarnings.div(total).mul(100).toDecimalPlaces(2)

const expensesPercentage = total.isZero()
  ? new Prisma.Decimal(0)
  : _totalExpenses.div(total).mul(100).toDecimalPlaces(2)

const investementsPercentage = total.isZero()
  ? new Prisma.Decimal(0)
  : _totalInvestments.div(total).mul(100).toDecimalPlaces(2)

    return {
      earnings: _totalEarnings,
      expenses: _totalExpenses,
      investements: _totalInvestments,
      earningsPercentage,
      expensesPercentage,
      investementsPercentage,
      balance,
    }
  }
}
