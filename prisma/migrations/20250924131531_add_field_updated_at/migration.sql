/*
  Warnings:

  - You are about to drop the column `u_last_login` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `u_last_login`,
    ADD COLUMN `u_updated_at` DATETIME(3) NULL;
