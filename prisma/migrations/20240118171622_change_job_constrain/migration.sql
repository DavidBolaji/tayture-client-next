/*
  Warnings:

  - You are about to alter the column `sch_state` on the `school` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(80)`.

*/
-- AlterTable
ALTER TABLE `school` MODIFY `sch_state` VARCHAR(80) NOT NULL;
