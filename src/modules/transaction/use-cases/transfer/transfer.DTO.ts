import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, Max, Min } from 'class-validator';

export class TransferDTO {
  @ApiProperty()
  bankAccountId: string;
  @ApiProperty()
  toEmail: string;
  @ApiProperty()
  value: number;
}

export class TransferDTOResponse {
  @ApiProperty()
  bankAccountId: string;

  @ApiProperty()
  toEmail: string;

  @ApiProperty()
  value: number;
}

export class TransferInputValue {
  @ApiProperty()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 2 })
  @Min(0.01)
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  @Max(999999999999999999.99)
  value: number;

  @ApiProperty()
  @IsEmail()
  toEmail: string;
}
