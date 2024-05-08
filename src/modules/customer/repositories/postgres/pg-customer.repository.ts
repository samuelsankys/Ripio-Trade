import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/infra/database/prisma/prisma-service.module';
import { ICustomerRepository } from '../customer-repository.interface';
import { CustomerMapper } from '../../mappers/customer.map';
import { Customer } from '../../domain/customer';

@Injectable()
export class PgCustomerRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async exists(email: string): Promise<boolean> {
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });
    return !!customer;
  }

  async create(customer: Customer): Promise<boolean> {
    const data = CustomerMapper.toPersistence(customer);
    const result = await this.prisma.customer.create({
      data,
    });
    return !!result;
  }
}
