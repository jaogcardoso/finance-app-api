import { postgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id.js'

export class GetUserByIdUseCase {
  async execute(userId) {
    const getUserByIdRepository = new postgresGetUserByIdRepository()

    const user = await getUserByIdRepository.execute(userId)

    return user
  }
}
