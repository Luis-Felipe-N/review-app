/*
  Warnings:

  - You are about to drop the column `greenLike` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `redLike` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `greenLike`,
    DROP COLUMN `redLike`,
    ADD COLUMN `reply_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `comments_user_id_idx` ON `comments`(`user_id`);

-- CreateIndex
CREATE INDEX `comments_review_id_idx` ON `comments`(`review_id`);

-- CreateIndex
CREATE INDEX `comments_reply_id_idx` ON `comments`(`reply_id`);

-- CreateIndex
CREATE INDEX `ratings_user_id_idx` ON `ratings`(`user_id`);

-- CreateIndex
CREATE INDEX `ratings_review_id_idx` ON `ratings`(`review_id`);

-- CreateIndex
CREATE INDEX `reviews_user_id_idx` ON `reviews`(`user_id`);
