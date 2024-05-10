import { Injectable } from '@nestjs/common';
import {
  AccountStatementDTO,
  AccountStatementDTOResponse,
} from './account-statement.DTO';
import { ITransactionRepository } from '../../repositories/transaction-repository.interface';
import { TransactionMapper } from '../../mappers/transaction.map';

@Injectable()
export class AccountStatementUseCase {
  constructor(private readonly transactionRepo: ITransactionRepository) {}

  public async execute(
    bankAccountId: string,
    options: AccountStatementDTO,
  ): Promise<AccountStatementDTOResponse> {
    const data = await this.transactionRepo.filter(bankAccountId, options);
    const countTotal = await this.transactionRepo.filterCount(
      bankAccountId,
      options,
    );

    const currentPage = +options.pageNumber;
    const totalPages = Math.ceil(countTotal / options.pageSize);

    const dto = data.map(TransactionMapper.toDTO);
    return {
      totalItems: countTotal,
      currentPage: currentPage,
      itemsPerPage: options.pageSize,
      hasPreviousPage: currentPage > 1,
      hasNextPage: currentPage < totalPages,
      data: dto,
    };
  }
}
