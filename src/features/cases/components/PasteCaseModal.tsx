import clsx from "clsx";
import { CopyIcon } from "@/components/icons/CopyIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";
import {
  parseCasesFromClipboard,
  type ParsedCasePreview,
  toPreviewCase,
} from "../utils/parseCasesFromClipboard";
import { AddCardIcon } from "@/components/icons/AddCardIcon";
import { useState } from "react";
import { toastConfig } from "@/components/ui/Toast";
import { Card } from "./Card";
import { Case, CaseActions } from "@/types/case";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { createEmptyCase } from "../utils/createEmptyCase";

type Props = {
  onClose: () => void;
  onShowToast: (type: keyof typeof toastConfig, message: string) => void;
  onAddCases: (newCases: Case[]) => void;
};

export const PasteCaseModal = ({ onClose, onShowToast, onAddCases }: Props) => {
  // クリップボードテキスト
  const [clipboardText, setClipboardText] = useState("");

  // クリップボードから文字列取得
  const handlePasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    setClipboardText(text);
  };
  // インプットとプレビュー
  const [mode, setMode] = useState<"input" | "preview">("input");

  // インプットに戻る
  const handleBackToInput = () => {
    setMode("input");
  };

  // プレビューカード一覧
  const [previewCases, setPreviewCases] = useState<ParsedCasePreview[]>([]);

  // プレビュー取得
  const handlePreviewCases = () => {
    const parsedCases = parseCasesFromClipboard(clipboardText);
    setPreviewCases(parsedCases);
    if (parsedCases.length > 0) {
      setMode("preview");
      onShowToast("success", `${parsedCases.length}件の案件を解析しました`);
    } else {
      onShowToast("error", "解析できる案件がありませんでした");
    }
  };

  // プレビューカードの内容更新
  const handleUpdatePreviewCase = (id: string, updates: Partial<Case>) => {
    const targetIndex = Number(id.replace("preview-", ""));

    setPreviewCases((prev) =>
      prev.map((caseItem, index) =>
        index === targetIndex ? { ...caseItem, ...updates } : caseItem,
      ),
    );
  };

  // プレビューカードを削除
  const handleRemovePreviewCase = (id: string) => {
    const targetIndex = Number(id.replace("preview-", ""));

    setPreviewCases((prev) => prev.filter((_, index) => index !== targetIndex));
  };

  // プレビューカードへの個別アクションを登録
  const previewCaseActions: CaseActions = {
    onUpdateCase: handleUpdatePreviewCase,
    onDeleteCase: handleRemovePreviewCase,
  };

  // カード追加を確定
  const handleCreateCases = () => {
    const newCases = previewCases.map((preview, index) => ({
      ...createEmptyCase(index),
      ...preview,
    }));

    onAddCases(newCases);
    onShowToast("success", `${newCases.length}件の案件を追加しました`);
    onClose();
  };

  return (
    <div
      className={clsx(
        "fixed",
        "top-16",
        "right-16",
        "bottom-16",
        "left-16",
        "z-50",

        "grid",
        "grid-rows-[auto_1fr]",
        "gap-4",
        "p-10",
        "rounded-(--radius-modal)",
        "border",
        "border-(--color-border)",
        "bg-(--color-bg-page)/70",
        "backdrop-blur-sm",
      )}
    >
      <header
        className={clsx(
          "flex",
          "flex-row",
          "items-center",
          "justify-between",
          "gap-4",
          "mb-4",
        )}
      >
        <h2 className={clsx("[font:var(--text-heading)]")}>
          Excelのコピー範囲から案件を作成します
        </h2>
        <button
          onClick={onClose}
          className={clsx(
            "border-none",
            "bg-inherit",
            "cursor-pointer",
            "text-(--color-text)",
            "hover:text-(--color-text-hover)",
          )}
        >
          <CloseIcon />
        </button>
      </header>
      <section
        className={clsx("blur-none", "min-h-0", "flex", "flex-col", "gap-4")}
      >
        <div className={clsx("relative", "min-h-0", "flex-1")}>
          {mode === "input" ? (
            <textarea
              id="inputPaste"
              className={clsx(
                "p-4",
                "pb-24",
                "bg-(--color-bg-input)/70",
                "text-(--color-text)",
                "h-full",
                "w-full",
                "resize-none",
                "border-default",
                "rounded-(--radius-md)",
              )}
              placeholder="エクセルでコピーした内容をここに貼り付け"
              value={clipboardText}
              onChange={(event) => setClipboardText(event.target.value)}
            />
          ) : (
            <div
              className={clsx(
                "overflow-y-auto",
                "flex",
                "flex-col",
                "gap-4",
                "bg-(--color-bg-input)/70",
                "items-center",
                "p-4",
                "h-full",
                "w-full",
                "resize-none",
                "border-default",
                "rounded-(--radius-md)",
              )}
            >
              {previewCases.map((caseItem, index) => (
                <Card
                  key={`${caseItem.itemCode}-${caseItem.orderCode}`}
                  caseItem={toPreviewCase(caseItem, index)}
                  caseActions={previewCaseActions}
                  mode="preview"
                />
              ))}
            </div>
          )}
          <button
            className={clsx(
              "bg-(--color-bg-page)/70",
              "text-(--color-text)",
              "text-sm",
              "cursor-pointer",
              "rounded-(--radius-md)",
              "p-3",
              "flex",
              "items-center",
              "justify-center",
              "gap-2",
              "absolute",
              "bottom-4",
              "right-4",
              "border-default",
            )}
            onClick={
              mode === "input" ? handlePasteFromClipboard : handleBackToInput
            }
          >
            {mode === "input" ? (
              <>
                <CopyIcon className="size-6" />
                <span>クリップボードをペースト</span>
              </>
            ) : (
              <>
                <ArrowIcon className="size-4 rotate-90" />
                <span>貼り付け内容を修正</span>
              </>
            )}
          </button>
        </div>
        <button
          className={clsx(
            "bg-(--color-primary)",
            "mx-auto",

            "text-(--color-text-inverse)",
            "cursor-pointer",
            "rounded-(--radius-pill)",
            "p-5",
            "px-[8rem]",
            "flex",
            "items-center",
            "justify-center",
            "gap-4",
          )}
          onClick={mode === "input" ? handlePreviewCases : handleCreateCases}
        >
          <AddCardIcon className="size-8" />
          <span>
            {mode === "input" ? "プレビューを確認する" : "案件を追加する"}
          </span>
        </button>
      </section>
    </div>
  );
};
