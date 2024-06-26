import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/infra/database/prisma/prisma-service.module';
import { TransactionMapper } from '../../mappers/transaction.map';
import { Transaction } from '../../domain/transaction';
import {
  ITransactionRepository,
  TransactionFilterOptions,
} from '../transaction-repository.interface';

@Injectable()
export class PgTransactionRepository implements ITransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async filter(
    bankAccountId: string,
    options: TransactionFilterOptions,
  ): Promise<Transaction[]> {
    const { fromDate, toDate, pageSize, pageNumber } = options;
    const where: any = {
      bankAccountId,
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
    };
    const skip = (pageNumber - 1) * pageSize;

    const result = await this.prisma.transactionHistory.findMany({
      where,
      take: pageSize,
      skip,
    });

    return result.map((t) => TransactionMapper.toDomain(t));
  }

  async filterCount(
    bankAccountId: string,
    options: TransactionFilterOptions,
  ): Promise<number> {
    const { fromDate, toDate } = options;
    const where: any = {
      bankAccountId,
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
    };
    const count = await this.prisma.transactionHistory.count({ where });
    return count;
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const data = TransactionMapper.toPersistence(transaction);
    const result = await this.prisma.transactionHistory.create({
      data,
    });
    return !!result ? TransactionMapper.toDomain(result) : null;
  }

  async transfer(
    sendTransfer: Transaction,
    receiverTransfer: Transaction,
  ): Promise<Transaction> {
    const dataSend = TransactionMapper.toPersistence(sendTransfer);
    const dataReceiver = TransactionMapper.toPersistence(receiverTransfer);
    const amountTransfer = dataReceiver.amount;
    const result = await this.prisma.$transaction(async (tx) => {
      const sender = await tx.bankAccount.update({
        data: {
          currentBalance: {
            decrement: amountTransfer,
          },
        },
        where: {
          id: sendTransfer.bankAccountId,
        },
      });

      if (+sender.currentBalance < 0) {
        throw new Error(`Insufficient funds`);
      }

      await tx.bankAccount.update({
        data: {
          currentBalance: {
            increment: amountTransfer,
          },
        },
        where: {
          id: sendTransfer.bankAccountId,
        },
      });

      await tx.transactionHistory.create({ data: dataSend });
      return await tx.transactionHistory.create({ data: dataReceiver });
    });

    return !!result ? TransactionMapper.toDomain(result) : null;
  }
}
