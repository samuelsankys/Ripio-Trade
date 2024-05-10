import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma/prisma-service.module';
import { MakeDepositUseCase } from './use-cases/make-deposit/make-deposit.usecase';
import { MakeDepositController } from './use-cases/make-deposit/make-deposit.controller';
import { PgTransactionRepository } from './repositories/postgres/pg-transaction.repository';
import { ITransactionRepository } from './repositories/transaction-repository.interface';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { MakeWithDrawalController } from './use-cases/make-withdrawal/make-withdrawal.controller';
import { MakeWithDrawalUseCase } from './use-cases/make-withdrawal/make-withdrawal.usecase';
import { TransferUseCase } from './use-cases/transfer/transfer.usecase';
import { TransferController } from './use-cases/transfer/transfer.controller';
import { AccountStatementUseCase } from './use-cases/account-statement/account-statement.usecase';
import { AccountStatementController } from './use-cases/account-statement/account-statement.controller';

@Module({
  imports: [BankAccountModule],
  controllers: [
    MakeDepositController,
    MakeWithDrawalController,
    TransferController,
    AccountStatementController,
  ],
  providers: [
    PrismaService,
    MakeDepositUseCase,
    MakeWithDrawalUseCase,
    TransferUseCase,
    AccountStatementUseCase,
    {
      provide: ITransactionRepository,
      useClass: PgTransactionRepository,
    },
  ],
})
export class TransactionModule {}
