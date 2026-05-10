export type Case = {
    id: string; //ID
    itemName: string; //品目英名
    itemCode: string; //品目コード
    quantity: number; //数量
    warehouse: string; //倉庫
    dueDate: string; //希望納期
    deadline: string; //限界納期
    replyDate: string; //回答納期
    delayDays: number; //遅延日数
    cause: string; //起因名
    note?: string; //備考
}