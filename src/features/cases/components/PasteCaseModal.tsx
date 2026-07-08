import { CopyIcon } from "@/components/icons/CopyIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";
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
          <Button
            variant="ghost"
            size="sm"
            iconOnly={true}
            icon={<CloseIcon />}
            onClick={onClose}
            buttonClass="border-none bg-inherit"
          />
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
