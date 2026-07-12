import { parseCasesFromClipboard } from "./parseCasesFromClipboard";

const mockClipboardText = `"品目
コード"	記述	名前	回答納期	希望納期	限界納期
ABC-001	Test Item	Supplier A	2026/07/20	2026/07/10	2026/07/11`;

console.log(parseCasesFromClipboard(mockClipboardText));
