import { DomainError } from 'src/shared/application/domain.error';

export class InsufficientFunds extends DomainError {
  constructor() {
    super('Insufficient funds');
  }
}

export class AmountUnder1 extends DomainError {
  constructor() {
    super('Can not withdraw less than 1.');
  }
}
