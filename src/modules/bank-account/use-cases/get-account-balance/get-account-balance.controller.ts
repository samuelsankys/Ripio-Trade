import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { GetAccountBalanceUseCase } from './get-account-balance.usecase';
import { GetAccountBalanceDTO } from './get-account-balance.DTO';
import { GetAccountBalanceErrors } from './get-account-balance.errors';

@Controller('bank-account')
export class GetAccountBalanceController {
  constructor(private readonly usecase: GetAccountBalanceUseCase) {}

  @Get(':bankAccountId/balance')
  async getAccountBalance(@Param() dto: GetAccountBalanceDTO) {
    const result = await this.usecase.execute(dto);
    if (result.isLeft()) {
      const error = result.value;
      if (
        error.constructor === GetAccountBalanceErrors.BankAccountNotExistsError
      ) {
        throw new NotFoundException(error);
      } else {
        throw new BadRequestException(error);
      }
    } else {
      return result.value;
    }
  }
}
