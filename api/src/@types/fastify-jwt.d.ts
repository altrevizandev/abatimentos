import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      sub: number;
      cnpj: string;
    };

    user: {
      sub: number;
      cnpj: string;
    };
  }
}