
export class DeleteUserUseCase {
  constructor(deletedUserRepository){
    this.deletedUserRepository = deletedUserRepository
  }
  async execute(userId) {

    const deletedUser = this.deletedUserRepository.execute(userId)

    return deletedUser
  }
}
