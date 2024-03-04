-- DropForeignKey
ALTER TABLE `schooladmin` DROP FOREIGN KEY `SchoolAdmin_schoolId_fkey`;

-- DropForeignKey
ALTER TABLE `wallet` DROP FOREIGN KEY `Wallet_walletSchId_fkey`;

-- AddForeignKey
ALTER TABLE `SchoolAdmin` ADD CONSTRAINT `SchoolAdmin_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`sch_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_walletSchId_fkey` FOREIGN KEY (`walletSchId`) REFERENCES `School`(`sch_id`) ON DELETE CASCADE ON UPDATE CASCADE;
