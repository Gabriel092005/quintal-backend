/*
  Warnings:

  - You are about to drop the column `content` on the `React` table. All the data in the column will be lost.
  - Added the required column `userId` to the `React` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "React" DROP COLUMN "content",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "React" ADD CONSTRAINT "React_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
