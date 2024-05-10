import { ApiProperty } from '@nestjs/swagger';

export class BankAccountDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  agency: number;
  @ApiProperty()
  account: number;
  @ApiProperty()
  accountDigit: number;
  @ApiProperty()
  currentBalance?: number;
  @ApiProperty()
  createdAt?: Date;
  @ApiProperty()
  updatedAt?: Date;
}
