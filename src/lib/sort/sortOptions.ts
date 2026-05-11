import type { Case } from "@/types/case"

type SortOption = {
    value: keyof Case;
    label: string;
};

export const sortOptions = [
    {
        value: "id",
        label: "登録順",
    },
    {
        value: "delayDays",
        label: "遅延日数",
    },
    {
        value: "dueDate",
        label: "希望納期",
    },
    {
        value: "replyDate",
        label: "回答納期",
    },
    {
        value: "deadline",
        label: "限界納期",
    },
    {
        value: "itemName",
        label: "品目名称",
    },
    {
        value: "itemCode",
        label: "品目コード",
    },
    {
        value: "cause",
        label: "起因名",
    },
] as const satisfies readonly SortOption[];

export type SortKey = (typeof sortOptions)[number]["value"];