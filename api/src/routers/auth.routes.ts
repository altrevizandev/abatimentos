import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest
} from "fastify";
import { z } from 'zod';

export async function AuthRoutes(
  fastify: FastifyInstance
) {
  const ErrorResponseSchema = z.object({
    status: z.literal("ERROR"),
    message: z.string()
  });

  fastify.post(
    "/auth/sign-out",
    {
      schema: {
        tags: ["Authentication"],
        description: "Endpoint responsible for the sign out",
        response: {
          200: z.object({
            message: z.string()
          }),

          400: ErrorResponseSchema,

          500: ErrorResponseSchema
        }
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.send({ msg: "Rodando "});
    }
  );
}