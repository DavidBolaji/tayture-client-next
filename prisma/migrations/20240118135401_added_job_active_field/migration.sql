/*
  Warnings:

  - Added the required column `job_active` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `job` ADD COLUMN `job_active` VARCHAR(50) NOT NULL;
