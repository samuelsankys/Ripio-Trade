import { Customer } from '../domain/customer';

export interface ICustomerRepository {
  exists(email: string): Promise<boolean>;
  create(customer: Customer): Promise<boolean>;
}
