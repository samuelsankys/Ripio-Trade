import { UseCaseError } from 'src/shared/application/use-case.error';

export namespace GetAccountBalanceErrors {
  export class BankAccountNotExistsError extends UseCaseError {
    constructor() {
      super('Account not exists.');
    }
  }
}
