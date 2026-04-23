/*
  Warnings:

  - You are about to drop the column `lido` on the `alert` table. All the data in the column will be lost.
  - You are about to drop the `followup` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[os,tipo,origem]` on the table `Alert` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `origem` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Alert_os_key` ON `alert`;

-- AlterTable
ALTER TABLE `alert` DROP COLUMN `lido`,
    ADD COLUMN `origem` VARCHAR(191) NOT NULL,
    ADD COLUMN `readAt` DATETIME(3) NULL,
    ADD COLUMN `status` ENUM('PENDING', 'READ') NOT NULL DEFAULT 'PENDING',
    MODIFY `cliente` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `followup`;

-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `os` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `cliente` VARCHAR(191) NULL,
    `origem` VARCHAR(191) NOT NULL,
    `processed` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Alert_os_tipo_origem_key` ON `Alert`(`os`, `tipo`, `origem`);
