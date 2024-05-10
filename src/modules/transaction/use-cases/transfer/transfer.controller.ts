import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { TransferUseCase } from './transfer.usecase';
import { TransferDTO, TransferInputValue } from './transfer.DTO';
import { TransferErrors } from './transfer.errors';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TransactionHistoryDTO } from '../../dtos/transaction.DTO';

@ApiTags('Transaction')
@Controller('transaction')
export class TransferController {
  constructor(private readonly usecase: TransferUseCase) {}

  @ApiCreatedResponse({
    description: 'Make transfer',
    type: TransactionHistoryDTO,
  })
  @Post(':bankAccountId/transfer')
  async create(
    @Param('bankAccountId') bankAccountId: string,
    @Body(new ValidationPipe()) input: TransferInputValue,
  ) {
    const dto: TransferDTO = { bankAccountId, ...input };
    const result = await this.usecase.execute(dto);
    if (result.isLeft()) {
      const error = result.value;

      if (
        error.constructor === TransferErrors.BankAccountNotExistsError ||
        error.constructor === TransferErrors.EmailNotFoundError
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
