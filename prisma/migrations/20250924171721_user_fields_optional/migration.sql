-- AlterTable
ALTER TABLE `user` MODIFY `u_position` ENUM('EMPLOYEE', 'MANAGER', 'DEPT_HEAD') NULL,
    MODIFY `u_division` ENUM('HR', 'RND', 'IT', 'OPERATIONS', 'ACCOUNTING') NULL,
    MODIFY `u_salary_gross` DOUBLE NULL,
    MODIFY `u_address_line1` VARCHAR(191) NULL,
    MODIFY `u_city` VARCHAR(191) NULL,
    MODIFY `u_province` VARCHAR(191) NULL,
    MODIFY `u_postal_code` VARCHAR(191) NULL;
