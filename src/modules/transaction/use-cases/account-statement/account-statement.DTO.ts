import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';
import { TransactionHistoryDTO } from '../../dtos/transaction.DTO';
import { ApiProperty } from '@nestjs/swagger';

export class AccountStatementDTO {
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  fromDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  toDate?: Date;

  @ApiProperty({
    minimum: 10,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  pageSize?: number;

  @ApiProperty({
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  pageNumber?: number;
}

export class AccountStatementDTOResponse {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  hasPreviousPage: boolean;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  data: TransactionHistoryDTO[];
}
