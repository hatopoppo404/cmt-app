import { normalizeDateInput, calculateBusinessDelayDays } from "./date";
import { Case } from "@/types/case";

// プレビュー用の型定義
export type ParsedCasePreview = {
  itemName: string; //品目英名
  itemCode: string; //品目コード
  supplier: string; //仕入先
  replyDate: string; //回答納期
  dueDate: string; //希望納期
  delayDays: number; //遅延日数
  orderCode: string; //注文番号
  quantity: number; //数量
  warehouse: string; //納品先
  deadline: string; //限界納期
  cause: string; //起因名
  note: string; //備考
};

const caseFieldDefinitions = {
  itemName: ["記述", "品名", "品目名"],
  itemCode: ["品目", "品番", "品目コード"],
  supplier: ["名前", "仕入先", "サプライヤ"],
  replyDate: ["回答納期", "回答日"],
  dueDate: ["希望納期", "必要日"],
  orderCode: ["注文番号", "発注番号", "PO"],
  quantity: ["計画数量", "数量", "必要数"],
  warehouse: ["保管場所", "倉庫", "納品先"],
  deadline: ["限界", "限界納期", "期限"],
  cause: ["起因", "起因名", "原因"],
  note: ["備考", "メモ", "コメント"],
} as const;

type CaseFieldKey = keyof typeof caseFieldDefinitions;
type HeaderIndex = Record<CaseFieldKey, number>;
type HeaderIndices = {
  headerRowIndex: number;
  headerColumnsIndex: HeaderIndex;
};

// 文字を配列化する関数
const parseTsv = (text: string): string[][] => {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell: string = "";
  let isInQuotes: boolean = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    // クォートの処理
    if (char === '"') {
      if (isInQuotes && nextChar === '"') {
        currentCell += '"';
        i++;
      } else {
        isInQuotes = !isInQuotes;
      }

      continue;
    }

    // タブの処理
    if (char === "\t" && !isInQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = "";
      continue;
    }

    // 改行の処理
    if ((char === "\n" || char === "\r") && !isInQuotes) {
      if (char === "\r" && nextChar === "\n") i++;
      currentRow.push(currentCell.trim());
      rows.push(currentRow);
      currentRow = [];
      currentCell = "";
      continue;
    }

    currentCell += char;
  }
  currentRow.push(currentCell.trim());
  rows.push(currentRow);
  return rows.filter((row) => row.some((cell) => cell !== ""));
};

// ヘッダーの表記揺れを吸収する関数
const normalizeHeader = (header: string): string => {
  const normalizedHeader = header
    .normalize("NFKC")
    .replace(/\s/g, "")
    .replace(/[({\[「『【《〈〔〘〖〚]/g, "_")
    .replace(/[)}\]」』】》〉〕〙〗〛]/g, "")
    .toLowerCase();
  return normalizedHeader;
};

// 列番号を取得する関数
const findHeaderIndices = (data: string[][]): HeaderIndices => {
  const keys = Object.keys(caseFieldDefinitions) as CaseFieldKey[];
  const headerIndices = keys.reduce(
    (acc, key) => {
      acc.headerColumnsIndex[key] = -1;
      return acc;
    },
    {
      headerRowIndex: -1,
      headerColumnsIndex: {} as HeaderIndex,
    },
  );

  const normalizedCaseFieldDefinitions = Object.fromEntries(
    Object.entries(caseFieldDefinitions).map(([key, keywords]) => [
      key,
      keywords.map((keyword) => normalizeHeader(keyword)),
    ]),
  ) as Record<CaseFieldKey, string[]>;

  const keywords = Object.values(normalizedCaseFieldDefinitions).flat();

  const normalizedData = data.map((row) =>
    row.map((cell) => normalizeHeader(cell)),
  );

  const headerRowIndex = normalizedData.slice(0, 30).findIndex((row) => {
    const matchedKeywords = keywords.filter((keyword) =>
      row.some((cell) => cell.includes(keyword)),
    );
    return matchedKeywords.length >= 4;
  });
  headerIndices.headerRowIndex = headerRowIndex;

  if (headerRowIndex === -1) return headerIndices;

  for (const key of keys) {
    const index = normalizedData[headerRowIndex].findIndex((cell) =>
      //   for (const keyword of caseFieldDefinitions[key])
      //     if (cell.includes(normalizeHeader(keyword))) return true;
      //   return false;
      normalizedCaseFieldDefinitions[key].some((keyword) =>
        cell.includes(keyword),
      ),
    );
    headerIndices.headerColumnsIndex[key] = index;
  }

  return headerIndices;
};

// 安全にセルの値を取り出す補助関数
const getValue = (row: string[], index: number): string => {
  if (index === -1) return "";
  return row[index] ?? "";
};

// 7. parseCasesFromClipboard でつなぐ
// クリップボードから貼り付けたテキストを解析して、プレビュー用の配列に変換
export const parseCasesFromClipboard = (
  clipboardText: string,
): ParsedCasePreview[] => {
  const data = parseTsv(clipboardText);
  const headerInfo = findHeaderIndices(data);

  if (headerInfo.headerRowIndex === -1) return [];

  const indices = headerInfo.headerColumnsIndex;
  const normalizeDateForDisplay = (value: string): string => {
    return normalizeDateInput(value) || value;
  };
  const parsedCases: ParsedCasePreview[] = data
    .slice(headerInfo.headerRowIndex + 1)
    .filter((row) => getValue(row, indices.deadline) !== "")
    .map((row) => {
      const replyDate = normalizeDateForDisplay(
        getValue(row, indices.replyDate),
      );
      const dueDate = normalizeDateForDisplay(getValue(row, indices.dueDate));
      const deadline = normalizeDateForDisplay(getValue(row, indices.deadline));
      const delayDays = calculateBusinessDelayDays({
        dueDate,
        replyDate,
        deadline,
      });
      return {
        itemName: getValue(row, indices.itemName),
        itemCode: getValue(row, indices.itemCode),
        supplier: getValue(row, indices.supplier),
        replyDate: replyDate,
        dueDate: dueDate,
        delayDays: delayDays,
        orderCode: getValue(row, indices.orderCode),
        quantity: Number(getValue(row, indices.quantity)) || 0,
        warehouse: getValue(row, indices.warehouse),
        deadline: deadline,
        cause: getValue(row, indices.cause),
        note: getValue(row, indices.note),
      };
    });

  return parsedCases;
};
export const toPreviewCase = (
  preview: ParsedCasePreview,
  index: number,
): Case => {
  const now = new Date().toISOString();

  return {
    id: `preview-${index}`,
    status: "active",
    sortOrder: index,
    createdAt: now,
    updatedAt: now,
    archivedAt: null,
    deletedAt: null,
    ...preview,
  };
};
