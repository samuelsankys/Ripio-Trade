export interface BankAccountDTO {
  id: string;
  name: string;
  email: string;
  agency: number;
  account: number;
  accountDigit: number;
  currentBalance?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
