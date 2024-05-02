/*
  Warnings:

  - You are about to drop the column `comments` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `ratings` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "comments",
DROP COLUMN "ratings";
