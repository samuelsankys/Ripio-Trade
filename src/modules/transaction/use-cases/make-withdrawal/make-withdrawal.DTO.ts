import { ApiProperty } from '@nestjs/swagger';

export class MakeWithDrawalDTO {
  bankAccountId: string;
  @ApiProperty()
  value: number;
}
