/*
  Warnings:

  - Made the column `u_document_no` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `u_document_no` VARCHAR(191) NOT NULL;
