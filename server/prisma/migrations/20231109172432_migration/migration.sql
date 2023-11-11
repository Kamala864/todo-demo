/*
  Warnings:

  - Added the required column `status` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `todo` ADD COLUMN `status` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;
