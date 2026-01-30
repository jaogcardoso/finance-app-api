import { postgresGetUserByIdRepository } from '../repositories/postgres/index.js'

export class GetUserByIdUseCase {
  async execute(userId) {
    const getUserByIdRepository = new postgresGetUserByIdRepository()

    const user = await getUserByIdRepository.execute(userId)

    return user
  }
}
