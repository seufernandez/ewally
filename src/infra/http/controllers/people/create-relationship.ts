import { makeCreateRelationshipUseCase } from "@/application/use-cases/factories/make-create-relationship";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createRelationshipController(request: FastifyRequest,  reply: FastifyReply): Promise<void> {
  const registerBodySchema = z.object({
    cpf1:  z.string().length(11),
    cpf2:  z.string().length(11),
  })
  const {cpf1, cpf2} = registerBodySchema.parse(request.body);

  try {
    const createRelationshipUseCase = makeCreateRelationshipUseCase()

    await createRelationshipUseCase.execute({cpf1, cpf2})
    return reply.status(200).send();
  } catch (err) {
    return reply.status(404).send();
  }
}
