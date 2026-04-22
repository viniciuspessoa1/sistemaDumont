/*
  Warnings:

  - A unique constraint covering the columns `[os,tipo]` on the table `Alert` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Alert_os_tipo_email_key` ON `alert`;

-- CreateIndex
CREATE UNIQUE INDEX `Alert_os_tipo_key` ON `Alert`(`os`, `tipo`);
