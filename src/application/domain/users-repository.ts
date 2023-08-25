import { Relationship } from "../entities/relationship";
import { User } from "../entities/user";

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findByCPF(userCPF: string): Promise<User | null>;
  abstract DeleteAllUsersAndRelationships(): Promise<void>;
  abstract getPersonRelations(cpf: string): Promise<Relationship[]>;
  abstract createRelationship(cpf1: string, cpf2: string): Promise<void>;
}