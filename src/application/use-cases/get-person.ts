
import { UsersRepository } from '../domain/users-repository';
interface GetPersonUseCaseProps {
  cpf: string
}

export class GetPersonUseCase {
  constructor(private personsRepository: UsersRepository){
  }

  async execute({cpf}:GetPersonUseCaseProps){
    const foundPerson = await this.personsRepository.findByCPF(cpf)

    if(!foundPerson){
      throw new Error('Person does not exists!')
    }
    
    return foundPerson
  }

}
