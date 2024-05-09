import { Entity } from 'src/shared/application/domain/entity';

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
}
