import { BankAccount as BankAccountPrisma } from '@prisma/client';

import { BankAccount } from '../domain/bank-account';

export class BankAccountMapper {
  static toDomain(raw: BankAccountPrisma): BankAccount {
    const bankAccountOrError = BankAccount.create(
      {
        customerId: raw.customerId,
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
      customerId: bankAccount.customerId,
      agency: bankAccount.agency,
      account: bankAccount.account,
      accountDigit: bankAccount.accountDigit,
      currentBalance: bankAccount.currentBalance,
      createdAt: bankAccount.createdAt,
      updatedAt: bankAccount.updatedAt,
    };
  }
}
