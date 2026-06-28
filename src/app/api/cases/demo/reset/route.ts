import { NextResponse } from "next/server";

import { mockCases } from "@/features/cases/data/mockCases";
import { prisma } from "@/lib/prisma";

export async function POST() {
  await prisma.$transaction([
    prisma.case.deleteMany(),
    prisma.case.createMany({
      data: mockCases.map((caseItem) => ({
        id: caseItem.id,
        status: caseItem.status,
        sortOrder: caseItem.sortOrder,

        createdAt: new Date(caseItem.createdAt),
        updatedAt: new Date(caseItem.updatedAt),
        archivedAt: caseItem.archivedAt ? new Date(caseItem.archivedAt) : null,
        deletedAt: caseItem.deletedAt ? new Date(caseItem.deletedAt) : null,

        itemCode: caseItem.itemCode,
        itemName: caseItem.itemName || null,
        supplier: caseItem.supplier || null,
        replyDate: caseItem.replyDate || null,
        dueDate: caseItem.dueDate || null,
        delayDays: caseItem.delayDays,
        orderCode: caseItem.orderCode || null,
        quantity: caseItem.quantity,
        warehouse: caseItem.warehouse || null,
        deadline: caseItem.deadline || null,
        cause: caseItem.cause || null,
        note: caseItem.note || null,
      })),
    }),
  ]);
  return NextResponse.json({
    success: true,
    message: "デモデータをリセットしました",
  });
}
