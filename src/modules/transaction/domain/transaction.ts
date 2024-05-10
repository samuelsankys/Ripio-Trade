import { Entity } from 'src/shared/application/domain/entity';
import { TransactionStatusEnum } from './transaction-status';
import { TransactionTypeEnum } from './transaction-type';

interface TransactionProps {
  bankAccountId: string;
  type: TransactionTypeEnum;
  amount?: number;
  beforeBalance?: number;
  afterBalance?: number;
  status: TransactionStatusEnum;
  transferId?: string;
  failingReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Transaction extends Entity<TransactionProps> {
  get bankAccountId(): string {
    return this.props.bankAccountId;
  }

  get type(): TransactionTypeEnum {
    return this.props.type;
  }

  get amount(): number | undefined {
    return this.props.amount;
  }

  get beforeBalance(): number | undefined {
    return this.props.beforeBalance;
  }

  get afterBalance(): number | undefined {
    return this.props.afterBalance;
  }

  get status(): TransactionStatusEnum {
    return this.props.status;
  }

  get transferId(): string | undefined {
    return this.props.transferId;
  }

  get failingReason(): string | undefined {
    return this.props.failingReason;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private constructor(props: TransactionProps, id?: string) {
    super(props, id);
  }

  public static create(props: TransactionProps, id?: string): Transaction {
    const transaction = new Transaction(
      {
        ...props,
        status: props.status ?? TransactionStatusEnum.PENDING,
        updatedAt: props.updatedAt ?? new Date(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return transaction;
  }
}
