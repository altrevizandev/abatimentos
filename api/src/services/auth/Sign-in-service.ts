import { compare } from "bcryptjs";
import { AccountRepository } from "../../repositories/Account-repository.js";
import { ApiError } from "../../utils/ApiError.js";

export class SignInService {
  public name: string = "";
  public email: string = "";
  public password: string = "";

  private readonly accountRepository: AccountRepository;
  
  constructor() {
    this.accountRepository = new AccountRepository();
  }

  public async execute() {
    this.accountRepository.email = this.email;
    this.accountRepository.password = this.password;

    const account = await this.accountRepository.findByEmail();

    if (!account) {
      throw new ApiError("E-mail ou senha invalidos", 404);
    }

    let hashed_password = await compare(this.password, account.password);

    if (!hashed_password) {
      throw new ApiError("E-mail ou senha invalidos", 404);
    }

    return {
      id: account.id,
      name: account.name,
      email: account.email,
      cnpj: "",
      created_at: account.created_at,
      updated_at: account.updated_at
    };
  }
}
