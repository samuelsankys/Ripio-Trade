import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateBankAccountDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
