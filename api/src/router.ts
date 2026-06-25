import { type FastifyInstance } from 'fastify';
import { AuthRoutes } from './routers/auth.routes.js';

export async function router(fastify: FastifyInstance) {
  fastify.register(AuthRoutes);
}