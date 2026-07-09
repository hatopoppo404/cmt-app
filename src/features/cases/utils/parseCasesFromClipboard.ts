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

// 5. findColumnIndex を書く

// 6. getValue を書く

// 7. parseCasesFromClipboard でつなぐ
// クリップボードから貼り付けたテキストを解析して、プレビュー用の配列に変換
// export const parseCasesFromClipboard = (
//   clipboardText: string,
// ): ParsedCasePreview[] => {};

// 8. console.logで確認
