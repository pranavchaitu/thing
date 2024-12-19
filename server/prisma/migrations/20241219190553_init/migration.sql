-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Todo', 'inProgress', 'inReview', 'Completed');

-- CreateTable
CREATE TABLE "Workspace" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "wid" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_wid_fkey" FOREIGN KEY ("wid") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
