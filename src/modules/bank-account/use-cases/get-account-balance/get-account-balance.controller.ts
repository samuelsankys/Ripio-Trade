import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { GetAccountBalanceUseCase } from './get-account-balance.usecase';
import {
  GetAccountBalanceDTO,
  GetAccountBalanceDTOResponse,
} from './get-account-balance.DTO';
import { GetAccountBalanceErrors } from './get-account-balance.errors';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Bank Account')
@Controller('bank-account')
export class GetAccountBalanceController {
  constructor(private readonly usecase: GetAccountBalanceUseCase) {}

  @ApiOkResponse({
    description: 'Get Balance account',
    type: GetAccountBalanceDTOResponse,
  })
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
