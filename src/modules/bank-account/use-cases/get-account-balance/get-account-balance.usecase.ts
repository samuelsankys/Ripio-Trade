import { Either, left, right } from 'src/shared/application/either';
import { Injectable } from '@nestjs/common';
import {
  GetAccountBalanceDTO,
  GetAccountBalanceDTOResponse,
} from './get-account-balance.DTO';
import { IBankAccountRepository } from '../../repositories/bank-account-repository.interface';
import { GetAccountBalanceErrors } from './get-account-balance.errors';

export type GetAccountBalanceResponse = Either<
  GetAccountBalanceErrors.BankAccountNotExistsError | Error,
  GetAccountBalanceDTOResponse
>;

@Injectable()
export class GetAccountBalanceUseCase {
  constructor(private readonly bankAccountRepo: IBankAccountRepository) {}

  public async execute(
    request: GetAccountBalanceDTO,
  ): Promise<GetAccountBalanceResponse> {
    const accountExists = await this.bankAccountRepo.findById(
      request.bankAccountId,
    );
    if (!accountExists)
      return left(new GetAccountBalanceErrors.BankAccountNotExistsError());

    const balance = {
      currentBalance: accountExists.currentBalance ?? 0,
    };
    return right(balance);
  }
}
