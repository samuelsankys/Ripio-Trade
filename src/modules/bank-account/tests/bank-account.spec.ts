import { BankAccount } from 'src/modules/bank-account/domain/bank-account';
import {
  AmountUnder1,
  InsufficientFunds,
} from 'src/modules/bank-account/domain/error/bank-account.errors';

describe('BankAccount - Domain', () => {
  let bankAccount: BankAccount;
  beforeEach(() => {
    bankAccount = BankAccount.create({
      name: 'any_name',
      email: 'any@example.com',
      agency: 1234,
      account: 567890,
      accountDigit: 1,
      currentBalance: 5,
    });
  });

  it('should deposit money into the account correctly', () => {
    bankAccount.deposit(50);

    expect(bankAccount.getBalance()).toBe(55);
    expect(bankAccount.getBeforeOperationBalance()).toBe(5);
    expect(bankAccount.getAfterOperationBalance()).toBe(55);
  });

  it('should correctly withdraw money from the account', () => {
    const result = bankAccount.withdrawal(5);

    expect(bankAccount.getBalance()).toBe(0);
    expect(bankAccount.getBeforeOperationBalance()).toBe(5);
    expect(bankAccount.getAfterOperationBalance()).toBe(0);
    expect(result.isRight()).toBe(true);
  });

  it('should left throw deposit negative number', () => {
    const result = bankAccount.deposit(-4);

    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(AmountUnder1);
  });

  it('should left throw deposit zero number', () => {
    const result = bankAccount.deposit(0);
    console.log({ result });

    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(AmountUnder1);
  });

  it('should left throw AmountUnder1 error deposit negative number', () => {
    const result = bankAccount.deposit(-4);

    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(AmountUnder1);
  });

  it('should left throw InsufficientFunds error when withdrawing more than available balance', () => {
    const result = bankAccount.withdrawal(200);

    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(InsufficientFunds);
  });
});
