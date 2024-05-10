import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { AccountStatementUseCase } from './account-statement.usecase';
import {
  AccountStatementDTO,
  AccountStatementDTOResponse,
} from './account-statement.DTO';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Transaction')
@Controller('transaction')
export class AccountStatementController {
  constructor(private readonly usecase: AccountStatementUseCase) {}

  @ApiOkResponse({
    description: 'Search Statement',
    type: AccountStatementDTOResponse,
  })
  @Get(':bankAccountId/statement')
  async create(
    @Param('bankAccountId') bankAccountId: string,
    @Query(new ValidationPipe()) options: AccountStatementDTO,
  ) {
    const pageSize = this.defineSizeNumber(options.pageSize);
    const pageNumber = this.definePageNumber(options.pageNumber);
    const optionsDefault = {
      fromDate: this.defineInitialFromDate(options.fromDate),
      toDate: this.defineInitialToDate(options.toDate),
      pageSize: pageSize,
      pageNumber: pageNumber,
    };

    const result = await this.usecase.execute(
      bankAccountId,
      optionsDefault as unknown,
    );

    return result;
  }

  private defineSizeNumber(sizeNumber: number | string) {
    if (!sizeNumber || isNaN(+sizeNumber) || +sizeNumber < 1) return 10;
    if (+sizeNumber > 100) return 100;
    return +sizeNumber;
  }

  private definePageNumber(pageNumber: number | string) {
    if (!pageNumber || isNaN(+pageNumber) || +pageNumber < 1) return 1;
    return pageNumber;
  }

  private defineInitialFromDate(fromDate: string | Date) {
    const fromDateDefault = new Date();
    fromDateDefault.setDate(fromDateDefault.getDate() - 7);
    fromDateDefault.setHours(0, 0, 0, 0);
    if (!fromDate) return new Date(fromDateDefault.setHours(0, 0, 0, 0));
    return new Date(new Date(fromDate).setHours(0, 0, 0, 1));
  }

  private defineInitialToDate(toDate: string | Date) {
    const toDateDefault = new Date();
    toDateDefault.setDate(toDateDefault.getDate() + 1);
    if (!toDate) return new Date(toDateDefault.setHours(23, 59, 59, 999));
    const date = new Date(toDate);
    date.setDate(toDateDefault.getDate() + 1);
    return new Date(date.setHours(23, 59, 59, 999));
  }
}
