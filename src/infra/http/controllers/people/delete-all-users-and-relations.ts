import { DeleteAllUsersAndRelationshipsUseCase } from "@/application/use-cases/delete-all-users-and-relationships-use-case";
import { PersonsRepository } from "@/database/in-memory-db";
import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteAllUsersAndRelationshipsController(req: FastifyRequest,  reply: FastifyReply): Promise<void> {
  try {
     new DeleteAllUsersAndRelationshipsUseCase(PersonsRepository)
    return reply.status(204).send();
  } catch (err) {
    // return reply.status(404).send();
  }
}
