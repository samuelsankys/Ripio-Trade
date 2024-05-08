import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/infra/database/prisma/prisma-service.module';
import { TransactionMapper } from '../../mappers/transaction.map';
import { Transaction } from '../../domain/transaction';
import { ITransactionRepository } from '../transaction-repository.interface';

@Injectable()
export class PgTransactionRepository implements ITransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(transaction: Transaction): Promise<boolean> {
    const data = TransactionMapper.toPersistence(transaction);
    const result = await this.prisma.transactionHistory.create({
      data,
    });
    return !!result;
  }
}
