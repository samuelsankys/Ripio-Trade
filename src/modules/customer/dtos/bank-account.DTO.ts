export interface BankAccountDTO {
  id: string;
  customerId: string;
  agency: number;
  account: number;
  accountDigit: number;
  currentBalance: number;
  createdAt: Date;
  updatedAt: Date;
}
