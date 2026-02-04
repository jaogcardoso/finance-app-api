import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class UpdateUserUseCase {
  constructor(getUserByEmailRepository, updateUserRepository) {
    this.getUserByEmailRepository = getUserByEmailRepository
    this.updateUserRepository = updateUserRepository
  }
  async execute(userId, updateUserParams) {
    //1. se o email estiver sendo atualizado, verifica se ja esta em uso
    if (updateUserParams.email) {
      const userWithProvideEmail = await this.getUserByEmailRepository.execute(
        updateUserParams.email,
      )

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

    const updateUser = await this.updateUserRepository.execute(userId, user)

    return updateUser
  }
}
