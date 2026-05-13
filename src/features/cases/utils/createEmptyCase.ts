import { Case } from "@/types/case";

export const createEmptyCase = (sortOrder: number): Case => {
    const now = new Date().toISOString();

    return {
        id: crypto.randomUUID(),
        status: "active",
        sortOrder,
        createdAt: now,
        updatedAt: now,
        archivedAt: null,
        deletedAt: null,

        itemName: "ITEM NAME",
        itemCode: "1B10-123456-11",
        replyDate: "2050-01-01",
        dueDate: "2050-01-01",
        delayDays: 0,
        orderCode: "MN1040000000000",
        quantity: 0,
        warehouse: "5100",
        deadline: "2050-01-01",
        cause: "プロジェクト名など",
        note: "調整状況などを記載する"
    };
};