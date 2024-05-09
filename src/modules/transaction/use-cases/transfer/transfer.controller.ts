import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { TransferUseCase } from './transfer.usecase';
import { TransferDTO } from './transfer.DTO';
import { TransferErrors } from './transfer.errors';

@Controller('transaction')
export class TransferController {
  constructor(private readonly usecase: TransferUseCase) {}

  @Post(':bankAccountId/transfer')
  async create(
    @Param('bankAccountId') bankAccountId: string,
    @Body() { value, toEmail }: { value: number; toEmail: string },
  ) {
    const dto: TransferDTO = { bankAccountId, value, toEmail };
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
