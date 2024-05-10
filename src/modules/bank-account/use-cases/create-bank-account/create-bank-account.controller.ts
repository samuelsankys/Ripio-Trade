import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBankAccountUseCase } from './create-bank-account.usecase';
import { CreateBankAccountErrors } from './create-bank-account.errors';
import { CreateBankAccountDTO } from './create-bank-account.DTO';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BankAccountDTO } from '../../dtos/bank-account.DTO';

@Controller('bank-account')
@ApiTags('Bank Account')
export class CreateBankAccountController {
  constructor(private readonly usecase: CreateBankAccountUseCase) {}
  @ApiCreatedResponse({
    description: 'Create new account',
    type: BankAccountDTO,
  })
  @Post()
  async create(@Body(new ValidationPipe()) dto: CreateBankAccountDTO) {
    const result = await this.usecase.execute(dto);
    if (result.isLeft()) {
      const error = result.value;
      if (
        error.constructor ===
        CreateBankAccountErrors.BankAccountAlreadyExistsError
      ) {
        throw new ConflictException(error);
      } else {
        throw new BadRequestException(error);
      }
    } else {
      return result.value;
    }
  }
}
