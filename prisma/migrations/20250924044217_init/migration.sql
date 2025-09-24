-- CreateTable
CREATE TABLE `user` (
    `u_id` INTEGER NOT NULL AUTO_INCREMENT,
    `u_document_no` VARCHAR(191) NULL,
    `u_email` VARCHAR(191) NOT NULL,
    `u_name` VARCHAR(191) NOT NULL,
    `u_position` ENUM('EMPLOYEE', 'MANAGER', 'DEPT_HEAD') NOT NULL,
    `u_division` ENUM('HR', 'RND', 'IT', 'OPERATIONS', 'ACCOUNTING') NOT NULL,
    `u_salary_gross` DOUBLE NOT NULL,
    `u_address_line1` VARCHAR(191) NOT NULL,
    `u_address_line2` VARCHAR(191) NULL,
    `u_city` VARCHAR(191) NOT NULL,
    `u_province` VARCHAR(191) NOT NULL,
    `u_postal_code` VARCHAR(191) NOT NULL,
    `u_salt` VARCHAR(191) NULL,
    `u_password` VARCHAR(191) NULL,
    `u_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `u_last_login` DATETIME(3) NULL,
    `u_is_hr` BOOLEAN NOT NULL DEFAULT false,
    `u_is_deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `user_u_document_no_key`(`u_document_no`),
    UNIQUE INDEX `user_u_email_key`(`u_email`),
    PRIMARY KEY (`u_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance` (
    `a_id` INTEGER NOT NULL AUTO_INCREMENT,
    `a_document_no` VARCHAR(191) NULL,
    `a_year` INTEGER NOT NULL,
    `a_month` INTEGER NOT NULL,
    `a_date` INTEGER NOT NULL,
    `a_tap_in` DATETIME(3) NULL,
    `a_tap_out` DATETIME(3) NULL,
    `a_u_id` INTEGER NOT NULL,

    UNIQUE INDEX `attendance_a_document_no_key`(`a_document_no`),
    PRIMARY KEY (`a_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leave` (
    `l_id` INTEGER NOT NULL AUTO_INCREMENT,
    `l_document_no` VARCHAR(191) NULL,
    `l_employee_id` INTEGER NOT NULL,
    `l_supervisor_id` INTEGER NULL,
    `l_type` ENUM('PAID', 'SICK', 'MATERNITY', 'UNPAID') NOT NULL,
    `l_duration` INTEGER NOT NULL,
    `l_start_date` INTEGER NOT NULL,
    `l_start_month` INTEGER NOT NULL,
    `l_start_year` INTEGER NOT NULL,
    `l_is_approved` BOOLEAN NOT NULL,
    `l_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `l_updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `leave_l_document_no_key`(`l_document_no`),
    PRIMARY KEY (`l_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_a_u_id_fkey` FOREIGN KEY (`a_u_id`) REFERENCES `user`(`u_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leave` ADD CONSTRAINT `leave_l_employee_id_fkey` FOREIGN KEY (`l_employee_id`) REFERENCES `user`(`u_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leave` ADD CONSTRAINT `leave_l_supervisor_id_fkey` FOREIGN KEY (`l_supervisor_id`) REFERENCES `user`(`u_id`) ON DELETE SET NULL ON UPDATE CASCADE;
