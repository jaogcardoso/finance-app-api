import {UserNotFoundError} from '../../errors/user.js'

export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository, getUserByIdRepository){
        this.updateTransactionRepository = new updateTransactionRepository
        this.getUserByIdRepository = new getUserByIdRepository
    }

    async execute (params) {
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            throw new UserNotFoundError
        }

        const transaction = await this.updateTransactionRepository.execute(params)

        return transaction
    }


}