import { ApiProperty } from '@nestjs/swagger';

export class TransactionHistoryDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  bankAccountId: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  amount?: number;

  @ApiProperty()
  beforeBalance?: number;

  @ApiProperty()
  afterBalance?: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  transferId?: string;

  @ApiProperty()
  failingReason?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
