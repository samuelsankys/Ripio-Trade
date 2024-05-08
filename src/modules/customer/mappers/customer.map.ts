import { Customer as CustomerPrisma } from '@prisma/client';
import { Customer } from '../domain/customer';

export class CustomerMapper {
  static toDomain(raw: CustomerPrisma): Customer {
    const customerOrError = Customer.create(
      {
        name: raw.name,
        email: raw.email,
      },
      raw.id,
    );

    return customerOrError;
  }

  static toPersistence(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }
}
