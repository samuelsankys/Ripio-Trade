import { ApiProperty } from '@nestjs/swagger';

export class GetAccountBalanceDTO {
  @ApiProperty()
  bankAccountId: string;
}

export class GetAccountBalanceDTOResponse {
  @ApiProperty()
  currentBalance: number;
}
