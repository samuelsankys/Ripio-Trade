import { DomainError } from 'src/shared/application/domain.error';

export class InsufficientFunds extends DomainError {
  constructor() {
    super('Insufficient funds');
  }
}
