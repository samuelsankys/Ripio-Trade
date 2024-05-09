import { Injectable } from '@nestjs/common';
import { BankAccount } from '../../domain/bank-account';
import { BankAccountMapper } from '../../mappers/bank-account.map';
import { IBankAccountRepository } from '../bank-account-repository.interface';
import { PrismaService } from 'src/shared/infra/database/prisma/prisma-service.module';

@Injectable()
export class PgBankAccountRepository implements IBankAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<BankAccount> {
    const result = await this.prisma.bankAccount.findUnique({
      where: { id },
    });
    return result ? BankAccountMapper.toDomain(result) : null;
  }

  async exists(email: string): Promise<boolean> {
    const result = await this.prisma.bankAccount.findUnique({
      where: { email },
    });
    return !!result;
  }

  async create(bankAccount: BankAccount): Promise<BankAccount | null> {
    const data = BankAccountMapper.toPersistence(bankAccount);
    const result = await this.prisma.bankAccount.create({
      data,
    });
    return !!result ? BankAccountMapper.toDomain(result) : null;
  }
}
