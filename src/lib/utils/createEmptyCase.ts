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

        itemName: "",
        itemCode: "",
        replyDate: "",
        dueDate: "",
        delayDays: 0,
        orderCode: "",
        quantity: 0,
        warehouse: "",
        deadline: "",
        cause: "",
        note: ""
    };
};