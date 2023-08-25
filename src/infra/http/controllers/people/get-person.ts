import { makeGetPersonUseCase } from "@/application/use-cases/factories/make-get-person-use-case";
import { GetPersonUseCase } from "@/application/use-cases/get-person";
import { PersonsRepository } from "@/database/in-memory-db";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPersonController(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    cpf: z.string().length(11),
  });

  try {
    const getPersonUseCase = makeGetPersonUseCase()
    const { cpf } = registerParamsSchema.parse(request.params);
    const foundPerson = await getPersonUseCase.execute({ cpf });
    return reply.status(200).send(foundPerson);
  } catch (err) {
    return reply.status(404).send();
  }
}
