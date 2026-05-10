export type Case = {
  id: string; //ID
  delayDays: number; //遅延日数
  itemName: string; //品目英名
  itemCode: string; //品目コード
  replyDate: string; //回答納期
  dueDate: string; //希望納期
  orderCode: string; //注文番号
  quantity: number; //数量
  warehouse: string; //納品先
  deadline: string; //限界納期
  cause: string; //起因名
  note: string; //備考
};
