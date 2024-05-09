import { UseCaseError } from 'src/shared/application/use-case.error';

export namespace CreateBankAccountErrors {
  export class BankAccountAlreadyExistsError extends UseCaseError {
    constructor() {
      super('Account already exists.');
    }
  }
}
