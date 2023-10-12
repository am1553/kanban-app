-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailaddress" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Columns" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "color" VARCHAR(7) NOT NULL,
    "boardID" TEXT NOT NULL,

    CONSTRAINT "Columns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "columnID" TEXT NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtask" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "taskID" TEXT NOT NULL,

    CONSTRAINT "Subtask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailaddress_key" ON "User"("emailaddress");

-- CreateIndex
CREATE UNIQUE INDEX "Board_name_key" ON "Board"("name");

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_boardID_fkey" FOREIGN KEY ("boardID") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_columnID_fkey" FOREIGN KEY ("columnID") REFERENCES "Columns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
