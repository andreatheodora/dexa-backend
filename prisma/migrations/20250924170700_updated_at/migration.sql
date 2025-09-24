/*
  Warnings:

  - Made the column `l_updated_at` on table `leave` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `leave` MODIFY `l_updated_at` DATETIME(3) NOT NULL;
