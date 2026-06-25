import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest
} from "fastify";
import { z } from 'zod';
import { CreateAccountController, type CreateAccountRequest } from "../controllers/account/Create-controller.js";
import { AccountAddCnpjsController, type AccountAddCnpjsRequest } from "../controllers/account/AddCnpjs-controller.js";

export async function AccountRoutes(
  fastify: FastifyInstance
) {
  const createAccountController = new CreateAccountController();
  const accountAddCnpjsController = new AccountAddCnpjsController();

  const ErrorResponseSchema = z.object({
    status: z.literal("ERROR"),
    message: z.string()
  });

  fastify.post(
    "/account",
    {
      schema: {
        tags: ["Contas de Acesso"],
        description: "Endpoint responsável por criar uma conta",
        body: z.object({
          name: z.string(),
          email: z.string(),
          password: z.string()
        }),
        response: {
          201: z.object({
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
      return createAccountController.handle(request as FastifyRequest<CreateAccountRequest>, reply);
    }
  );
  
  fastify.post(
    "/account/add-cnpjs",
    {
      schema: {
        tags: ["Contas de Acesso"],
        description: "Endpoint responsável por adicionar CNPJs a uma conta",
        body: z.object({
          cnpjs: z.array(z.string().min(14, "O CNPJ deve conter 14 caracteres")),
          account_id: z.number()
        }),
        response: {
          201: z.object({
            count: z.number()
          }),

          400: ErrorResponseSchema,

          500: ErrorResponseSchema
        }
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return accountAddCnpjsController.handle(request as FastifyRequest<AccountAddCnpjsRequest>, reply);
    }
  );
}
