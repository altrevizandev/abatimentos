import { prisma } from "../infra/prisma/index.js";
import type { PrismaTransactionClient } from "./index.js";

export class RoleRepository {
  public name: string = "";
  
  constructor(
    private readonly prismaClient: PrismaTransactionClient = prisma
  ) {}

  public create() {

  }

  public findById() {

  }
  
  public findByEmail() {
    
  }

  public deleteById() {

  }

  public list() {

  }
}