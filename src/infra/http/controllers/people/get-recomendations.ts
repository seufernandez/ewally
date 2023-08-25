import { makeGetRecommendationsUseCase } from "@/application/use-cases/factories/make-get-recommendations";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getRecommendationsController(request: FastifyRequest,  reply: FastifyReply): Promise<void> {
  const registerParamsSchema = z.object({
    cpf:  z.string().length(11),
  })
  const { cpf } = registerParamsSchema.parse(request.params);

  try {
    const getRecommendationsUseCase = makeGetRecommendationsUseCase()

    const personRecommendations = await getRecommendationsUseCase.execute({cpf})
    return reply.status(200).send(personRecommendations);
  } catch (err) {
    return reply.status(404).send();
  }
}
