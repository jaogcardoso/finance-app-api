import bcrypt from 'bcrypt'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js'

export class UpdateUserUseCase {
  async execute(userId, updateUserParams) {
    //1. se o email estiver sendo atualizado, verifica se ja esta em uso
    if (updateUserParams.email) {
      const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()

      const userWithProvideEmail =
        await postgresGetUserByEmailRepository.execute(updateUserParams.email)

      if (userWithProvideEmail && userWithProvideEmail.id != user) {
        throw new EmailAlreadyInUseError(updateUserParams.email)
      }
    }
    //2. se a senha estiver sendo atualizada, criptograr ela
    const user = {
      ...updateUserParams,
    }

    if (updateUserParams.password) {
      const hashedPassword = await bcrypt.hash(updateUserParams.password, 10)

      user.password = hashedPassword
    }

    //3. chamar o repository para atualizar o o usuario
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository()
    const updateUser = await postgresUpdateUserRepository.execute(userId, user)

    return updateUser
  }
}
