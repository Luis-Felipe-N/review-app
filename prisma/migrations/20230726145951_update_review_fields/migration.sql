/*
  Warnings:

  - You are about to drop the column `note` on the `reviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `note`,
    ADD COLUMN `rating` INTEGER NOT NULL DEFAULT 0;
