-- DropIndex
DROP INDEX "Board_name_key";

-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "name" SET DATA TYPE TEXT;
