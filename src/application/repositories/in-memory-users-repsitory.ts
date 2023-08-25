import { User } from "@/application/entities/user";
import { UsersRepository } from "../domain/users-repository";
import { Relationship } from "../entities/relationship";

export class InMemoryUsersRepository extends UsersRepository {
  private users: User[] = [];

  private relationships: Relationship[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByCPF(userCPF: string): Promise<User | null> {
    return this.users.find(user => user.cpf === userCPF) || null;
  }

  async DeleteAllUsersAndRelationships(): Promise<void> {
    this.users = [];
  }

  async getPersonRelations(cpf: string): Promise<Relationship[]> {
    const userFriendships = this.relationships.filter(friendship =>
      friendship.cpf1 === cpf || friendship.cpf2 === cpf
    );

    return userFriendships
  }

  async createRelationship(cpf1: string, cpf2: string): Promise<void> {
    const newRelationship = { cpf1, cpf2 };

    this.relationships.push(newRelationship); 
  }
}
