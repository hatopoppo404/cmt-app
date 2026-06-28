import { Case } from "@/types/case";

export const createEmptyCase = (sortOrder: number): Case => {
  const now = new Date().toISOString();

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const chars = letters + numbers.repeat(4);
  const length = 4;
  const prefix = Array.from(
    crypto.getRandomValues(new Uint8Array(length)),
    (index) => chars[index % chars.length],
  ).join("");
  const randomNum = Math.floor(Math.random() * 10000) + 1;
  const suffix = Math.floor(Math.random() * 10) + 10;

  return {
    id: crypto.randomUUID(),
    status: "active",
    sortOrder,
    createdAt: now,
    updatedAt: now,
    archivedAt: null,
    deletedAt: null,

    itemName: "ITEM NAME",
    itemCode: prefix + "-" + randomNum + "-" + suffix,
    supplier: "SUPPLIER NAME",
    replyDate: "",
    dueDate: "",
    delayDays: 9999,
    orderCode: "MN1040000000000",
    quantity: 0,
    warehouse: "",
    deadline: "",
    cause: "",
    note: "",
  };
};
