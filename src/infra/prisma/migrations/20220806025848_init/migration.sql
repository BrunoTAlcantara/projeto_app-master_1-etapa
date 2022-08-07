-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "deviceCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "giverId" TEXT NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Giver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Giver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Devices" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "donationId" TEXT,

    CONSTRAINT "Devices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Giver_email_key" ON "Giver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Giver_phone_key" ON "Giver"("phone");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_giverId_fkey" FOREIGN KEY ("giverId") REFERENCES "Giver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devices" ADD CONSTRAINT "Devices_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
