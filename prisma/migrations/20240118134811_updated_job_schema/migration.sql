/*
  Warnings:

  - Added the required column `job_role` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `job` ADD COLUMN `job_role` VARCHAR(50) NOT NULL,
    MODIFY `job_no_hires` VARCHAR(191) NOT NULL;
