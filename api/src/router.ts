import { type FastifyInstance } from 'fastify';
import { AuthRoutes } from './routers/auth.routes.js';
import { AccountRoutes } from './routers/account.routes.js';

export async function router(fastify: FastifyInstance) {
  fastify.register(AccountRoutes);
  fastify.register(AuthRoutes);
}