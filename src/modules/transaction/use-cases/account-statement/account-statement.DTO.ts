import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';
import { TransactionHistoryDTO } from '../../dtos/transaction.DTO';

export class AccountStatementDTO {
  @IsOptional()
  @IsDateString()
  fromDate?: Date;

  @IsOptional()
  @IsDateString()
  toDate?: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  pageSize?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  pageNumber?: number;
}

export interface AccountStatementDTOResponse {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  data: TransactionHistoryDTO[];
}
