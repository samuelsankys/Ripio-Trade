import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { MakeWithDrawalUseCase } from './make-withdrawal.usecase';
import { MakeWithDrawalDTO } from './make-withdrawal.DTO';
import { MakeWithDrawalErrors } from './make-withdrawal.errors';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TransactionHistoryDTO } from '../../dtos/transaction.DTO';
import { TransactionValue } from '../make-deposit/make-deposit.DTO';

@ApiTags('Transaction')
@Controller('transaction')
export class MakeWithDrawalController {
  constructor(private readonly usecase: MakeWithDrawalUseCase) {}

  @ApiCreatedResponse({
    description: 'Make withdrawal',
    type: TransactionHistoryDTO,
  })
  @Post(':bankAccountId/withdrawal')
  async create(
    @Param('bankAccountId') bankAccountId: string,
    @Body(new ValidationPipe()) input: TransactionValue,
  ) {
    const dto: MakeWithDrawalDTO = { bankAccountId, value: input.value };
    const result = await this.usecase.execute(dto);
    if (result.isLeft()) {
      const error = result.value;

      if (
        error.constructor === MakeWithDrawalErrors.BankAccountNotExistsError
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
