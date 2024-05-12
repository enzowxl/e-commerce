/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `cart_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `user_id` on table `oders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "oders" DROP CONSTRAINT "oders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "avatar_url",
ADD COLUMN     "photo_id" TEXT,
ADD COLUMN     "photo_url" TEXT;

-- AlterTable
ALTER TABLE "oders" ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "avatar_url",
ADD COLUMN     "photo_id" TEXT,
ADD COLUMN     "photo_url" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "category_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar_url",
ADD COLUMN     "photo_id" TEXT,
ADD COLUMN     "photo_url" TEXT;

-- DropTable
DROP TABLE "cart_items";

-- DropTable
DROP TABLE "carts";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oders" ADD CONSTRAINT "oders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
