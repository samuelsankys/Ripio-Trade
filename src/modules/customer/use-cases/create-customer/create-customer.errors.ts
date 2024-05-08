import { UseCaseError } from 'src/shared/application/use-case.error';

export namespace CreateCustomerErrors {
  export class CustomerAlreadyExistsError extends UseCaseError {
    constructor() {
      super('Customer already exists.');
    }
  }
}
