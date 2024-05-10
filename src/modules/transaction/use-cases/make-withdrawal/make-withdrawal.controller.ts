import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { MakeWithDrawalUseCase } from './make-withdrawal.usecase';
import { MakeWithDrawalDTO } from './make-withdrawal.DTO';
import { MakeWithDrawalErrors } from './make-withdrawal.errors';

@Controller('transaction')
export class MakeWithDrawalController {
  constructor(private readonly usecase: MakeWithDrawalUseCase) {}

  @Post(':bankAccountId/withdrawal')
  async create(
    @Param('bankAccountId') bankAccountId: string,
    @Body() { value }: { value: number },
  ) {
    const dto: MakeWithDrawalDTO = { bankAccountId, value };
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
