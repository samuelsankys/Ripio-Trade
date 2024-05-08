import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateCustomerUseCase } from './create-customer.usecase';
import { CreateCustomerDTO } from './create-customer.DTO';
import { CreateCustomerErrors } from './create-customer.errors';

@Controller('customer')
export class CreateCustomerController {
  constructor(private readonly usecase: CreateCustomerUseCase) {}

  @Post()
  async createCustomer(@Body() dto: CreateCustomerDTO) {
    try {
      const result = await this.usecase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;

        if (
          error.constructor === CreateCustomerErrors.CustomerAlreadyExistsError
        ) {
          throw new ConflictException(error);
        } else {
          throw new ForbiddenException(error);
        }
      } else {
        return result.value;
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
