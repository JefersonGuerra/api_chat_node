/*
  Warnings:

  - You are about to drop the `contact_list` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[room]` on the table `add_contact` will be added. If there are existing duplicate values, this will fail.
  - The required column `room` was added to the `add_contact` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "contact_list" DROP CONSTRAINT "contact_list_id_user_contact_fkey";

-- AlterTable
ALTER TABLE "add_contact" ADD COLUMN     "room" TEXT NOT NULL;

-- DropTable
DROP TABLE "contact_list";

-- CreateIndex
CREATE UNIQUE INDEX "add_contact_room_key" ON "add_contact"("room");
