/*
  Warnings:

  - You are about to drop the column `schId` on the `schooladmin` table. All the data in the column will be lost.
  - Added the required column `schoolId` to the `SchoolAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `schooladmin` DROP FOREIGN KEY `SchoolAdmin_schId_fkey`;

-- AlterTable
ALTER TABLE `schooladmin` DROP COLUMN `schId`,
    ADD COLUMN `schoolId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `SchoolAdmin` ADD CONSTRAINT `SchoolAdmin_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`sch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
