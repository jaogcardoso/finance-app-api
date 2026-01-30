import { PostgresDeleteUserRepository} from '../repositories/postgres/index.js'

export class DeleteUserUseCase {
  async execute(userId) {
    const postgresDeletedUserRepository = new PostgresDeleteUserRepository()

    const deletedUser = postgresDeletedUserRepository.execute(userId)

    return deletedUser
  }
}
