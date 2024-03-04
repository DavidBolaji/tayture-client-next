-- CreateTable
CREATE TABLE `Notifcation` (
    `notification_id` VARCHAR(191) NOT NULL,
    `notification_caption` VARCHAR(50) NOT NULL,
    `notification_msg` VARCHAR(255) NOT NULL,
    `notification_status` INTEGER NOT NULL DEFAULT 0,
    `notification_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `notificationUser` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`notification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notifcation` ADD CONSTRAINT `Notifcation_notificationUser_fkey` FOREIGN KEY (`notificationUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
