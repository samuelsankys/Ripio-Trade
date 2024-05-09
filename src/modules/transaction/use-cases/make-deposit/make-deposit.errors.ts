import { UseCaseError } from 'src/shared/application/use-case.error';

export namespace MakeDepositErrors {
  export class BankAccountNotExistsError extends UseCaseError {
    constructor() {
      super('Account not exists.');
    }
  }
}
