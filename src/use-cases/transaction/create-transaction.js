import { v4 as uuidv4 } from 'uuid'

import { UserNotFoundError } from '../../errors/user.js'

export class CreateTransactionUseCase {
  constructor(createTransactionRepository, getUserByIdRepository) {
    this.createTransactionRepository = createTransactionRepository
    this.getUserByIdRepository = getUserByIdRepository
  }


  async execute(createTransactionsParams) {
    // validar se o usuario existe
    const userId = createTransactionsParams.user_id
    console.log('🔎 user_id recebido:', userId)

    const user = await this.getUserByIdRepository.execute(userId)

      console.log('👤 usuário encontrado:', user)
    if (!user) {
      throw new UserNotFoundError(userId)
    }

    const transactionId = uuidv4()

    const transaction = await this.createTransactionRepository.execute({
      ...createTransactionsParams,
      id: transactionId,
    })
    
    return transaction
  }
}
