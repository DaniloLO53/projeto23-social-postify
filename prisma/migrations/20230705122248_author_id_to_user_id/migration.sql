/*
  Warnings:

  - You are about to drop the column `authorId` on the `publications` table. All the data in the column will be lost.
  - Added the required column `userId` to the `publications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_authorId_fkey";

-- AlterTable
ALTER TABLE "publications" DROP COLUMN "authorId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
