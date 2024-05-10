/*
  Warnings:

  - You are about to alter the column `currentBalance` on the `BankAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `amount` on the `TransactionHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `beforeBalance` on the `TransactionHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `afterBalance` on the `TransactionHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE "BankAccount" ALTER COLUMN "currentBalance" SET DATA TYPE DECIMAL(15,2);

-- AlterTable
ALTER TABLE "TransactionHistory" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "beforeBalance" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "afterBalance" SET DATA TYPE DECIMAL(15,2);
