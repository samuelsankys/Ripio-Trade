import { BankAccount } from '../domain/bank-account';

export interface IBankAccountRepository {
  create(bankAccount: BankAccount): Promise<boolean>;
}
