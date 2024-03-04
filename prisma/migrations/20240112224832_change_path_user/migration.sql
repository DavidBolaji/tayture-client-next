/*
  Warnings:

  - You are about to alter the column `path` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `path` VARCHAR(191) NULL;
