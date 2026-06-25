import { AccountRepository } from "../../repositories/Account-repository.js";
import { ApiError } from "../../utils/ApiError.js";

export class CreateAccountService {
  public name: string = "";
  public email: string = "";
  public password: string = "";

  private readonly accountRepository: AccountRepository;
  
  constructor() {
    this.accountRepository = new AccountRepository();
  }

  public async execute() {
    this.accountRepository.name = this.name;
    this.accountRepository.email = this.email;
    this.accountRepository.password = this.password;

    const accountExists = await this.accountRepository.findByEmail();

    console.log(accountExists);

    if (accountExists) {
      throw new ApiError("Já existe uma conta com esse e-mail cadastrado", 400);
    }

    const account = await this.accountRepository.create();

    return account;
  }
}