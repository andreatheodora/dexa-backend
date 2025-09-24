/*
  Warnings:

  - You are about to drop the column `u_salt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `u_salt`;
