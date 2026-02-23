import { forbidden, transactionNotFoundResponse } from "../../controllers/helpers"

export class DeleteTransactionUseCase {
    constructor (deleteTransactionRepository, getTransactionByIdRepository){
        this.getTransactionByIdRepository = getTransactionByIdRepository
        this.deleteTransactionRepository = deleteTransactionRepository
    }
    async execute(transactionId, userId) {
        const transaction = await this.getTransactionByIdRepository.execute(transactionId)
        if(!transaction) {
            throw new transactionNotFoundResponse(transactionId)
        }
        if(!transaction.user_id !== userId) {
           throw new forbidden()
        }
        const deletedTransaction = await this.deleteTransactionRepository.execute(transactionId)

        return deletedTransaction
    }
}