-- CreateTable
CREATE TABLE `School` (
    `sch_id` VARCHAR(191) NOT NULL,
    `sch_logo` VARCHAR(200) NULL,
    `sch_name` VARCHAR(50) NOT NULL,
    `sch_no_emp` VARCHAR(30) NOT NULL,
    `sch_address` VARCHAR(30) NOT NULL,
    `sch_url` VARCHAR(100) NOT NULL,
    `sch_phone` VARCHAR(20) NOT NULL,
    `sch_verified` INTEGER NOT NULL DEFAULT 0,
    `sch_admin_str` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `sch_city` VARCHAR(100) NOT NULL,
    `sch_state` VARCHAR(100) NOT NULL,
    `sch_lga` VARCHAR(100) NOT NULL,
    `pending_job_post` INTEGER NOT NULL DEFAULT 0,
    `schUserId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `School_schUserId_key`(`schUserId`),
    PRIMARY KEY (`sch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `wallet_id` VARCHAR(191) NOT NULL,
    `walletSchId` VARCHAR(191) NOT NULL,
    `walletUserId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Wallet_walletSchId_key`(`walletSchId`),
    UNIQUE INDEX `Wallet_walletUserId_key`(`walletUserId`),
    PRIMARY KEY (`wallet_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `job_id` VARCHAR(191) NOT NULL,
    `job_title` VARCHAR(20) NOT NULL,
    `job_min_sal` VARCHAR(255) NOT NULL,
    `job_max_sal` VARCHAR(255) NOT NULL,
    `job_exp` VARCHAR(30) NOT NULL,
    `job_qual` VARCHAR(30) NOT NULL,
    `job_resumption` DATETIME(3) NOT NULL,
    `job_no_hires` INTEGER NOT NULL,
    `jobSchId` VARCHAR(191) NOT NULL,
    `jobUserId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Job_jobSchId_key`(`jobSchId`),
    UNIQUE INDEX `Job_jobUserId_key`(`jobUserId`),
    PRIMARY KEY (`job_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `School` ADD CONSTRAINT `School_schUserId_fkey` FOREIGN KEY (`schUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_walletSchId_fkey` FOREIGN KEY (`walletSchId`) REFERENCES `School`(`sch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_walletUserId_fkey` FOREIGN KEY (`walletUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_jobSchId_fkey` FOREIGN KEY (`jobSchId`) REFERENCES `School`(`sch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_jobUserId_fkey` FOREIGN KEY (`jobUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
