-- CreateTable
CREATE TABLE "Verification" (
    "id" SERIAL NOT NULL,
    "contractAddress" VARCHAR(255) NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "bytecode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);
