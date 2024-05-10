export interface TransactionHistoryDTO {
  id: string;
  bankAccountId: string;
  type: string;
  amount?: number;
  beforeBalance?: number;
  afterBalance?: number;
  status: string;
  transferId?: string;
  failingReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
