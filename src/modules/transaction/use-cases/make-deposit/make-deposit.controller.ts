import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { MakeDepositUseCase } from './make-deposit.usecase';
import { MakeDepositErrors } from './make-deposit.errors';
import { MakeDepositDTO } from './make-deposit.DTO';

@Controller('transaction')
export class MakeDepositController {
  constructor(private readonly usecase: MakeDepositUseCase) {}

  @Post(':bankAccountId/deposit')
  async create(
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() { value }: { value: number },
  ) {
    const dto: MakeDepositDTO = { bankAccountId, value };

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
