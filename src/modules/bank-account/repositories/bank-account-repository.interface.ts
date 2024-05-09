import { BankAccount } from '../domain/bank-account';

export abstract class IBankAccountRepository {
  abstract exists(email: string): Promise<boolean>;
  abstract findById(id: string): Promise<BankAccount>;
  abstract create(bankAccount: BankAccount): Promise<BankAccount | null>;
}
