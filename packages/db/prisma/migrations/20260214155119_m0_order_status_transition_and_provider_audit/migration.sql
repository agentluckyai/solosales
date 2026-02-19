-- CreateEnum
CREATE TYPE "ProviderAuditDirection" AS ENUM ('REQUEST', 'RESPONSE');

-- CreateTable
CREATE TABLE "OrderStatusTransition" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "fromStatus" "OrderStatus",
    "toStatus" "OrderStatus" NOT NULL,
    "reason" TEXT,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderStatusTransition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderAudit" (
    "id" TEXT NOT NULL,
    "orderId" TEXT,
    "provider" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "direction" "ProviderAuditDirection" NOT NULL,
    "requestId" TEXT,
    "statusCode" INTEGER,
    "error" TEXT,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProviderAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderStatusTransition_orderId_createdAt_idx" ON "OrderStatusTransition"("orderId", "createdAt");

-- CreateIndex
CREATE INDEX "OrderStatusTransition_toStatus_idx" ON "OrderStatusTransition"("toStatus");

-- CreateIndex
CREATE INDEX "ProviderAudit_provider_operation_createdAt_idx" ON "ProviderAudit"("provider", "operation", "createdAt");

-- CreateIndex
CREATE INDEX "ProviderAudit_requestId_idx" ON "ProviderAudit"("requestId");

-- CreateIndex
CREATE INDEX "ProviderAudit_orderId_createdAt_idx" ON "ProviderAudit"("orderId", "createdAt");

-- AddForeignKey
ALTER TABLE "OrderStatusTransition" ADD CONSTRAINT "OrderStatusTransition_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderAudit" ADD CONSTRAINT "ProviderAudit_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
