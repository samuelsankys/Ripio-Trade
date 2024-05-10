import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './shared/infra/database/prisma/prisma-service.module';
import { BankAccountModule } from './modules/bank-account/bank-account.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [BankAccountModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
