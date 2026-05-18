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
        replyDate: "",
        dueDate: "",
        delayDays: 9999,
        orderCode: "MN1040000000000",
        quantity: 0,
        warehouse: "",
        deadline: "",
        cause: "",
        note: ""
    };
};