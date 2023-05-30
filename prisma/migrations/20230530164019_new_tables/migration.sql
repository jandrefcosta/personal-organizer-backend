/*
  Warnings:

  - You are about to drop the `categorias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "categorias_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "categorias";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipoDespesa" TEXT NOT NULL,
    "nomeDespesa" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "parcelado" INTEGER NOT NULL,
    "vencimento" DATETIME NOT NULL,
    "dataPagamento" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Expense_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Expense_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "statuses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Expense" ("categoriaId", "dataPagamento", "id", "nomeDespesa", "parcelado", "statusId", "tipoDespesa", "userId", "valor", "vencimento") SELECT "categoriaId", "dataPagamento", "id", "nomeDespesa", "parcelado", "statusId", "tipoDespesa", "userId", "valor", "vencimento" FROM "Expense";
DROP TABLE "Expense";
ALTER TABLE "new_Expense" RENAME TO "Expense";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
