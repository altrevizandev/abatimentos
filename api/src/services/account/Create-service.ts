import { AccountRepository } from "../../repositories/Account-repository.js";
import { AccountRoleRepository } from "../../repositories/AccountRoles-repository.js";
import { RoleRepository } from "../../repositories/Role-repository.js";
import { ApiError } from "../../utils/ApiError.js";

export class CreateAccountService {
  public name: string = "";
  public email: string = "";
  public password: string = "";
  public role: string = "";

  private readonly accountRepository: AccountRepository;
  private readonly accountRoleRepository: AccountRoleRepository;
  private readonly roleRepository: RoleRepository;
  
  constructor() {
    this.accountRepository = new AccountRepository();
    this.accountRoleRepository = new AccountRoleRepository();
    this.roleRepository = new RoleRepository();
  }

  public async execute() {
    this.accountRepository.name = this.name;
    this.accountRepository.email = this.email;
    this.accountRepository.password = this.password;

    const accountExists = await this.accountRepository.findByEmail();
 
    if (accountExists) {
      throw new ApiError("Já existe uma conta com esse e-mail cadastrado", 400);
    }

    const account = await this.accountRepository.create();

    this.roleRepository.slug = this.role;

    const role = await this.roleRepository.findBySlug();

    if (!role) {
      throw new ApiError("Função não encontrada", 404);
    }

    this.accountRoleRepository.account_id = account.id;
    this.accountRoleRepository.role_id = role.id;

    await this.accountRoleRepository.createAccountRole();

    return account;
  }
}