-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'active',
    "sortOrder" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "archivedAt" DATETIME,
    "deletedAt" DATETIME,
    "itemCode" TEXT NOT NULL,
    "itemName" TEXT,
    "supplier" TEXT,
    "replyDate" TEXT,
    "dueDate" TEXT,
    "delayDays" INTEGER,
    "orderCode" TEXT,
    "quantity" INTEGER,
    "warehouse" TEXT,
    "deadline" TEXT,
    "cause" TEXT,
    "note" TEXT
);
