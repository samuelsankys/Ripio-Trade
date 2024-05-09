/*
  Warnings:

  - You are about to drop the column `customerId` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `BankAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BankAccount" DROP CONSTRAINT "BankAccount_customerId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionHistory" DROP CONSTRAINT "TransactionHistory_customerId_fkey";

-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "customerId",
ADD COLUMN     "email" VARCHAR(50) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TransactionHistory" DROP COLUMN "customerId";

-- DropTable
DROP TABLE "Customer";

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_email_key" ON "BankAccount"("email");
