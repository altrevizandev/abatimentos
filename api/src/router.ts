import { type FastifyInstance } from 'fastify';
import { AuthRoutes } from './routers/auth.routes';

export async function router(fastify: FastifyInstance) {
  fastify.register(AuthRoutes);
}