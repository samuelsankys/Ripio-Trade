import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { MakeDepositUseCase } from './make-deposit.usecase';
import { MakeDepositErrors } from './make-deposit.errors';
import { MakeDepositDTO, TransactionValue } from './make-deposit.DTO';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TransactionHistoryDTO } from '../../dtos/transaction.DTO';

@ApiTags('Transaction')
@Controller('transaction')
export class MakeDepositController {
  constructor(private readonly usecase: MakeDepositUseCase) {}

  @ApiCreatedResponse({
    description: 'Make deposit',
    type: TransactionHistoryDTO,
  })
  @Post(':bankAccountId/deposit')
  async create(
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body(new ValidationPipe()) input: TransactionValue,
  ) {
    const dto: MakeDepositDTO = { bankAccountId, value: input.value };

    const result = await this.usecase.execute(dto);
    if (result.isLeft()) {
      const error = result.value;
      if (error.constructor === MakeDepositErrors.BankAccountNotExistsError) {
        throw new NotFoundException(error);
      } else {
        throw new BadRequestException(error);
      }
    } else {
      return result.value;
    }
  }
}
