import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateAccountService } from "../../services/account/Create-service.js";

type CreateAccountData = {
  name: string;
  email: string;
  password: string;
}

export type CreateAccountRequest = {
  Body: CreateAccountData
}

export class CreateAccountController {
  private readonly createAccountService: CreateAccountService;
  
  constructor() {
    this.createAccountService = new CreateAccountService();
  }

  public async handle(request: FastifyRequest<CreateAccountRequest>, reply: FastifyReply) {
    const {
      name,
      email,
      password
    } = request.body;

    this.createAccountService.name = name;
    this.createAccountService.email = email;
    this.createAccountService.password = password;

    const account = await this.createAccountService.execute();

    console.log("Conta criada");
    console.log({
      account
    });

    return reply.code(201).send({
      account,
    });
  }

}
