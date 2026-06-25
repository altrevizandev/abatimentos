import { hash } from "bcryptjs";
import { prisma } from "../infra/prisma/index.js";
import type { PrismaTransactionClient } from "./index.js";

export class AccountRepository {
  public name: string = "";
  public email: string = "";
  public password: string = "";
  
  constructor(
    private readonly prismaClient: PrismaTransactionClient = prisma
  ) {}

  public async create() {
    let hashed_password = await hash(this.password, 12);

    const account = this.prismaClient.account.create({
      data: {
        name: this.name,
        email: this.email,
        password: hashed_password
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      }
    });

    return account;
  }

  public async findById() {

  }
  
  public async findByEmail() {
    const account = await this.prismaClient.account.findUnique({
      where: { email: this.email }
    });

    return account;
  }

  public async deleteById() {

  }

  public async list() {

  }
}
