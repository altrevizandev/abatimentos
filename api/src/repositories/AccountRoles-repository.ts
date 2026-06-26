import { prisma } from "../infra/prisma/index.js";
import type { PrismaTransactionClient } from "./index.js";
import { RoleRepository } from "./Role-repository.js";
import { ApiError } from "../utils/ApiError.js";

export class AccountRoleRepository {
  public account_id: number = 0;
  public role_id: number = 0;
  private readonly roleRepository: RoleRepository;
  
  constructor(
    private readonly prismaClient: PrismaTransactionClient = prisma
  ) {
    this.roleRepository = new RoleRepository();
  }

  public async createAccountRole(account_type: string) {
    const role = await this.roleRepository.findBySlug(account_type);

    if (!role) {
      throw new ApiError("Função não encontrada", 500);
    }

    const account = this.prismaClient.accountRoles.create({
      data: {
        account_id: this.account_id,
        role_id: role.id
      }
    });

    return account;
  }

  public async findByAccountId() {
    return await this.prismaClient.accountRoles.findUnique({
      where: { id: this.account_id },
      include: {
        role: true,
      }
    });
  }

  public async deleteById() {

  }

  public async list() {

  }
}
