import { BankAccount as BankAccountPrisma } from '@prisma/client';

import { BankAccount } from '../domain/bank-account';
import { BankAccountDTO } from '../dtos/bank-account.DTO';

export class BankAccountMapper {
  public static toDTO(bankAccount: BankAccount): BankAccountDTO {
    return {
      id: bankAccount.id,
      ...bankAccount.props,
    };
  }

  static toDomain(raw: BankAccountPrisma): BankAccount {
    const bankAccountOrError = BankAccount.create(
      {
        name: raw.name,
        email: raw.email,
        agency: +raw.agency,
        account: +raw.account,
        accountDigit: +raw.accountDigit,
        currentBalance: +raw.currentBalance,
        createdAt: raw.createdAt,
      },
      raw.id,
    );

    return bankAccountOrError;
  }

  static toPersistence(bankAccount: BankAccount) {
    return {
      id: bankAccount.id,
      name: bankAccount.name,
      email: bankAccount.email,
      agency: bankAccount.agency,
      account: bankAccount.account,
      accountDigit: bankAccount.accountDigit,
      currentBalance: bankAccount.currentBalance,
      createdAt: bankAccount.createdAt,
      updatedAt: bankAccount.updatedAt,
    };
  }
}
