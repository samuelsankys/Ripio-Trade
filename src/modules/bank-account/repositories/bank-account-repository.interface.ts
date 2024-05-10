import { BankAccount } from '../domain/bank-account';

export abstract class IBankAccountRepository {
  abstract exists(email: string): Promise<BankAccount>;
  abstract findById(id: string): Promise<BankAccount>;
  abstract create(bankAccount: BankAccount): Promise<BankAccount | null>;
  abstract update(bankAccount: BankAccount): Promise<BankAccount | null>;
}
