-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(63)[],
    "email" VARCHAR(127)[],
    "password" VARCHAR(127)[],
    "birthAt" DATE,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
