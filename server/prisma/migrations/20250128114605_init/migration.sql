/*
  Warnings:

  - You are about to drop the column `outh_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `oauth_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "outh_id",
ADD COLUMN     "oauth_id" TEXT NOT NULL;
