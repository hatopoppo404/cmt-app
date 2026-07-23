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

type Props = {
  onClose: () => void;
  onShowToast: (type: keyof typeof toastConfig, message: string) => void;
};
const [mode, setMode] = useState<"input" | "preview">("input");
const handleBackToInput = () => {
  setMode("input");
};
export const PasteCaseModal = ({ onClose, onShowToast }: Props) => {
  const [clipboardText, setClipboardText] = useState("");
  const handlePasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    setClipboardText(text);
  };

  const [previewCases, setPreviewCases] = useState<ParsedCasePreview[]>([]);
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
            <div>
              {previewCases.map((caseItem, index) => (
                <Card
                  key={`${caseItem.itemCode}-${caseItem.orderCode}`}
                  caseItem={toPreviewCase(caseItem, index)}
                  mode="preview"
                />
              ))}
            </div>
          )}
          <button
            className={clsx(
              "bg-inherit",
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
            onClick={handlePasteFromClipboard}
          >
            <CopyIcon className="size-6" />
            <span>クリップボードをペースト</span>
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
          onClick={handlePreviewCases}
        >
          <AddCardIcon className="size-8" />
          <span>プレビューを確認する</span>
        </button>
      </section>
    </div>
  );
};
