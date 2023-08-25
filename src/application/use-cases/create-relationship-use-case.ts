import { UsersRepository } from '../domain/users-repository';
import { CreateRelationshipBody } from './../../infra/dto/create-relationship-body';
export class CreateRelationshipUseCase {

  constructor(private personsRepository: UsersRepository){
  }
  async execute({cpf1, cpf2}:CreateRelationshipBody){
    const foundCpf1 = await this.personsRepository.findByCPF(cpf1)
    const foundCpf2 =  await this.personsRepository.findByCPF(cpf2)

    if (!foundCpf1 || !foundCpf2) {
      throw new Error('One cpf is missing in Database')
    }
    
    await this.personsRepository.createRelationship(cpf1, cpf2)
  }
}
