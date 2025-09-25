/*
  Warnings:

  - A unique constraint covering the columns `[a_u_id,a_year,a_month,a_date]` on the table `attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `attendance_a_u_id_a_year_a_month_a_date_key` ON `attendance`(`a_u_id`, `a_year`, `a_month`, `a_date`);
