import { prisma } from "../infra/prisma/index.js";
import type { PrismaTransactionClient } from "./index.js";

export class AccountInfoRepository {
  public cnpjs: string[] = [""];
  public account_id: number = 0;
  
  constructor(
    private readonly prismaClient: PrismaTransactionClient = prisma
  ) {}

  protected async dataForCreation() {
    let data_for_creation: {
      cnpj: string;
      account_id: number;
    }[] = [];

    this.cnpjs.forEach((cnpj) => {
      data_for_creation.push({
        account_id: this.account_id,
        cnpj,
      });
    });

    return data_for_creation;
  }

  public async create() {
    let data_for_creation = await this.dataForCreation();
    
    const accounts = await this.prismaClient.accountInfo.createMany({
      data: data_for_creation
    });
  
    return accounts;
  }

  public async deleteById() {

  }

  public async list() {

  }
}