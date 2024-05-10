import { UseCaseError } from 'src/shared/application/use-case.error';

export namespace TransferErrors {
  export class BankAccountNotExistsError extends UseCaseError {
    constructor() {
      super('Account not exists.');
    }
  }

  export class EmailNotFoundError extends UseCaseError {
    constructor() {
      super('Email not found.');
    }
  }
}
