/*
  Warnings:

  - You are about to drop the column `jobSchId` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `jobUserId` on the `job` table. All the data in the column will be lost.
  - Added the required column `jobSchoolId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobUserzId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `job` DROP FOREIGN KEY `Job_jobSchId_fkey`;

-- DropForeignKey
ALTER TABLE `job` DROP FOREIGN KEY `Job_jobUserId_fkey`;

-- AlterTable
ALTER TABLE `job` DROP COLUMN `jobSchId`,
    DROP COLUMN `jobUserId`,
    ADD COLUMN `jobSchoolId` VARCHAR(191) NOT NULL,
    ADD COLUMN `jobUserzId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_jobSchoolId_fkey` FOREIGN KEY (`jobSchoolId`) REFERENCES `School`(`sch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_jobUserzId_fkey` FOREIGN KEY (`jobUserzId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
