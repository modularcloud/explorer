-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('FULL', 'PARTIAL');

-- CreateTable
CREATE TABLE "Verification" (
    "id" SERIAL NOT NULL,
    "contractAddress" VARCHAR(255) NOT NULL,
    "chainID" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "bytecode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "verificationStatus" "VerificationStatus" NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);
