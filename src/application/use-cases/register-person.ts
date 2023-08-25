
import { CreatePersonBody } from '@/infra/dto/create-person-body';
import { UsersRepository } from '../domain/users-repository';

export class RegisterPersonUseCase {
  constructor(private personsRepository: UsersRepository){
  }

  async execute({cpf, name}:CreatePersonBody){
    const personAlreadyExists = await this.personsRepository.findByCPF(cpf)
    if(personAlreadyExists){
      throw new Error('Person already exists!')
    }
  
    await this.personsRepository.create({
      cpf, name
    })
  }
}


