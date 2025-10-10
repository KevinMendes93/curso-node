/*
  Warnings:

  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(63)` to `VarChar(63)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(127)` to `VarChar(127)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(127)` to `VarChar(127)`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(63),
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(127),
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(127);
