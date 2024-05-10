import { Injectable } from '@nestjs/common';
import { BankAccount } from '../../domain/bank-account';
import { IBankAccountRepository } from '../bank-account-repository.interface';

@Injectable()
export class InMemoryBankAccountRepository implements IBankAccountRepository {
  private readonly bankAccounts: Map<string, BankAccount>;

  constructor() {
    this.bankAccounts = new Map<string, BankAccount>();
  }

  async findById(id: string): Promise<BankAccount> {
    return this.bankAccounts.get(id) || null;
  }

  async exists(email: string): Promise<BankAccount> {
    for (const [, bankAccount] of this.bankAccounts) {
      if (bankAccount.email === email) {
        return bankAccount;
      }
    }
    return null;
  }

  async update(bankAccount: BankAccount): Promise<BankAccount | null> {
    if (this.bankAccounts.has(bankAccount.id)) {
      this.bankAccounts.set(bankAccount.id, bankAccount);
      return bankAccount;
    }
    return null;
  }

  async create(bankAccount: BankAccount): Promise<BankAccount | null> {
    if (!this.bankAccounts.has(bankAccount.id)) {
      this.bankAccounts.set(bankAccount.id, bankAccount);
      return bankAccount;
    }
    return null;
  }
}
