import { AccountRepository } from "../../repositories/Account-repository.js";
import { AccountRoleRepository } from "../../repositories/AccountRoles-repository.js";
import { RoleRepository } from "../../repositories/Role-repository.js";
import { ApiError } from "../../utils/ApiError.js";
import { SendEmailService } from "../email/send-email-service.js";

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

    const accountExists = await this.accountRepository.findByEmail();

    if (accountExists) {
      throw new ApiError("Já existe uma conta com esse e-mail cadastrado", 400);
    }

    this.accountRepository.password = await this.generatePassword();

    const account = await this.accountRepository.create();

    this.roleRepository.slug = this.role;

    const role = await this.roleRepository.findBySlug();

    if (!role) {
      throw new ApiError("Função não encontrada", 404);
    }

    this.accountRoleRepository.account_id = account.id;
    this.accountRoleRepository.role_id = role.id;

    await this.accountRoleRepository.createAccountRole();

    const sendEmailService = new SendEmailService();

    sendEmailService.from = process.env.MAIL_FROM!;
    sendEmailService.subject = "Abatimentos Tirol - Criação de Conta";
    sendEmailService.to = this.email;
    sendEmailService.html = `<p>A sua senha inicial para acessar sua conta no portal de abatimentos Tirol é <strong>Guatemala15</strong></p>`;

    await sendEmailService.execute();

    return account;
  }

  public async generatePassword() {
    let pass_chars = process.env.PASS_CHARS!;
    let pass_numbers = process.env.PASS_NUMBERS!;
    let pass_special_chars = process.env.PASS_SPECIAL_CHARS!;

    let new_password = "";

    while(new_password.length < 6) {
      let char_index = Math.floor(Math.random() * pass_chars.length);

      if (new_password.includes(pass_chars[char_index]!)) {
        continue;
      }

      new_password += pass_chars[char_index];
    }

    while(new_password.length < 7) {      
      let number_index = Math.floor(Math.random() * pass_numbers.length);

      if (new_password.includes(pass_numbers[number_index]!)) {
        continue;
      }

      new_password += pass_numbers[number_index];
    }

    while (new_password.length < 8) {
      let special_index = Math.floor(Math.random() * pass_special_chars.length);

      if (new_password.includes(pass_special_chars[special_index]!)) {
        continue;
      }
      
      new_password += pass_special_chars[special_index];
    }

    return new_password;
  }
}