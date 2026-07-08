import { CopyIcon } from "@/components/icons/CopyIcon";
import { Button } from "@/components/ui/Button/Button";

type Props = {
  onClose: () => void;
};

export const PasteCaseModal = ({ onClose }: Props) => {
  return (
    <div>
      <section>
        <header>
          <h2>Excleのコピー範囲から案件を作成します</h2>
          <Button variant="ghost" size="sm" text="x" onClick={onClose} />
        </header>
        <textarea placeholder="エクセルでコピーした内容をここに貼り付け" />
        <Button
          variant="primary"
          size="sm"
          icon={<CopyIcon />}
          text="クリップボードから貼り付け"
          onClick={() => {}}
        />
      </section>
    </div>
  );
};
