import { UsersRepository } from '../domain/users-repository';
export class DeleteAllUsersAndRelationshipsUseCase {
  constructor(private personsRepository: UsersRepository){
  }
  async execute(){
    await this.personsRepository.DeleteAllUsersAndRelationships()
  }
}
