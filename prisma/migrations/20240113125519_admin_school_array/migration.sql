/*
  Warnings:

  - You are about to drop the column `sch_admin_str` on the `school` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `school` DROP COLUMN `sch_admin_str`;

-- CreateTable
CREATE TABLE `SchoolAdmin` (
    `sch_admin_id` VARCHAR(191) NOT NULL,
    `sch_admin_name` VARCHAR(30) NOT NULL,
    `sch_admin_email` VARCHAR(30) NOT NULL,
    `sch_admin_phone` VARCHAR(20) NOT NULL,
    `schId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SchoolAdmin_schId_key`(`schId`),
    PRIMARY KEY (`sch_admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SchoolAdmin` ADD CONSTRAINT `SchoolAdmin_schId_fkey` FOREIGN KEY (`schId`) REFERENCES `School`(`sch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
