import { Entity } from 'src/shared/application/domain/entity';
import { Either, left, right } from 'src/shared/application/either';
import { AmountUnder1, InsufficientFunds } from './error/bank-account.errors';

interface BankAccountProps {
  name: string;
  email: string;
  agency: number;
  account: number;
  accountDigit: number;
  currentBalance?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BankAccount extends Entity<BankAccountProps> {
  private beforeOperationBalance: number | undefined;
  private afterOperationBalance: number | undefined;

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get agency(): number {
    return this.props.agency;
  }

  get account(): number {
    return this.props.account;
  }

  get accountDigit(): number {
    return this.props.accountDigit;
  }

  get currentBalance(): number {
    return this.props.currentBalance;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: BankAccountProps, id?: string) {
    super(props, id);
  }

  public static create(props: BankAccountProps, id?: string): BankAccount {
    const bankAccount = new BankAccount(
      {
        ...props,
        agency: props.agency ?? 1,
        currentBalance: props.currentBalance ?? 0,
        updatedAt: props.updatedAt ?? new Date(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return bankAccount;
  }

  public deposit(
    value: number,
  ): Either<InsufficientFunds | AmountUnder1, boolean> {
    if (value < 1) return left(new AmountUnder1());
    this.beforeOperationBalance = this.props.currentBalance;
    this.props.currentBalance += value;
    this.afterOperationBalance = this.props.currentBalance;
  }

  public withdrawal(
    value: number,
  ): Either<InsufficientFunds | AmountUnder1, boolean> {
    if (value < 1) return left(new AmountUnder1());
    if (value > this.props.currentBalance) return left(new InsufficientFunds());
    this.beforeOperationBalance = this.props.currentBalance;
    this.props.currentBalance -= value;
    this.afterOperationBalance = this.props.currentBalance;

    return right(true);
  }

  public getBalance() {
    return this.props.currentBalance;
  }

  public getBeforeOperationBalance() {
    return this.beforeOperationBalance;
  }

  public getAfterOperationBalance() {
    return this.afterOperationBalance;
  }
}
