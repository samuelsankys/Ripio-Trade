import { Customer } from 'src/modules/customer/domain/customer';
import { ICustomerRepository } from 'src/modules/customer/repositories/customer-repository.interface';
import { CreateCustomerDTO } from './create-customer.DTO';
import { CreateCustomerErrors } from './create-customer.errors';
import { Either, left } from 'src/shared/application/either';

export type CreateCompanyResponse = Either<
  CreateCustomerErrors.CustomerAlreadyExistsError | Error,
  CreateCustomerDTO
>;

export class CreateCustomerUseCase {
  constructor(private readonly customerRepo: ICustomerRepository) {}

  public async execute(
    request: CreateCustomerDTO,
  ): Promise<CreateCompanyResponse> {
    const customerAlreadyExists = this.customerRepo.exists(request.email);
    if (customerAlreadyExists)
      return left(new CreateCustomerErrors.CustomerAlreadyExistsError());

    const customerOrError = Customer.create({
      name: request.name,
      email: request.email,
    });

    await this.customerRepo.create(customerOrError);
    // return right(customerOrError);
  }
}
