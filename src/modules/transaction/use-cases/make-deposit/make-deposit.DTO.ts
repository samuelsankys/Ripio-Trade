import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class MakeDepositDTO {
  bankAccountId: string;
  @ApiProperty()
  value: number;
}

export class TransactionValue {
  @ApiProperty()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 2 })
  @Min(0.01)
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  @Max(999999999999999999.99)
  value: number;
}
