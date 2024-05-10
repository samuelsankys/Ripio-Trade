import { UseCaseError } from 'src/shared/application/use-case.error';

export namespace MakeWithDrawalErrors {
  export class BankAccountNotExistsError extends UseCaseError {
    constructor() {
      super('Account not exists.');
    }
  }

  export class InsufficientFoundsError extends UseCaseError {
    constructor() {
      super('Account ddists.');
    }
  }
}
