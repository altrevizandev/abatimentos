import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest
} from "fastify";
import { z } from 'zod';
import { SignInController, type SignInRequest } from "../controllers/auth/Sign-in-controller.js";
import { SignOutController } from "../controllers/auth/Sign-out-controller.js";

export async function AuthRoutes(
  fastify: FastifyInstance
) {
  const signInController = new SignInController();
  const signOutController = new SignOutController();

  const ErrorResponseSchema = z.object({
    status: z.literal("ERROR"),
    message: z.string()
  });

  fastify.post(
    "/auth/sign-in",
    {
      schema: {
        tags: ["Autenticação"],
        description: "Endpoint responsável por fazer a autenticação dos usuários",
        body: z.object({
          email: z.string(),
          password: z.string()
        }),
        response: {
          200: z.object({
            account: z.object({
              name: z.string(),
              email: z.string(),
              id: z.number(),
              created_at: z.date(),
              updated_at: z.date(),
            })
          }),

          400: ErrorResponseSchema,

          500: ErrorResponseSchema
        }
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return signInController.handle(request as FastifyRequest<SignInRequest>, reply);
    }
  );

  fastify.post(
    "/auth/me",
    {
      schema: {
        tags: ["Autenticação"],
        description: "Endpoint responsável por trazer os detalhes do usuário",
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
      return reply.send({ message: "Rodando "});
    }
  );

  fastify.post(
    "/auth/sign-out",
    {
      schema: {
        tags: ["Autenticação"],
        description: "Endpoint responsável por remover a sessão do usuário",
        response: {
          204: z.object({
            message: z.string()
          }),

          400: ErrorResponseSchema,

          500: ErrorResponseSchema
        }
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return signOutController.handle(request, reply);
    }
  );
}
