import type { Case } from "@/types/case";


export const mockCases: Case[] = [
    {
        id: "1",
        itemName: "商品A",
        itemCode: "A-001",
        dueDate: "2024-07-01",
        replyDate: "2024-06-25",
        delayDays: -9,
        orderCode: "ORD-12345",
        deadline: "2024-08-28",
        quantity: 100,
        warehouse: "東京倉庫",
        cause: "部品の遅延",
        note: "部品メーカーの生産遅延が原因で、納期に間に合わない見込みです。",
        sortOrder: 0,
        createdAt: "2026-05-01",
        updatedAt: "2026-05-01"
    },
    {
        id: "2",
        itemName: "商品B",
        itemCode: "B-014",
        dueDate: "2024-07-10",
        replyDate: "2024-07-02",
        delayDays: -1,
        orderCode: "ORD-56789",
        deadline: "2024-07-08",
        quantity: 250,
        warehouse: "福岡倉庫",
        cause: "輸送トラブル",
        note: "台風の影響で輸送便に遅れが発生しています。",
        sortOrder: 1,
        createdAt: "2026-05-01",
        updatedAt: "2026-05-11"
    },
    {
        id: "3",
        itemName: "商品C",
        itemCode: "C-0701",
        dueDate: "2024-07-15",
        replyDate: "2024-07-10",
        delayDays: 3,
        orderCode: "ORD-99881",
        deadline: "2024-07-18",
        quantity: 80,
        warehouse: "大阪倉庫",
        cause: "正常",
        note: "現在のところ大きな問題はなく、予定通り進行しています。",
        sortOrder: 2,
        createdAt: "2026-05-01",
        updatedAt: "2026-05-09"
    },
];