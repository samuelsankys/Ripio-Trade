import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma/prisma-service.module';
import { CreateBankAccountController } from './use-cases/create-bank-account/create-bank-account.controller';
import { IBankAccountRepository } from './repositories/bank-account-repository.interface';
import { PgBankAccountRepository } from './repositories/postgres/pg-bank-account.repository';
import { CreateBankAccountUseCase } from './use-cases/create-bank-account/create-bank-account.usecase';
import { GetAccountBalanceController } from './use-cases/get-account-balance/get-account-balance.controller';
import { GetAccountBalanceUseCase } from './use-cases/get-account-balance/get-account-balance.usecase';

@Module({
  controllers: [CreateBankAccountController, GetAccountBalanceController],
  providers: [
    PrismaService,
    CreateBankAccountUseCase,
    GetAccountBalanceUseCase,
    {
      provide: IBankAccountRepository,
      useClass: PgBankAccountRepository,
    },
  ],
  exports: [IBankAccountRepository],
})
export class BankAccountModule {}
